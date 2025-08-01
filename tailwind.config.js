/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              color: '#111827',
              fontWeight: '600',
            },
            h2: {
              color: '#111827',
              fontWeight: '600',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
            },
            h4: {
              color: '#111827',
              fontWeight: '600',
            },
            h5: {
              color: '#111827',
              fontWeight: '600',
            },
            h6: {
              color: '#111827',
              fontWeight: '600',
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
            },
            li: {
              margin: '0.25rem 0',
            },
            p: {
              margin: '0.75rem 0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}