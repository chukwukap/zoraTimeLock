import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZoraTimeLock",
  description:
    "Tokenize your upcoming content. Set release dates. Start earning before creation.",
  openGraph: {
    title: "ZoraTimeLock",
    description:
      "Tokenize your upcoming content. Set release dates. Start earning before creation.",
    images: [
      {
        url: "https://zoratimelock.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZoraTimeLock",
      },
    ],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://zoratimelock.xyz/og-image.png",
    "fc:frame:button:1": "🚀 Start",
    "fc:frame:post_url": "https://zoratimelock.xyz/api/frame",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
