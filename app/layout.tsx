import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Unique Component Collection",
  description: "A set of unique components posting daily on X",
  openGraph: {
    title: "Unique Component Collection",
    description:
      "Animated UI components built with Next.js, Tailwind CSS and Motion",
    url: "https://daily-components-five.vercel.app",
    siteName: "Daily Components",
    images: [
      {
        url: "/OGF.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Component Collection",
    description:
      "Animated UI components built with Next.js, Tailwind CSS and Motion",
    images: ["/OGF.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
