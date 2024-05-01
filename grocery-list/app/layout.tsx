import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/react";
import clsx from "clsx";
import { LogoutButton, LogoutLink } from "@/components/logout-components";
import { ThemeSwitch } from "@/components/theme-switch";
import { getSessionUser } from "./lib/actions";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let user = await getSessionUser();	
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers>
					<div className="relative flex flex-col h-screen">
						<Navbar user={user} logoutButton={<LogoutButton/>} logoutLink={<LogoutLink/>} />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex">
							<div className="w-full flex items-center justify-center py-3">
								<Link
									isExternal
									className="flex items-center gap-1 text-current"
									title="nextui.org homepage"
									href={siteConfig.github}
								>
									<span className="text-default-600">Desenvolvido por</span>
									<p className="text-primary">Diego Feijó</p>
								</Link>
							</div>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
