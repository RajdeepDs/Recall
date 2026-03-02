import type { RouterClient } from "@orpc/server";
import prisma from "@recall/db";
import metascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../index";

// Initialize metascraper with plugins
const scraper = metascraper([
	metascraperTitle(),
	metascraperDescription(),
	metascraperImage(),
	metascraperUrl(),
]);

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	saveMemory: protectedProcedure
		.input(
			z.object({
				url: z.string().url().optional(),
				title: z.string().min(1),
				description: z.string().default(""),
				note: z.string().optional(),
			})
		)
		.handler(async ({ context, input }) => {
			const memory = await prisma.memory.create({
				data: {
					id: crypto.randomUUID(),
					title: input.title,
					description: input.description,
					url: input.url,
					note: input.note,
					userId: context.session.user.id,
				},
			});

			return {
				success: true,
				memory,
			};
		}),
	fetchMetadata: publicProcedure
		.input(z.object({ url: z.string().url() }))
		.handler(async ({ input }) => {
			try {
				const response = await fetch(input.url, {
					headers: {
						"User-Agent":
							"Mozilla/5.0 (compatible; RecallBot/1.0; +https://recall.app)",
					},
					signal: AbortSignal.timeout(10_000),
				});

				if (!response.ok) {
					throw new Error("Failed to fetch URL");
				}

				const html = await response.text();

				// Extract metadata using metascraper
				const metadata = await scraper({ html, url: input.url });

				return {
					success: true,
					title: metadata.title || "",
					description: metadata.description || "",
					image: metadata.image || undefined,
				};
			} catch (error) {
				return {
					success: false,
					title: "",
					description: "",
					error:
						error instanceof Error ? error.message : "Failed to fetch metadata",
				};
			}
		}),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
