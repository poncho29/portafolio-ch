import type { Metadata } from "next";

import { Footer, Header } from "@/components/layout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto p-6 ">
        {children}
      </main>

      <Footer />
    </>
  );
}
