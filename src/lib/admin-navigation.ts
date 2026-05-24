import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { AdminNavigationItem } from "@/lib/admin-navigation-types";

const localNavigationPath = join(process.cwd(), "data", "admin-navigation.local.json");

export const defaultAdminNavigationItems: AdminNavigationItem[] = [
  {
    slug: "home",
    label: "Home",
    href: "/admin",
    iconKey: "home",
    sortOrder: 1,
    isVisible: true,
  },
  {
    slug: "certificados",
    label: "Certificados",
    href: "/admin/certificados",
    iconKey: "certificate",
    sortOrder: 2,
    isVisible: true,
  },
  {
    slug: "meus-cursos",
    label: "Meus Cursos",
    href: "/admin/secao/meus-cursos",
    iconKey: "courses",
    sortOrder: 3,
    isVisible: true,
  },
  {
    slug: "aulas-ao-vivo",
    label: "Aulas Ao Vivo",
    href: "/admin/secao/aulas-ao-vivo",
    iconKey: "live",
    sortOrder: 4,
    isVisible: true,
  },
  {
    slug: "membros",
    label: "Membros",
    href: "/admin/secao/membros",
    iconKey: "members",
    sortOrder: 5,
    isVisible: true,
  },
  {
    slug: "gestao-de-midias",
    label: "Gestao de Midias",
    href: "/admin/secao/gestao-de-midias",
    iconKey: "media",
    sortOrder: 6,
    isVisible: true,
  },
];

export async function readLocalAdminNavigation(): Promise<AdminNavigationItem[] | null> {
  try {
    const raw = await readFile(localNavigationPath, "utf8");
    const parsed = JSON.parse(raw) as AdminNavigationItem[];

    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed
      .map((item, index) => ({
        slug: item.slug,
        label: item.label,
        href: item.href,
        iconKey: item.iconKey,
        sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder : index + 1,
        isVisible: item.isVisible !== false,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return null;
  }
}

export async function writeLocalAdminNavigation(items: AdminNavigationItem[]) {
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(localNavigationPath, JSON.stringify(items, null, 2), "utf8");
}
