import Link from "next/link";

function EmptyState() {
	return (
		<div className="flex flex-col items-center gap-2 opacity-70">
			<p className="text-xs tracking-wide sm:text-sm">
				You haven't saved anything yet.
			</p>
			<p className="text-muted-foreground text-xs sm:text-sm">
				When something matters, send it here.
			</p>
		</div>
	);
}

function PageHeader() {
	return (
		<header>
			<nav>
				<Link
					aria-label="Go back to today's page"
					className="text-muted-foreground transition-colors hover:text-foreground"
					href="/today"
				>
					Back
				</Link>
			</nav>
		</header>
	);
}

export default function VaultPage() {
	return (
		<div className="container mx-auto w-full px-6 pt-16">
			<PageHeader />
			<main className="mt-36 flex flex-col items-center gap-4">
				<EmptyState />
			</main>
		</div>
	);
}
