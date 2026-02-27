import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function SavePage() {
	return (
		<div className="container mx-auto w-full px-6 pt-16">
			<header>
				<nav aria-label="Breadcrumb navigation">
					<Link
						aria-label="Go back to today's page"
						className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
						href="/today"
					>
						<span>Back</span>
					</Link>
				</nav>
			</header>

			<main className="mt-36 flex flex-col items-center gap-4">
				<section
					aria-labelledby="save-heading"
					className="flex w-full max-w-2xl flex-col gap-4 text-center"
				>
					<h1
						className="text-[1.3rem] leading-[1.4] tracking-tighter sm:text-3xl"
						id="save-heading"
					>
						What do you want to remember?
					</h1>
					<Input
						className="border-none text-center text-muted-foreground placeholder:text-center placeholder:text-muted-foreground/40 placeholder:text-xs focus:placeholder:text-transparent focus-visible:border-0 focus-visible:ring-0 sm:placeholder:text-sm dark:bg-transparent"
						placeholder="Paste a link or write something..."
					/>
				</section>
			</main>
		</div>
	);
}
