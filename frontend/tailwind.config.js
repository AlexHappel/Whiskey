export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#1c1c1e',   // Dark gray for background
        deepPurple: '#3d0075', // Gothic deep purple
        bloodRed: '#8b0000',   // Blood red for accents
        gold: '#d4af37',       // Gold for highlights
        silver: '#c0c0c0',     // Silver for borders
      },
      backgroundImage: {
        grimdark: "url('/assets/4091b44257d67d113b040469715798ec-2916648734.jpg')",
      },
      fontFamily: {
        gothic: ['UnifrakturMaguntia', 'serif'], // Example Gothic font
        elegant: ['Playfair Display', 'serif'],  // Elegant serif for text
      },
      borderRadius: {
        gothic: '12px', // Slightly ornate border radius for buttons, containers
      },
    },
  },
  plugins: [],
};
