export type AdminMenuIconKind =
  | "home"
  | "certificate"
  | "courses"
  | "live"
  | "members"
  | "media"
  | "navigation"
  | "edit"
  | "save"
  | "grip";

export type AdminNavigationItem = {
  slug: string;
  label: string;
  href: string;
  iconKey: AdminMenuIconKind;
  sortOrder: number;
  isVisible: boolean;
};
