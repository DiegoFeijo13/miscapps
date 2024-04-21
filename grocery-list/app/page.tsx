import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>{siteConfig.description}</h1>				
				<h2 className={subtitle({ class: "mt-4" })}>
					Simples, prático e sem anúncios.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					href='/login'
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					<span>Log In</span><ArrowRightIcon className="w-5" />
				</Link>
			</div>
		</section>
	);
}
