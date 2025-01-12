import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    body: {
      bg: "#05050F",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: {
          value: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        },
      },
      colors: {
        irbg: { light: { value: "#CDCDCF" }, dark: { value: "#05050F" } },
        irbgc: {
          light: { value: "#D9D9DB" },
          dark: { value: "#12121B" },
        },
        irborder: {
          light: { value: "rgba(5, 5, 15, 0.10)" },
          dark: { value: "rgba(255, 255, 255, 0.06)" },
        },
        black: {
          value: "#05050F",
        },
        gray: {
          50: { value: "#F2F2F3" },
          100: { value: "#E6E6E7" },
          150: { value: "#D9D9DB" },
          200: { value: "#CDCDCF" },
          250: { value: "#C0C0C3" },
          300: { value: "#B4B4B7" },
          350: { value: "#A7A7AB" },
          400: { value: "#9B9B9F" },
          450: { value: "#8E8E93" },
          500: { value: "#828287" },
          550: { value: "#76767B" },
          600: { value: "#69696F" },
          650: { value: "#5D5D63" },
          700: { value: "#505057" },
          750: { value: "#44444B" },
          800: { value: "#37373F" },
          850: { value: "#2B2B33" },
          900: { value: "#1E1E27" },
          950: { value: "#12121B" },
          1000: { value: "#05050F" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
