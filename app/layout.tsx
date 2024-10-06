import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { auth } from "@/server/auth";

import NavBar from "@/components/navigation/nav";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magic Notes",
  description: "A place to explore your notes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <NavBar session={session}/>
          {children}
          <Toaster position="top-right"/>
        </div>
      </body>
    </html>
  );
}
