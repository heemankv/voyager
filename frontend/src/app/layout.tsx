import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TanstackProvider from "@/providers/TanstackProvider";
const queryClient = new QueryClient();


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
    <html lang="en" className="bg-bgPrimary">
      <body className="">
        <TanstackProvider>
        <div className="flex justify-center mt-32">
          <div className="w-[95%] rounded-lg"   >{children}</div>
        </div>
        </TanstackProvider>
        </body>
    </html>
  );
}
