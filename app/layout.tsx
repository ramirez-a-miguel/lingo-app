import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "LingoTube",
  description: "A language-learning YouTube clone POC with AI coaching hooks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
