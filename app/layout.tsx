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
    <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
<meta name="twitter:image" content="<generated>" />
<meta name="twitter:image:type" content="<generated>" />
<meta name="twitter:image:width" content="<generated>" />
<meta name="twitter:image:height" content="<generated>" />
        </head>
      <body className={inter.className}>
        <div className="flex-grow px-6 md:px-12 mx-auto max-w-7xl">
          <NavBar session={session}/>
          {children}
          <Toaster position="top-right"/>
        </div>
      </body>
    </html>
  );
}
