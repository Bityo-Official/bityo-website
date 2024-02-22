import withMT from '@material-tailwind/react/utils/withMT'

const config = withMT({
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'h1': ['5rem', '7.5rem'],
        'h2': ['4rem', '6rem'],
        'h3': ['3rem', '4.5rem'],
        'h4': ['2.5rem', '3.75rem'],
        'h5': ['2rem', '3rem'],
        'h6': ['1.75rem', '2.625rem'],
      },
      colors: {
        primary: "#4ECE80",
      }
    },
  },
  plugins: [
  ],
})

export default config;
