// app/layout.tsx
import type { Metadata } from "next";
import "../../styles/govt.css";
import Footer from "@/components/(common)/Footer";

export const metadata: Metadata = {
  title: "FarmBazaar - Govt",
  description: "Government Portal for Agricultural Data and Farmer Support",
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
        {/* <SidebarDemo /> */}
        {/* <Dashboard /> */}
        {children}
        <Footer />
        </body>
    </html>
  );
}
