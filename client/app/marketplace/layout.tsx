// app/layout.tsx
import type { Metadata } from "next";
import "../../styles/marketplace.css";
import { NavigationMenuDemo } from "@/components/marketplace/Navbar";
import Footer from "@/components/(common)/Footer";

export const metadata: Metadata = {
  title: "FarmBazaar - Marketplace",
  description: "E-commerce to shop fresh and 100% organic farm products",
      icons: {
    icon: "assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationMenuDemo />
        {children}
        <Footer />
        </body>
    </html>
  );
}
