import { useWindowDimensions, PixelRatio } from 'react-native';

type ResponsiveReturnType = {
  width: number;
  height: number;
  wp: (percent: number) => number;
  hp: (percent: number) => number;
  scale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  font: (size: number) => number;
};

export const useResponsive = (): ResponsiveReturnType => {
  const { width, height } = useWindowDimensions();

  const baseWidth = 375;
  const baseHeight = 812;

  const wp = (percent: number): number => (width * percent) / 100;
  const hp = (percent: number): number => (height * percent) / 100;

  const scale = (size: number): number => (width / baseWidth) * size;

  const moderateScale = (size: number, factor: number = 0.5): number =>
    size + (scale(size) - size) * factor;

  const font = (size: number): number => {
    const newSize = scale(size);
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  return {
    width,
    height,
    wp,
    hp,
    scale,
    moderateScale,
    font,
  };
};