"use client";

import { FC } from "react";
import { useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import { Button } from "@nextui-org/react";

export interface ThemeSwitchProps {
	isLink?: boolean
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ isLink = false }) => {
	const { theme, setTheme } = useTheme();
	const isSSR = useIsSSR();

	const onChange = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

	const {
		isSelected,
	} = useSwitch({
		isSelected: theme === "light" || isSSR,
		"aria-label": `Mudar para modo ${theme === "light" || isSSR ? "dark" : "light"}`,
		onChange,
	});

	if (isLink) {
		return (

			<Button
				size="lg"
				variant="light"
				onPress={onChange}
				startContent={!isSelected || isSSR ? <SunIcon className="w-5" /> : <MoonIcon className="w-5" />}
			>
				{!isSelected || isSSR ? "Tema Claro" : "Tema Escuro"}
			</Button>
		)
	}

	return (

		<Button
			isIconOnly
			variant="light"
			onPress={onChange}
		>
			{!isSelected || isSSR ? <SunIcon className="w-5" /> : <MoonIcon className="w-5" />}
		</Button>


	);
};
