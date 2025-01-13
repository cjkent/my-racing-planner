import { useEffect, useState } from "react";

const breakpoints = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  "2xl": 1536,
};

function getBreakpoint(width: number): keyof typeof breakpoints {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "base";
}

function getBreakpointBooleans(width: number) {
  return {
    base: width >= breakpoints.base,
    sm: width >= breakpoints.sm,
    md: width >= breakpoints.md,
    lg: width >= breakpoints.lg,
    xl: width >= breakpoints.xl,
    "2xl": width >= breakpoints["2xl"],
  };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    height: number;
    breakpoint: keyof typeof breakpoints;
    size: {
      base: boolean;
      sm: boolean;
      md: boolean;
      lg: boolean;
      xl: boolean;
      "2xl": boolean;
    };
  }>({
    height: 0,
    breakpoint: "base",
    size: {
      base: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      "2xl": false,
    },
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        breakpoint: getBreakpoint(width),
        size: getBreakpointBooleans(width),
        height,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
