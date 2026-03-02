"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { client } from "@/utils/orpc";

const URL_REGEX =
	/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

type FormState = "idle" | "fetching" | "editing" | "saving";

export default function SavePage() {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const [input, setInput] = useState("");
	const [state, setState] = useState<FormState>("idle");
	const [metadata, setMetadata] = useState({
		title: "",
		description: "",
		url: "",
	});
	const [note, setNote] = useState("");

	const isValidUrl = (text: string): boolean => {
		return URL_REGEX.test(text.trim());
	};

	const handleInputSubmit = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key !== "Enter" || !input.trim()) {
			return;
		}

		event.preventDefault();
		const trimmedInput = input.trim();

		// Check if it's a URL
		if (isValidUrl(trimmedInput)) {
			setState("fetching");

			try {
				const result = await client.fetchMetadata({
					url: trimmedInput,
				});

				if (result.success && result.title) {
					// Successfully fetched metadata
					setMetadata({
						title: result.title,
						description: result.description || "",
						url: trimmedInput,
					});
					setState("editing");
				} else {
					// Failed to fetch metadata, allow manual entry
					setMetadata({
						title: "",
						description: "",
						url: trimmedInput,
					});
					setState("editing");
					toast.info("Couldn't fetch page details. Please enter a title.");
				}
			} catch {
				// Error fetching, allow manual entry
				setMetadata({
					title: "",
					description: "",
					url: trimmedInput,
				});
				setState("editing");
				toast.error("Failed to fetch URL metadata. Please enter manually.");
			}
		} else {
			// It's plain text, treat as title
			setMetadata({
				title: trimmedInput,
				description: "",
				url: "",
			});
			setState("editing");
		}
	};

	const handleSave = async () => {
		if (!metadata.title.trim()) {
			toast.error("Please enter a title");
			return;
		}

		setState("saving");

		try {
			await client.saveMemory({
				title: metadata.title,
				description: metadata.description,
				url: metadata.url || undefined,
				note: note.trim() || undefined,
			});

			toast.success("Memory saved successfully!");
			router.push("/today");
		} catch {
			setState("editing");
			toast.error("Failed to save memory. Please try again.");
		}
	};

	const handleCancel = () => {
		setInput("");
		setMetadata({ title: "", description: "", url: "" });
		setNote("");
		setState("idle");
		inputRef.current?.focus();
	};

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

					{state === "idle" && (
						<Input
							aria-label="Enter URL or text to remember"
							className="border-none text-center text-muted-foreground placeholder:text-center placeholder:text-muted-foreground/40 placeholder:text-xs focus:placeholder:text-transparent focus-visible:border-0 focus-visible:ring-0 sm:placeholder:text-sm dark:bg-transparent"
							disabled={false}
							onChange={(event) => setInput(event.target.value)}
							onKeyDown={handleInputSubmit}
							placeholder="Paste a link or write something..."
							ref={inputRef}
							value={input}
						/>
					)}

					{state === "fetching" && (
						<div className="flex flex-col items-center gap-2">
							<div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground" />
							<p className="text-muted-foreground text-sm">
								Fetching page details...
							</p>
						</div>
					)}

					{(state === "editing" || state === "saving") && (
						<div className="flex flex-col gap-4 text-left">
							<div className="flex flex-col gap-2">
								<label
									className="font-medium text-muted-foreground text-sm"
									htmlFor="title-input"
								>
									Title
								</label>
								<Input
									aria-required="true"
									className="text-base"
									disabled={state === "saving"}
									id="title-input"
									onChange={(event) =>
										setMetadata({ ...metadata, title: event.target.value })
									}
									placeholder="Enter a title"
									value={metadata.title}
								/>
							</div>

							{metadata.url && (
								<div className="flex flex-col gap-2">
									<label
										className="font-medium text-muted-foreground text-sm"
										htmlFor="url-display"
									>
										URL
									</label>
									<p
										className="truncate text-muted-foreground/60 text-sm"
										id="url-display"
									>
										{metadata.url}
									</p>
								</div>
							)}

							{metadata.description && (
								<div className="flex flex-col gap-2">
									<label
										className="font-medium text-muted-foreground text-sm"
										htmlFor="description-display"
									>
										Description
									</label>
									<p
										className="text-muted-foreground/80 text-sm"
										id="description-display"
									>
										{metadata.description}
									</p>
								</div>
							)}

							<div className="flex flex-col gap-2">
								<label
									className="font-medium text-muted-foreground text-sm"
									htmlFor="note-input"
								>
									Note (optional)
								</label>
								<Textarea
									className="min-h-24 resize-none"
									disabled={state === "saving"}
									id="note-input"
									onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
										setNote(event.target.value)
									}
									placeholder="Add a personal note..."
									value={note}
								/>
							</div>

							<div className="flex gap-3">
								<Button
									className="flex-1"
									disabled={state === "saving" || !metadata.title.trim()}
									onClick={handleSave}
								>
									{state === "saving" ? "Saving..." : "Save Memory"}
								</Button>
								<Button
									disabled={state === "saving"}
									onClick={handleCancel}
									variant="outline"
								>
									Cancel
								</Button>
							</div>
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
