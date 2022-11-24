/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        gray5: "#FAFAFE",
        gray4: "#E0E0E0",
        gray3: "#C1C1C4",
        gray2: "#BDBDBD",
        gray1: "#828282",
        dark1: "#34333A",
        dark2: "#454545",
        yellow1: "#F9A109",
        orange1: "#FFF0DE",
        purple1: "#80485B",
        blue1: "#56CCF2",
        red1: "#EB5757"
      },
      textColor: {
        gray5: "#FAFAFE",
        gray4: "#E0E0E0",
        gray3: "#C1C1C4",
        gray2: "#BDBDBD",
        gray1: "#828282",
        dark1: "#454545",
        dark2: "#34333A",
        yellow1: "#F9A109",
        "light-orange": "#FFF0DE",
        purple1: "#80485B",
        blue1: "#56CCF2",
        red1: "#EB5757"
      },
      borderColor: {
        gray5: "#FAFAFE",
        gray4: "#E0E0E0",
        gray3: "#C1C1C4",
        gray2: "#BDBDBD",
        gray1: "#828282",
        dark1: "#454545",
        dark2: "#34333A",
        yellow1: "#F9A109",
        "light-orange": "#FFF0DE",
        purple1: "#80485B",
        blue1: "#56CCF2",
        red1: "#EB5757"
      },
      boxShadow: {
        base: "0px 2px 12px 0px #0000000D"
      },
      animation: {
        "fade-in": "fadein .2s ease-in forwards",
        "fade-out": "fadeout .2s ease-in forwards"
      },
      keyframes: {
        fadein: {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        fadeout: {
          "0%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          }
        }
      }
    }
  },
  plugins: []
};
