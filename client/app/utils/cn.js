import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args) {
  return twMerge(clsx(args));
}

export function getClassesFromVariant(variants, variant, classNames, key) {
  if (key) {
    return [variants?.[variant]?.[key], classNames?.[key]];
  }

  return [variants?.[variant], classNames];
}
