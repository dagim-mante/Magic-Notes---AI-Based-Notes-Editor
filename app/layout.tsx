import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magic Notes",
  description: "A place to explore your notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
