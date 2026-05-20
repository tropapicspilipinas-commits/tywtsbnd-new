import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Things You Wanted To Say But Never Did",
  description:
    "An anonymous archive of unspoken words and letters.",
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