import { useLayoutEffect, useState } from "react";

const breakpoints = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  "2xl": 1536,
};

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

export type TBreakpoint = keyof typeof breakpoints;
export type TScreenSize = {
  height: { tiny: boolean; small: boolean };
  width: { [key in TBreakpoint]: boolean };
};

const initialValue = {
  height: {
    tiny: false,
    small: false,
  },
  width: {
    base: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  },
};

function useScreenSize() {
  const [screen, setScreen] = useState<TScreenSize>(initialValue);

  useLayoutEffect(() => {
    function handleResize() {
      setScreen({
        height: {
          tiny: window.innerHeight <= 480,
          small: window.innerHeight <= 680,
        },
        width: getBreakpointBooleans(window.innerWidth),
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
}

export default useScreenSize;
