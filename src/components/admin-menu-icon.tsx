import type { AdminMenuIconKind } from "@/lib/admin-navigation-types";

export function AdminMenuIcon({ kind }: { kind: AdminMenuIconKind }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "certificate":
      return (
        <svg {...common}>
          <path d="M7 4h10a2 2 0 0 1 2 2v11l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2Z" />
          <path d="M9 8h6" />
          <path d="M9 11h6" />
        </svg>
      );
    case "courses":
      return (
        <svg {...common}>
          <path d="M4.5 6A2.5 2.5 0 0 1 7 3.5h11.5v16H7A2.5 2.5 0 0 0 4.5 22V6Z" />
          <path d="M7 7h10" />
          <path d="M7 11h10" />
        </svg>
      );
    case "live":
      return (
        <svg {...common}>
          <path d="M4 15a8 8 0 0 1 16 0" />
          <path d="M7.5 15a4.5 4.5 0 0 1 9 0" />
          <circle cx="12" cy="15" r="1.5" />
        </svg>
      );
    case "members":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c1-3 3.5-4.8 5.5-4.8S13.5 16 14.5 19" />
          <path d="M15.5 10.5a2.5 2.5 0 1 0 0-5" />
          <path d="M16 19c-.5-1.6-1.4-2.9-2.6-3.7" />
        </svg>
      );
    case "media":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="14" rx="2" />
          <path d="m7 14 2.6-2.6a1.2 1.2 0 0 1 1.7 0L15 15" />
          <circle cx="10" cy="9" r="1.5" />
        </svg>
      );
    case "navigation":
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M4 12h10" />
          <path d="M4 17h16" />
          <circle cx="18" cy="12" r="1.8" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4" />
          <path d="M6 16.5 15.5 7a2.1 2.1 0 0 1 3 3L9 19.5 4 20l.5-5Z" />
          <path d="m14.5 8 2.5 2.5" />
        </svg>
      );
    case "save":
      return (
        <svg {...common}>
          <path d="M5 5h11l3 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
          <path d="M8 5v6h7V5" />
          <path d="M8 18h8" />
        </svg>
      );
    case "grip":
      return (
        <svg {...common}>
          <circle cx="8" cy="7" r="1.1" />
          <circle cx="16" cy="7" r="1.1" />
          <circle cx="8" cy="12" r="1.1" />
          <circle cx="16" cy="12" r="1.1" />
          <circle cx="8" cy="17" r="1.1" />
          <circle cx="16" cy="17" r="1.1" />
        </svg>
      );
    case "home":
    default:
      return (
        <svg {...common}>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M6.5 10.5V20h11V10.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
  }
}
