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
    "fc:frame": JSON.stringify({
      version: "1",
      name: "ZoraTimeLock",
      iconUrl: "https://zoratimelock.xyz/logo.png",
      homeUrl: "https://zoratimelock.xyz",
      imageUrl: "https://zoratimelock.xyz/og-image.png",
      buttonTitle: "🚀 Start",
      splashImageUrl: "https://zoratimelock.xyz/logo.png",
      splashBackgroundColor: "#000000",
    }),
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
