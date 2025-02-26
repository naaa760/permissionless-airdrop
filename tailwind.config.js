module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite 4s",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(2%, 2%) rotate(5deg)" },
          "50%": { transform: "translate(-2%, 4%) rotate(-5deg)" },
          "75%": { transform: "translate(-1%, 1%) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
