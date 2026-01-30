import type { Metadata } from "next";
import { Roboto_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Physiotherapy & Rehabilitation",
  description:
    "Personalized care to help you move better, feel better, and live better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${robotoFlex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
