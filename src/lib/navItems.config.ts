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
        href: "/host/dashboard/events-management",
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
        href: "/host/dashboard/participator-management",
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
        href: "/dashboard/my-events",
        icon: "CalendarCheck",
        roles: ["PARTICIPATOR"],
      },
      {
        title: "My History",
        href: "/dashboard/my-history",
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
        title: "Users",
        href: "/admin/dashboard/participators-management",
        icon: "Users",
        roles: ["ADMIN"],
      },      
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Hosts",
        href: "/admin/dashboard/hosts-management",
        icon: "UserCheck",
        roles: ["ADMIN"],
      },

    ],
  },
  {
    title: "Event Management",
    items: [
      {
        title: "Events",
        href: "/admin/dashboard/events-management",
        icon: "Calendar",
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
