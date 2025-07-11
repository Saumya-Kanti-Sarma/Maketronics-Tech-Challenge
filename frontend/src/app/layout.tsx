import type { Metadata } from "next";
import Navbar from "@/component/Navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Commerce Website | Saumya Sarma",
  description: "A project work to demosntrate frontend knowledge. Done by Saumya Sarma for internship opportunity at ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
