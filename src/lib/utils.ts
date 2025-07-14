import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function FieldArray(data: string) {
  return (JSON.parse(data)?.length ? JSON.parse(data) : false) || [{ platform: '', url: '' }]
}
// Helper function to generate year options for Nepali dates
export const generateYearOptions = (startYear: number, endYear: number) => {

  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    options.push({ value: year.toString(), label: year.toString() });

  }
  return options;
};