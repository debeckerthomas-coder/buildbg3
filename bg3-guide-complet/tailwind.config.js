/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // Dark mode natif — classe 'dark' sur <html>
  // Ici le site est full dark par défaut, pas de toggle
  darkMode: 'class',

  theme: {
    extend: {
      // ── Palette BG3 ──────────────────────────────────────────
      colors: {
        // Fonds
        bg: {
          void:    '#05060a',
          deep:    '#080a12',
          base:    '#0c0e18',  // fond principal
          raised:  '#101320',
          surface: '#161a2c',
        },
        // Or (accent principal)
        gold: {
          DEFAULT: '#d4a857',
          light:   '#f0d090',
          pale:    '#f5e0b0',
          dark:    '#a07830',
        },
        // Violet (accent secondaire — Occultiste)
        violet: {
          DEFAULT: '#8b5cf6',
          light:   '#a78bfa',
        },
        // Rouge (danger / Honneur)
        danger: {
          DEFAULT: '#ff3b3b',
          dark:    '#cc2020',
        },
        // Texte
        text: {
          primary:   '#e8e0f0',
          secondary: '#a8a0b8',
          muted:     '#6b6580',
          dim:       '#4a4560',
          gold:      '#d4a857',
          bright:    '#ffffff',
        },
        // Difficulté
        diff: {
          easy:    '#10b981',
          medium:  '#f59e0b',
          hard:    '#f97316',
          extreme: '#ef4444',
          lethal:  '#a855f7',
        },
        // États callout
        emerald: { DEFAULT: '#10b981' },
        amber:   { DEFAULT: '#f59e0b' },
      },

      // ── Typographie ──────────────────────────────────────────
      fontFamily: {
        // Titres — style médiéval BG3
        display: ['"Cinzel Decorative"', 'Cinzel', 'Georgia', 'serif'],
        // Titres de section
        heading: ['Cinzel', '"Cinzel Decorative"', 'Georgia', 'serif'],
        // Corps — lisible, légèrement classique
        body:    ['Alegreya', 'Georgia', 'serif'],
        // UI — boutons, labels, navigation
        ui:      ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
        // Code
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      // ── Espacements & layout ─────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '92': '23rem',
      },

      // ── Largeurs ─────────────────────────────────────────────
      width: {
        'sidebar':  '17rem',   // Sidebar contextuelle
        'topbar':   '100%',
      },

      maxWidth: {
        'content': '90rem',    // Largeur max du layout principal
      },

      // ── Hauteurs ─────────────────────────────────────────────
      height: {
        'topbar': '3.5rem',    // 56px
        'bottombar': '3rem',   // 48px
      },

      // ── Ombres avec glow ─────────────────────────────────────
      boxShadow: {
        'gold-sm':   '0 0 8px rgba(212,168,87,0.2)',
        'gold-md':   '0 0 16px rgba(212,168,87,0.35)',
        'gold-lg':   '0 0 32px rgba(212,168,87,0.5)',
        'danger-md': '0 0 16px rgba(255,59,59,0.3)',
        'inner-gold':'inset 0 1px 0 rgba(212,168,87,0.2)',
        'card':      '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(212,168,87,0.08)',
      },

      // ── Bordures ─────────────────────────────────────────────
      borderColor: {
        gold:         'rgba(212,168,87,0.25)',
        'gold-bright':'rgba(212,168,87,0.55)',
        surface:      'rgba(255,255,255,0.06)',
      },

      // ── Animations ───────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(212,168,87,0.2)' },
          '50%':      { boxShadow: '0 0 20px rgba(212,168,87,0.5)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-in':      'fade-in 0.3s ease-out both',
        'slide-in-left':'slide-in-left 0.25s ease-out both',
        'pulse-gold':   'pulse-gold 2s ease-in-out infinite',
        'shimmer':      'shimmer 3s linear infinite',
      },

      // ── Typographie prose (MDX) ───────────────────────────────
      typography: (theme) => ({
        bg3: {
          css: {
            '--tw-prose-body':        theme('colors.text.primary'),
            '--tw-prose-headings':    theme('colors.gold.light'),
            '--tw-prose-lead':        theme('colors.text.secondary'),
            '--tw-prose-links':       theme('colors.gold.DEFAULT'),
            '--tw-prose-bold':        theme('colors.text.bright'),
            '--tw-prose-counters':    theme('colors.gold.dark'),
            '--tw-prose-bullets':     theme('colors.gold.dark'),
            '--tw-prose-hr':          'rgba(212,168,87,0.2)',
            '--tw-prose-quotes':      theme('colors.text.secondary'),
            '--tw-prose-quote-borders': theme('colors.gold.dark'),
            '--tw-prose-captions':    theme('colors.text.muted'),
            '--tw-prose-code':        theme('colors.gold.pale'),
            '--tw-prose-pre-code':    theme('colors.text.primary'),
            '--tw-prose-pre-bg':      theme('colors.bg.surface'),
            '--tw-prose-th-borders':  'rgba(212,168,87,0.3)',
            '--tw-prose-td-borders':  'rgba(255,255,255,0.06)',
            maxWidth: '100%',
            // Styles spécifiques
            'h2': {
              fontFamily: theme('fontFamily.heading').join(', '),
              letterSpacing: '0.04em',
              borderBottom: '1px solid rgba(212,168,87,0.2)',
              paddingBottom: '0.4em',
            },
            'h3': {
              fontFamily: theme('fontFamily.heading').join(', '),
              color: theme('colors.gold.DEFAULT'),
            },
            'strong': {
              color: theme('colors.text.bright'),
              fontWeight: '600',
            },
            'table': {
              fontSize: '0.875rem',
            },
            'th': {
              backgroundColor: 'rgba(16,19,35,0.8)',
              color: theme('colors.gold.light'),
              fontFamily: theme('fontFamily.ui').join(', '),
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.7rem',
            },
            'td': {
              color: theme('colors.text.primary'),
            },
            'tr:hover td': {
              backgroundColor: 'rgba(212,168,87,0.04)',
            },
          },
        },
      }),

      // ── Grille Piggyback ─────────────────────────────────────
      gridTemplateColumns: {
        // Layout principal : sidebar contextuelle | contenu | encarts
        'piggyback': '17rem 1fr 22rem',
        // Sans sidebar (index, grimoire)
        'no-sidebar': '1fr 22rem',
        // Mobile
        'mobile': '1fr',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
