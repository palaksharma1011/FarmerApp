import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "FarmBazaar",
  description: "Farmer App built with Next.js and Tailwind CSS",
    icons: {
    icon: "assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body>
       {children}
      </body>
    </html>
  );
}
