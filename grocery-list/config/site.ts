import { ListBulletIcon, GiftIcon, PresentationChartBarIcon } from '@heroicons/react/16/solid'
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Lista Master",
  description: "A lista definitiva para suas compras inteligentes.",
  github: "https://github.com/DiegoFeijo13",
  navItems: [
    {
      label: "Listas",
      href: "/main/lists",
      icon: ListBulletIcon
    },
    {
      label: "Produtos",
      href: "/main/products",
      icon: GiftIcon
    },
    {
      label: "Preços",
      href: "/main/prices",
      icon: PresentationChartBarIcon
    }
  ]
};
