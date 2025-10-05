import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPractice(practice: "tech" | "food") {
  return practice === "tech" ? "360ace-Tech" : "360ace-Food";
}
