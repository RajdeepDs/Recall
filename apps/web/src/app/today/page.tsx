export default function TodayPage() {
	return (
		<div className="container mx-auto w-full px-6 pt-16">
			<header>
				<h1 className="font-medium">Recall</h1>
			</header>
			<main className="mt-24 flex flex-col items-center gap-4">
				<div className="flex flex-col items-center gap-8">
					<h2 className="font-mono text-muted-foreground/50 text-xs tracking-tight">
						You saved this 63 days ago.
					</h2>
					<div className="flex flex-col gap-12">
						<h1 className="text-[1.3rem] leading-[1.4] tracking-tighter sm:text-3xl">
							What were you trying to fix that night?
						</h1>
						<div className="flex flex-col items-center gap-2">
							<p className="text-sm sm:text-base">
								Why You’re Always Tired (It’s Not Burnout)
							</p>
							<p className="text-muted-foreground text-xs sm:text-sm">
								A thread about avoidance disguised as productivity.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
