import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Care.infinity | Trusted Caregiving Services",
  description: "Reliable care for children, elderly, and sick family members.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer/>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
