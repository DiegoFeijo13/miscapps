//"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { Link, Button } from "@nextui-org/react"
import clsx from "clsx";

import { PowerIcon } from "@heroicons/react/16/solid";
import { signOut } from "@/auth";

export interface LogOutProps {
	className?: string;
	classNames?: SwitchProps["classNames"];
}

export const LogOut: FC<LogOutProps> = ({
	className,
	classNames,
}) => {

	const {
		Component,
		slots,
		getBaseProps,
		getInputProps,
		getWrapperProps,
	} = useSwitch({
	});

	return (
		<Component
			{...getBaseProps({
				className: clsx(
					"px-px transition-opacity hover:opacity-80 cursor-pointer",
					className,
					classNames?.base
				),
			})}
		>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<div
				{...getWrapperProps()}
				className={slots.wrapper({
					class: clsx(
						[
							"w-auto h-auto",
							"bg-transparent",
							"rounded-lg",
							"flex items-center justify-center",
							"group-data-[selected=true]:bg-transparent",
							"!text-default-500",
							"pt-px",
							"px-0",
							"mx-0",
						],
						classNames?.wrapper
					),
				})}
			>

				<Button
					isIconOnly
					as={Link}
					variant="light"
					color="danger"
					onPress={async () => {
						'use server';
						await signOut();
					}}
					startContent={<PowerIcon className="w-5" />}
				/>


			</div>
		</Component>
	);
};
