import {
  LayoutDashboard,
  User,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  UserCog,
  File,
  BookOpen,
} from "lucide-react";

import { Menu } from "./type/menu.type";

export const menuData: Menu[] = [
  {
    title: "menu.main",
    items: [
      {
        text: "menu.main.dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        text: "menu.main.mypage",
        href: "/mypage",
        icon: <User />,
      },
      {
        text: "menu.main.agents",
        href: "/partners",
        icon: <Users />,
      },
      {
        text: "menu.main.members",
        href: "/members",
        icon: <UserCog />,
      },
    ],
  },
  {
    title: "menu.transactions",
    items: [
      {
        text: "menu.transactions.deposits",
        href: "/deposits",
        icon: <ArrowDownLeft />,
      },
      {
        text: "menu.transactions.withdrawals",
        href: "/withdrawals",
        icon: <ArrowUpRight />,
      },
      {
        text: "menu.transactions.invoice",
        href: "/invoices",
        icon: <File />,
      },
    ],
  },
  {
    title: "menu.documentation",
    items: [
      {
        text: "menu.api.documentation",
        href: "https://docs.tapayz.com/",
        icon: <BookOpen />,
        newTab: true,
      },
    ],
  },
];
