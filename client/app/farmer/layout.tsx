import type { Metadata } from "next";
import "../../styles/farmer.css";


export const metadata: Metadata = {
  title: "FarmBazaar - Farmer",
  description: "Farmer App to sell and manage farm products",
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
      <body>
        {/* <header>
            <Navbar />
        </header> */}
            <main>{children}</main>       
        </body>
    </html>
  );
}
