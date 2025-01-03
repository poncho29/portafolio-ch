import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { Toaster } from 'react-hot-toast';

import "./globals.css";

const geistPoppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

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
    <html lang="es">
      <body
        className={`${geistPoppins.className} antialiased`}
      >

        { children }

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
