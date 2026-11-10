import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lived — Verified human experiences and materials",
  description:
    "Discover first-hand human experiences and human-made materials, with evidence behind every Lived Verified mark.",
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
