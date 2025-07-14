import {
  LayoutDashboard,
  BookOpen,
  FilePlus,
  GraduationCap,
  Briefcase,
  Image,
  MessageSquare,
  Building2,
  SlidersHorizontal,
  Landmark,
  LayoutPanelTop
} from "lucide-react";

export const menuItems = [
  {
    title: "Pages",
    link: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Blog Categories",
    link: "/blog-categories",
    icon: FilePlus,
  },
  {
    title: "Blogs",
    link: "/blogs",
    icon: BookOpen,
  },
  {
    title: "Courses",
    link: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Jobs",
    link: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Gallery",
    link: "/gallery",
    icon: Image,
  },
  {
    title: "FAQs",
    link: "/faqs",
    icon: MessageSquare,
  }, 
  {
    title: "Layout Settings",
    submenu: [
      {
        title: "Header",
        link: "/header",
        icon: LayoutPanelTop,
      },
      {
        title: "Footer",
        link: "/footer",
        icon: Landmark,
      },
    ],
  },
  {
    title: "Settings",
    submenu: [
      {
        title: "General Setting",
        link: "/general-setting",
        icon: SlidersHorizontal,
      },
      {
        title: "Company Information",
        link: "/company-info",
        icon: Building2,
      },
    ],
  },
];
