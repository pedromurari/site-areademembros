import type { SupabaseClient } from "@supabase/supabase-js";
import { DEV_LOGIN } from "@/lib/dev-auth";

export type PortalRole = "admin" | "aluno";

export type PortalAccess = {
  role: PortalRole;
  canAccessAdmin: boolean;
  source: "supabase" | "fallback";
  reason?: string;
};

function isAdminValue(value?: string | null) {
  const normalized = value?.trim().toLowerCase() ?? "";
  return (
    normalized.includes("admin") ||
    normalized.includes("adm") ||
    normalized.includes("total")
  );
}

export async function resolvePortalAccess(
  supabase: SupabaseClient,
  email: string,
): Promise<PortalAccess> {
  if (email.toLowerCase() === DEV_LOGIN.email) {
    return {
      role: "admin",
      canAccessAdmin: true,
      source: "fallback",
      reason: "Conta de desenvolvimento liberada como admin.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("role, access_level")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return {
        role: "aluno",
        canAccessAdmin: false,
        source: "fallback",
        reason: error.message,
      };
    }

    if (!data) {
      return {
        role: "aluno",
        canAccessAdmin: false,
        source: "fallback",
        reason: "Perfil nao encontrado no Supabase.",
      };
    }

    const isAdmin = isAdminValue(data.role) || isAdminValue(data.access_level);

    return {
      role: isAdmin ? "admin" : "aluno",
      canAccessAdmin: isAdmin,
      source: "supabase",
    };
  } catch (error) {
    return {
      role: "aluno",
      canAccessAdmin: false,
      source: "fallback",
      reason: error instanceof Error ? error.message : "Falha ao consultar perfil.",
    };
  }
}
