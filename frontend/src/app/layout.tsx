import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TanstackProvider from "@/providers/TanstackProvider";
const queryClient = new QueryClient();


export const metadata: Metadata = {
  title: "Voyager",
  description: "A Blockchain Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bgPrimary">
      <body className="">
        <TanstackProvider>
        <div className="flex justify-center">
          <div className="w-[100%] ">{children}</div>
        </div>
        </TanstackProvider>
        </body>
    </html>
  );
}
