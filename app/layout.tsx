import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/Header";

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Bud v2",
  description: "New frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-linear-to-b from-blue-500 from-20% via-zinc-100 via-60% to-zinc-50 to-90% antialiased bg-no-repeat`}
      >
        <Header/>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
