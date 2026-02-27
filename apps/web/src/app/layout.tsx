import type { Metadata } from "next";

import { DM_Mono, DM_Sans } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

const dmMono = DM_Mono({
	variable: "--font-dm-mono",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Recall",
	description: "recall",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${dmSans.variable} ${dmMono.variable} min-h-svh antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
