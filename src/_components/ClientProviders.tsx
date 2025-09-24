"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/_components/ThemeProvider";
import LocaleProvider from "@/_components/LocaleProvider";
import QueryProvider from "@/_components/QueryProvider";
import { Toaster } from "react-hot-toast";
import { NuqsAdapter } from "nuqs/adapters/next";
import AuthProvider from "./AuthProvider";

export default function ClientProviders({ children }: PropsWithChildren) {
	return (
		<LocaleProvider>
			<NuqsAdapter>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						{children}
					</QueryProvider>
					<Toaster position="top-center" containerClassName="text-[12px]" />
				</ThemeProvider>
			</NuqsAdapter>
		</LocaleProvider>
	);
}
