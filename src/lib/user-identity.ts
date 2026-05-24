import { DEV_LOGIN } from "@/lib/dev-auth";

export function getDisplayName(email: string, providedName?: string) {
  if (providedName?.trim()) return providedName.trim();
  if (email === DEV_LOGIN.email) return DEV_LOGIN.name;

  const localPart = email.split("@")[0] ?? "Aluno IDM";
  const parts = localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));

  return parts.join(" ") || "Aluno IDM";
}

export function getDisplayInitial(email: string, providedName?: string) {
  return getDisplayName(email, providedName).charAt(0).toUpperCase() || "I";
}
