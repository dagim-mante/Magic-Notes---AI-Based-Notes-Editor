import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <main className='max-w-3xl mx-auto'>
          <Navbar />
          <div className='mt-4'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
