interface RecallCardContent {
	description: string;
	title: string;
}

interface RecallCardProps {
	content: RecallCardContent;
	title: string;
}

export function RecallCard({ title, content }: RecallCardProps) {
	return (
		<article className="flex flex-col gap-12">
			<h2 className="text-[1.3rem] leading-[1.4] tracking-tighter sm:text-3xl">
				{title}
			</h2>
			<div className="flex flex-col items-center gap-2">
				<h3 className="text-sm sm:text-base">{content.title}</h3>
				<p className="text-muted-foreground text-xs sm:text-sm">
					{content.description}
				</p>
			</div>
		</article>
	);
}
