"use client"

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import React from "react";
import { ThemeSwitch } from "./theme-switch";
import { User } from "next-auth";
import { ListBulletIcon, UserIcon } from "@heroicons/react/16/solid";
import { Avatar, Button, Divider, Link, User as NextUser } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const Navbar = ({ user, logoutButton, logoutLink }: { user: User | undefined, logoutButton: React.ReactNode, logoutLink: React.ReactNode }) => {
	const [isMenuOpen, setIsMenuOpen] = React.useReducer((current) => !current, false)
	const pathname = usePathname();


	return (
		<NextUINavbar
			isBordered
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			classNames={{
				item: [
					"flex",
					"relative",
					"h-full",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-0",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-secondary",
				],
			}}
		>
			<NavbarContent className="basis-1/5 md:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink
						className="flex justify-start items-center gap-1"
						href="/"
					>
						<ListBulletIcon className="w-5" />
						<p className="font-bold text-inherit">LISTA MASTER</p>
					</NextLink>
				</NavbarBrand>

				<ul className="hidden md:flex gap-4 justify-start ml-2">
					{user != undefined ?
						siteConfig.navItems.map((item) => (
							<NavbarItem
								key={item.href}
								isActive={pathname === item.href}>
								<Link
									className={clsx(
										linkStyles({ color: "foreground" }),
									)}
									//color="foreground"
									href={item.href}
								>
									{item.label}
								</Link>
							</NavbarItem>
						))
						: ''
					}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem>
					<UserIcon className="w-5" />
					{user?.name}
				</NavbarItem>
				<NavbarItem>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem>
					{logoutButton}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="md:hidden basis-1 pl-4" justify="end">
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					<UserMenu user={user} setIsMenuOpen={setIsMenuOpen} />
					<NavbarMenuItem key={`theme-${siteConfig.navItems.length}`}>
						<ThemeSwitch isLink={true} />
					</NavbarMenuItem>
					<NavbarMenuItem key={`logout-${siteConfig.navItems.length + 1}`}>
						{logoutLink}
					</NavbarMenuItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};

const UserMenu = ({ user, setIsMenuOpen }: { user: User | undefined, setIsMenuOpen: Function }) => {

	if (user == undefined)
		return (
			<></>
		)


	return (
		<>
			<NavbarMenuItem key='user'>
				<NextUser className='ml-4' name={user.name} avatarProps={{name : (user?.name ?? '')[0].toUpperCase()}}/>
			</NavbarMenuItem>
			<Divider />
			{
				siteConfig.navItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Button
							as={Link}
							variant="light"
							href={item.href}
							size="lg"
							onPress={() => setIsMenuOpen()}
							startContent={<item.icon className="w-5" />}
						>
							{item.label}
						</Button>
					</NavbarMenuItem>
				))
			}
		</>
	)
}