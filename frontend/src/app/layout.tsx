import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Customer Dashboard",
  description: "Visualisasi data customer gender dan aktivitas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
