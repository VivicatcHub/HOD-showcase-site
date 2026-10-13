import { BASE_PATH } from "@/lib/config";

export const BRAND_BACKGROUND = "#0D0B1A";

export const asset = (path: string) => `${BASE_PATH}${path}`;

const IOS_SPLASH_SCREENS = [
  [1320, 2868, 440, 956, 3],
  [1206, 2622, 402, 874, 3],
  [1290, 2796, 430, 932, 3],
  [1179, 2556, 393, 852, 3],
  [1284, 2778, 428, 926, 3],
  [1170, 2532, 390, 844, 3],
  [1125, 2436, 375, 812, 3],
  [1242, 2688, 414, 896, 3],
  [828, 1792, 414, 896, 2],
  [1242, 2208, 414, 736, 3],
  [750, 1334, 375, 667, 2],
  [2048, 2732, 1024, 1366, 2],
  [1668, 2388, 834, 1194, 2],
  [1640, 2360, 820, 1180, 2],
  [1620, 2160, 810, 1080, 2],
] as const;

export const iosStartupImages = IOS_SPLASH_SCREENS.map(
  ([width, height, cssWidth, cssHeight, ratio]) => ({
    url: asset(`/splash/apple-splash-${width}x${height}.png`),
    media: `(device-width: ${cssWidth}px) and (device-height: ${cssHeight}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)`,
  }),
);
