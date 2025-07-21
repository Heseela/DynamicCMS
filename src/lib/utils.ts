import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FieldArray(data: string) {
  return (JSON.parse(data)?.length ? JSON.parse(data) : false) || [{ platform: '', url: '' }];
}

export const generateYearOptions = (startYear: number, endYear: number) => {
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    options.push({ value: year.toString(), label: year.toString() });
  }
  return options;
};

export function showServerError(e: unknown) {
  if (e instanceof ZodError) {
    const msg = JSON.parse(e.message);

    if (Array.isArray(msg)) {
      return toast.error(msg[0]?.message);
    }

    toast.error(e.message);
  } else if (e instanceof Error) {
    // Fixed: Changed to react-hot-toast's expected format
    toast.error(e.message);
  } else {
    toast.error("An unexpected error occurred");
  }
}

export function generateSlug(title: string, genUniqueId: boolean = true): string {
  const slug = title.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  if (!genUniqueId) return slug;

  return `${slug}-${generateUniqueId(10)}`;
}

export function generateUniqueId(size: number = 21): string {
  // Browser-compatible ID generation without crypto module
  const alphabet = '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';

  // Use browser's crypto if available, otherwise fallback to Math.random
  const crypto = window.crypto || (window as any).msCrypto;
  const randomValues = new Uint32Array(size);
  
  if (crypto?.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    for (let i = 0; i < size; i++) {
      randomValues[i] = Math.random() * 4294967295;
    }
  }

  for (let i = 0; i < size; i++) {
    id += alphabet[randomValues[i] % alphabet.length];
  }

  return id;
}

export function createQueryString(params: Record<string, string | boolean | undefined | null>) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => !!value && !!key)
      .map(([key, value]) => [key, String(value)])
  );

  return new URLSearchParams(filteredParams).toString();
}