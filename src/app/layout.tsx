import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";

import SessionWrapper from "@/components/SessionWrapper";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greedy Cart | Discover Massive Price Drops",
  description: "Your ultimate e-commerce aggregator. We scan Amazon, Flipkart, Myntra, and more to find the deepest live discounts on electronics, gadgets, and fashion.",
  openGraph: {
    title: "Greedy Cart | Live Price Drops",
    description: "Compare prices instantly across all top Indian platforms. Stop overpaying.",
    url: "https://greedycart.vercel.app",
    siteName: "Greedy Cart",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greedy Cart | Live Price Drops",
    description: "Compare prices instantly across all top Indian platforms. Stop overpaying.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SessionWrapper>
          <ThemeProvider 
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          >
            <Toaster 
              position="top-center" 
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white rounded-2xl shadow-xl font-medium border border-gray-100 dark:border-gray-700',
                success: {
                  iconTheme: {
                    primary: '#ff2d3d',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <Navbar/>
            {children}
            <CartDrawer />
            <QuickViewModal />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
