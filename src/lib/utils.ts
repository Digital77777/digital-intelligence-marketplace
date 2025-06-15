
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSupabasePublicUrl = (bucket: string, path: string | null | undefined): string | null => {
  if (!path) return null;
  const SUPABASE_URL = "https://vnoxdbvpheowgugeyyfk.supabase.co";
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
};
