import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateMouseDistance = (
  x: number,
  y: number,
  rect: DOMRect
) => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceX = x - centerX;
  const distanceY = y - centerY;
  return { distanceX, distanceY };
};