import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/farmer.css";
import Navbar from "@/components/farmer/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farmer App",
  description: "Farmer App built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
            <Navbar />
        </header>
            <main>{children}</main>       
        </body>
    </html>
  );
}
