import type { Metadata } from "next";

import { Sidebar } from "@/components/layout";

export const metadata: Metadata = {
  title: "Administarator",
  description: "Gestion de contenido",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />

      <div className="grow h-full p-4">
        {children}
      </div>
    </div>
  );
}
