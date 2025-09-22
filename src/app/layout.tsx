import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/_components/Providers";
import { pretendard } from "@/_theme/fonts";

export const metadata: Metadata = {
  title: "TAPAYZ",
  description: "TAPAYZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
