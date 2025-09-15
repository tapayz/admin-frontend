export interface Menu {
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  text: string;
  href: string;
  icon: React.ReactNode;
  newTab?: boolean;
}
