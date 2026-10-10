import { useEffect, useRef, useState } from 'react'
import { publicUrl } from '../lib/asset'
import { useReducedMotion } from '../lib/hooks'

const VIDEO_SRC = publicUrl('/hero-video/car-turn-720p-intra.mp4')
const POSTER_SRC = publicUrl('/hero-video/poster.jpg')
const FRAME_COUNT = 30
const DURATION_FALLBACK = 3

const clamp = (n, a, b) => Math.min(b, Math.max(a, n))

function frameSrc(index) {
  return publicUrl(`/hero-video/frames/frame-${String(index + 1).padStart(3, '0')}.jpg`)
}

function drawCover(ctx, img, width, height) {
  const ir = img.naturalWidth / img.naturalHeight
  const cr = width / height
  let dw
  let dh
  let dx
  let dy
  if (ir > cr) {
    dh = height
    dw = height * ir
    dx = (width - dw) / 2
    dy = 0
  } else {
    dw = width
    dh = width / ir
    dx = 0
    dy = (height - dh) / 2
  }
  ctx.drawImage(img, dx, dy, dw, dh)
}

/**
 * Cursor-scrubbed hero. The clip does not autoplay: pointer X maps to
 * currentTime through a smoothed animation frame. Touch uses scroll while
 * the finger is moving, then a slow ping-pong. If seeking never lands,
 * the 30 stills are drawn on a canvas instead.
 */
export function HeroScrub() {
  const root = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()
  const [engine, setEngine] = useState('poster')

  useEffect(() => {
    if (reduce) return undefined
    const rootEl = root.current
    const video = videoRef.current
    if (!rootEl || !video) return undefined

    let dead = false
    let raf = 0
    let target = 0
    let shown = 0
    let duration = DURATION_FALLBACK
    let mode = 'video'
    let frames = []
    let lastIndex = -1
    let ping = 0
    let pingDir = 1
    let lastTs = 0
    let scrolling = false
    let scrollTimer = 0
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return null
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = rootEl.clientWidth
      const height = rootEl.clientHeight
      const nextW = Math.max(1, Math.round(width * dpr))
      const nextH = Math.max(1, Math.round(height * dpr))
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW
        canvas.height = nextH
        lastIndex = -1
      }
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return { ctx, width, height }
    }

    const drawFrame = (time) => {
      if (!frames.length) return
      const surface = resizeCanvas()
      if (!surface) return
      const idx = clamp(Math.round((time / duration) * (frames.length - 1)), 0, frames.length - 1)
      let use = -1
      if (frames[idx]?.complete && frames[idx].naturalWidth) use = idx
      else {
        for (let d = 1; d < frames.length; d += 1) {
          if (frames[idx - d]?.complete && frames[idx - d].naturalWidth) {
            use = idx - d
            break
          }
          if (frames[idx + d]?.complete && frames[idx + d].naturalWidth) {
            use = idx + d
            break
          }
        }
      }
      if (use < 0 || use === lastIndex) return
      lastIndex = use
      surface.ctx.clearRect(0, 0, surface.width, surface.height)
      drawCover(surface.ctx, frames[use], surface.width, surface.height)
    }

    const useFrames = () => {
      if (mode === 'frames' || dead) return
      mode = 'frames'
      if (!frames.length) {
        frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
          const img = new Image()
          img.decoding = 'async'
          img.src = frameSrc(i)
          return img
        })
      }
      try {
        video.pause()
        video.removeAttribute('src')
        video.load()
      } catch {
        /* the stills take over */
      }
      setEngine('frames')
    }

    const apply = (time) => {
      if (mode === 'frames') {
        drawFrame(time)
        return
      }
      if (Math.abs(video.currentTime - time) < 1 / 30) return
      try {
        video.currentTime = time
      } catch {
        useFrames()
      }
    }

    const loop = (ts) => {
      if (dead) return
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016
      lastTs = ts
      const rect = rootEl.getBoundingClientRect()
      const near = rect.bottom > -80 && rect.top < window.innerHeight + 80
      if (!fine && near && !scrolling) {
        ping += pingDir * dt * 0.42
        if (ping >= duration) {
          ping = duration
          pingDir = -1
        } else if (ping <= 0) {
          ping = 0
          pingDir = 1
        }
        target = ping
      }
      if (near) {
        shown += (target - shown) * 0.18
        if (Math.abs(target - shown) < 0.012) shown = target
        apply(shown)
      }
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      if (!fine || e.pointerType === 'touch') return
      target = clamp(e.clientX / window.innerWidth, 0, 1) * duration
    }

    const onScroll = () => {
      if (fine) return
      scrolling = true
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        scrolling = false
      }, 240)
      const rect = rootEl.getBoundingClientRect()
      const total = window.innerHeight + rect.height
      const progress = clamp((window.innerHeight - rect.top) / total, 0, 1)
      target = progress * duration
      ping = target
    }

    const probeSeek = () =>
      new Promise((resolve) => {
        const want = Math.min(1.15, duration * 0.4)
        let settled = false
        const finish = (ok) => {
          if (settled) return
          settled = true
          video.removeEventListener('seeked', onSeeked)
          resolve(ok)
        }
        const onSeeked = () => finish(Math.abs(video.currentTime - want) < 0.35)
        video.addEventListener('seeked', onSeeked)
        try {
          video.currentTime = want
        } catch {
          finish(false)
        }
        window.setTimeout(() => finish(false), 1200)
      })

    const start = async () => {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.preload = 'auto'
      video.src = VIDEO_SRC
      video.pause()
      try {
        await Promise.race([
          new Promise((resolve, reject) => {
            const ok = () => resolve()
            const bad = () => reject()
            video.addEventListener('loadeddata', ok, { once: true })
            video.addEventListener('error', bad, { once: true })
          }),
          new Promise((_, reject) => {
            window.setTimeout(() => reject(new Error('slow')), 4000)
          }),
        ])
      } catch {
        if (!dead) useFrames()
        raf = requestAnimationFrame(loop)
        return
      }
      if (dead) return
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        useFrames()
      } else {
        duration = video.duration
        const reliable = await probeSeek()
        if (dead) return
        if (!reliable) useFrames()
        else {
          try {
            video.currentTime = 0
          } catch {
            /* first frame is the poster */
          }
          await new Promise((resolve) => {
            if (video.currentTime < 0.08) {
              resolve()
              return
            }
            const finish = () => resolve()
            video.addEventListener('seeked', finish, { once: true })
            window.setTimeout(finish, 400)
          })
          if (dead) return
          shown = 0
          target = 0
          mode = 'video'
          setEngine('video')
        }
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    start()

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      window.clearTimeout(scrollTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      try {
        video.pause()
        video.removeAttribute('src')
        video.load()
      } catch {
        /* unmount */
      }
    }
  }, [reduce])

  return (
    <div className="absolute inset-0" ref={root}>
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        draggable={false}
        fetchPriority="high"
        src={POSTER_SRC}
        style={{ opacity: engine === 'poster' ? 1 : 0 }}
      />
      <video
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        poster={POSTER_SRC}
        preload={reduce ? 'none' : 'auto'}
        ref={videoRef}
        style={{ opacity: engine === 'video' ? 1 : 0 }}
        tabIndex={-1}
      />
      <canvas
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        ref={canvasRef}
        style={{ opacity: engine === 'frames' ? 1 : 0 }}
      />
    </div>
  )
}
