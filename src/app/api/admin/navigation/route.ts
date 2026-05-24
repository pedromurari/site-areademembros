import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEV_LOGIN } from "@/lib/dev-auth";
import { resolvePortalAccess } from "@/lib/portal-access";
import { writeLocalAdminNavigation } from "@/lib/admin-navigation";
import { createClient } from "@/lib/supabase/server";
import type { AdminNavigationItem } from "@/lib/admin-navigation-types";

function normalizeItems(items: AdminNavigationItem[]) {
  return items.map((item, index) => ({
    slug: item.slug,
    label: item.label,
    href: item.href,
    icon_key: item.iconKey,
    sort_order: index + 1,
    is_visible: item.isVisible !== false,
  }));
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { items?: AdminNavigationItem[] }
    | null;

  if (!body?.items?.length) {
    return NextResponse.json({ error: "Nenhum item de menu foi enviado." }, { status: 400 });
  }

  const cookieStore = await cookies();
  const devSession = cookieStore.get(DEV_LOGIN.cookieName)?.value === "1";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email ?? DEV_LOGIN.email;
  const access = await resolvePortalAccess(supabase, email);

  if (!access.canAccessAdmin) {
    return NextResponse.json({ error: "Acesso negado para editar a navegacao." }, { status: 403 });
  }

  const items = normalizeItems(body.items);

  if (devSession && !user) {
    await writeLocalAdminNavigation(
      body.items.map((item, index) => ({
        ...item,
        sortOrder: index + 1,
        isVisible: item.isVisible !== false,
      })),
    );
    return NextResponse.json({ ok: true, source: "local", items: body.items });
  }

  const { error } = await supabase.from("admin_navigation_items").upsert(items, {
    onConflict: "slug",
  });

  if (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "Nao foi possivel salvar a navegacao no Supabase. Verifique a migration 003_admin_navigation.sql.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, source: "supabase", items });
}
