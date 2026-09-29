import DemoDataBadge from "@/components/DemoDataBadge";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreHydrator from "@/components/StoreHydrator";
import Footer from "@/components/Footer";
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
  metadataBase: new URL('https://greedycart.vercel.app'),
  title: {
    template: '%s | GreedyCart',
    default: 'GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More'
  },
  description: 'Your ultimate e-commerce aggregator. We scan Amazon, Flipkart, Myntra, and more to find the deepest live discounts on electronics, gadgets, and fashion.',
  openGraph: {
    title: 'GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More',
    description: 'Compare prices instantly across all top Indian platforms. Stop overpaying.',
    url: 'https://greedycart.vercel.app',
    siteName: 'GreedyCart',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/headphone.png', width: 1200, height: 630, alt: 'GreedyCart' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More',
    description: 'Compare prices instantly across all top Indian platforms. Stop overpaying.',
    images: ['/headphone.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
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
            <DemoDataBadge />
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
            <StoreHydrator />
            <main id="content" className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
