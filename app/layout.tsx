import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { FinancialProvider } from "@/contexts/FinancialContext";
import { Toaster } from "sonner"; // Change import to use sonner directly

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinancialProvider>{children}</FinancialProvider>
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  generator: "v0.dev",
};
