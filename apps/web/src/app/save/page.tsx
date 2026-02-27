import Link from "next/link";

export default function SavePage() {
	return (
		<div className="container mx-auto w-full px-6 pt-16">
			<header>
				<Link className="text-muted-foreground" href={"/today"}>
					Back
				</Link>
			</header>
			<main className="mt-36 flex flex-col items-center gap-4">
				<div className="flex flex-col gap-4 text-center">
					<h1 className="text-[1.3rem] leading-[1.4] tracking-tighter sm:text-3xl">
						What do you want to remember?
					</h1>
					<p className="text-muted-foreground/40 text-xs sm:text-sm">
						Paste a link or write something...
					</p>
				</div>
			</main>
		</div>
	);
}
