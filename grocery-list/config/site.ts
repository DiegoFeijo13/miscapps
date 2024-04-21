export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Lista Master",
	description: "A lista definitiva para suas compras inteligentes.",
	navItems: [
    {
      label: "Listas",
      href: "/main/lists",      
    },
    {
      label: "Produtos",
      href: "/main/products",      
    }
	]
};
