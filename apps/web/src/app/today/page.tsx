"use client";

import { PageHeader } from "@/components/layout/page-header";
import { RecallCard } from "@/components/recall-card";

// TODO: Replace with actual data fetching
const MOCK_RECALL_DATA = {
	daysAgo: 63,
	title: "What were you trying to fix that night?",
	content: {
		title: "Why You're Always Tired (It's Not Burnout)",
		description: "A thread about avoidance disguised as productivity.",
	},
} as const;

export default function TodayPage() {
	const { daysAgo, title, content } = MOCK_RECALL_DATA;

	return (
		<div className="container mx-auto w-full px-6 pt-16">
			<PageHeader title="Recall" />

			<main className="mt-24 flex flex-col items-center gap-4">
				<div className="flex flex-col items-center gap-8">
					<p className="font-mono text-muted-foreground/50 text-xs tracking-tight">
						You saved this {daysAgo} days ago.
					</p>

					<RecallCard content={content} title={title} />
				</div>
			</main>
		</div>
	);
}
