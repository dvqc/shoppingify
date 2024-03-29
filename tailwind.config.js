/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        16: "4rem",
        "1/2": "50%",
        "1/3": "33.33%",
        "1/4": "25%"
      },
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
      fill: {
        yellow1: "#F9A109"
      },
      boxShadow: {
        base: "0px 2px 12px 0px #0000000D"
      },
      filter: ["hover", "focus"],
      animation: {
        "fade-in": "fadein .2s ease-in forwards",
        "fade-out": "fadeout .2s ease-in forwards",
        "slide-in": "slidein .4s ease-in forwards",
        "slide-out": "slideout .4s ease-in forwards",
        glide: "glideKF 2s ease-in-out infinite alternate"
      },
      keyframes: {
        glideKF: {
          "0%": {
            transform: "translateX(-50%)"
          },
          "100%": {
            transform: "translateX(50%)"
          }
        },
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
        },
        slidein: {
          "0%": {
            opacity: "0",
            left: "100%"
          },
          "100%": {
            opacity: "1",
            left: "0%"
          }
        },
        slideout: {
          "0%": {
            opacity: "1",
            right: "0%"
          },
          "100%": {
            opacity: "0",
            right: "50%"
          }
        }
      }
    }
  },
  plugins: []
};
