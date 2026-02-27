interface PageHeaderProps {
	backHref?: string;
	showBackLink?: boolean;
	title: string;
}

export function PageHeader({
	title,
	showBackLink = false,
	backHref = "/",
}: PageHeaderProps) {
	return (
		<header className="flex items-center justify-between">
			{showBackLink ? (
				<nav>
					<a
						aria-label="Go back"
						className="text-muted-foreground transition-colors hover:text-foreground"
						href={backHref}
					>
						Back
					</a>
				</nav>
			) : null}
			<h1 className="font-medium">{title}</h1>
		</header>
	);
}
