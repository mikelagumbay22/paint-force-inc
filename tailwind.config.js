/**
 * Tokens come from DESIGN.md ("Precision & Velocity").
 *
 * Every color here points at a CSS custom property declared in src/index.css.
 * That indirection is what lets the exact same component markup render inside a
 * single-file preview (no build step, no Tailwind config) and inside this Vite
 * app. Change a value in index.css and both stay in sync.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-dim': 'var(--surface-dim)',
        'surface-bright': 'var(--surface-bright)',
        'surface-lowest': 'var(--surface-container-lowest)',
        'surface-low': 'var(--surface-container-low)',
        'surface-container': 'var(--surface-container)',
        'surface-high': 'var(--surface-container-high)',
        'surface-highest': 'var(--surface-container-highest)',
        'surface-variant': 'var(--surface-variant)',
        'on-surface': 'var(--on-surface)',
        'on-surface-variant': 'var(--on-surface-variant)',
        primary: 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        'primary-container': 'var(--primary-container)',
        'on-primary-container': 'var(--on-primary-container)',
        'primary-fixed': 'var(--primary-fixed)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        outline: 'var(--outline)',
        'outline-variant': 'var(--outline-variant)',
        error: 'var(--error)',
        'error-container': 'var(--error-container)',
        'on-error-container': 'var(--on-error-container)',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        caps: ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      spacing: {
        gutter: '24px',
        section: '80px',
      },
      maxWidth: {
        container: '1280px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(.97)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.2,.7,.3,1) both',
        'scale-in': 'scale-in .25s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
}
