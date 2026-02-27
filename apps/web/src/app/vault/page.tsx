import Link from "next/link";

export default function VaultPage() {
	return (
		<div className="container mx-auto w-full px-6 pt-16">
			<header>
				<Link className="text-muted-foreground" href={"/today"}>
					Back
				</Link>
			</header>
			<main className="mt-36 flex flex-col items-center gap-4">
				<div className="flex flex-col items-center gap-2 opacity-70">
					<p className="text-xs tracking-wide sm:text-sm">
						You haven't saved anything yet.
					</p>
					<p className="text-muted-foreground text-xs sm:text-sm">
						When something matters, send it here.
					</p>
				</div>
			</main>
		</div>
	);
}
