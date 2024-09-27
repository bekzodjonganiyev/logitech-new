import type { Config } from "tailwindcss"

const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        md: '20px',
        lg: '120px',
        xl: '120px',
        '2xl': '120px',
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: "var(--color-primary)",
        lightgray: "var(--color-lightgray)",
        gray: "var(--color-gray)",
        darkgray: "var(--color-darkgray)",
        stockcolor: "var(--color-stockcolor)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        banner: "var(--br-banner)",
        card: "var(--br-card)",
        "header-elm": "var(--br-header-elm)",
        "category-product-card": "var(--br-category-product-card)",
        "payment-type-card": "var(--br-payment-type-card)",
        btn: "var(--br-btn)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      backgroundImage: {
        gradient2: "var(--color-gradient2)",
        gradient1: "var(--color-gradient1)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-gradient-1': 'radial-gradient(193.43% 116.47% at 18.39% -22.13%, #00B8FC 0%, #F4F4F4 100%)',
        'custom-gradient-2': 'linear-gradient(135deg, #FF2947 -2.01%, #F4F4F4 63.04%)',
        'custom-gradient-3': 'linear-gradient(132deg, #814EFA -5.24%, #F4F4F4 74.17%)',
        'custom-gradient-4': 'radial-gradient(141.95% 109.99% at 1.47% -1.85%, #FF7F2C 0%, #F4F4F4 100%)'
      },
      backgroundColor: {
        primary: "var(--color-primary)",
        lightgray: "var(--color-lightgray)",
        gray: "var(--color-gray)",
        darkgray: "var(--color-darkgray)",
        stockcolor: "var(--color-stockcolor)",
      },
      screens: {
        "custom-1": "920px",
      }
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config