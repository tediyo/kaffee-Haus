import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WebsiteDataProvider } from "@/contexts/WebsiteDataContext";
import NavigationWrapper from "@/components/NavigationWrapper";

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
        <WebsiteDataProvider>
          <CartProvider>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
          </CartProvider>
        </WebsiteDataProvider>
      </body>
    </html>
  );
}
