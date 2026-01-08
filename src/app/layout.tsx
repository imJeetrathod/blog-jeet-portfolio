import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Experiments & Builds",
  description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
  keywords: ["AI tools", "Salesforce", "AI experiments", "vibe coding", "AI-powered solutions"],
  authors: [{ name: "Jeet Rathod" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "AI Experiments & Builds",
    description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
    url: "https://tech.jeetrathod.vercel.app",
    siteName: "AI Experiments & Builds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Experiments & Builds",
    description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
