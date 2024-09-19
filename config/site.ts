export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "IES Church Management System",
  description: "IES Church Management System",
  appNavItems: [
    {
      key: "home",
      icon: "",
      label: "Home",
      href: "/",
    },
    {
      key: "people",
      icon: "",
      label: "People",
      href: "/people",
    },
    {
      key: "attendance",
      icon: "",
      label: "Attendance",
      href: "/attendance",
    },
  ],
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    // {
    // label: "Docs",
    // href: "/docs",
    // },
    // {
    // label: "Blog",
    // href: "/blog",
    // },
    {
      label: "People",
      href: "/people",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  attendanceNavItems: [
    {
      label: "Events",
      href: "/attendance",
    },
    {
      label: "Labels",
      href: "/attendance/labels",
    }
  ],
  links: {
    github: "https://github.com/Goldwin/ies-cms-people",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
