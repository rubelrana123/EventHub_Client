import { UserRole } from "@/types/user";
import { getDefaultDashboardRoute } from "./auth-utils";
import { NavSection } from "@/types/dashboard.interface";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["PARTICIPATOR", "HOST", "ADMIN"],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: ["PARTICIPATOR", "HOST", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
          roles: ["PARTICIPATOR", "HOST", "ADMIN"],
        },
      ],
    },
  ];
};

export const hostNavItems: NavSection[] = [
  {
    title: "Event Management",
    items: [
      {
        title: "My Events",
        href: "/host/events",
        icon: "Calendar",
        roles: ["HOST"],
      },
      {
        title: "Create Event",
        href: "/host/create-event",
        icon: "PlusCircle",
        roles: ["HOST"],
      },
      {
        title: "Participants",
        href: "/host/participants",
        icon: "Users",
        roles: ["HOST"],
      },
      {
        title: "Event Reviews",
        href: "/host/event-reviews",
        icon: "MessageSquare",
        roles: ["HOST"],
      },
    ],
  },
];
export const participatorNavItems: NavSection[] = [
  {
    title: "Events",
    items: [
      {
        title: "Browse Events",
        href: "/events",
        icon: "Search",
        roles: ["PARTICIPATOR"],
      },
      {
        title: "My Joined Events",
        href: "/participator/my-events",
        icon: "CalendarCheck",
        roles: ["PARTICIPATOR"],
      },
      {
        title: "My Reviews",
        href: "/participator/reviews",
        icon: "Star",
        roles: ["PARTICIPATOR"],
      },
    ],
  },
];
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/admins",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Hosts",
        href: "/admin/hosts",
        icon: "UserCheck",
        roles: ["ADMIN"],
      },
      {
        title: "Participators",
        href: "/admin/participators",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Event Management",
    items: [
      {
        title: "Events",
        href: "/admin/events",
        icon: "Calendar",
        roles: ["ADMIN"],
      },
      {
        title: "Reviews",
        href: "/admin/reviews",
        icon: "MessageSquare",
        roles: ["ADMIN"],
      },
      {
        title: "Payments",
        href: "/admin/payments",
        icon: "CreditCard",
        roles: ["ADMIN"],
      },
    ],
  },
];
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "HOST":
      return [...commonNavItems, ...hostNavItems];
    case "PARTICIPATOR":
      return [...commonNavItems, ...participatorNavItems];
    default:
      return [];
  }
};
