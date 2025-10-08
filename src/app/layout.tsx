import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/contexts/NotificationContext";
import NotificationContainer from "@/components/NotificationContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaffee Haus - Premium Coffee Experience",
  description: "Experience the perfect blend of tradition and innovation in every cup. From farm-fresh beans to expertly crafted beverages, we bring you the finest coffee experience.",
  keywords: "coffee, cafe, coffee shop, premium coffee, latte, espresso, cappuccino, pastries, breakfast, brunch",
  authors: [{ name: "Kaffee Haus" }],
  openGraph: {
    title: "Kaffee Haus - Premium Coffee Experience",
    description: "Experience the perfect blend of tradition and innovation in every cup.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          {children}
          <NotificationContainer />
        </NotificationProvider>
        <footer className="bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Kaffee Haus. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
