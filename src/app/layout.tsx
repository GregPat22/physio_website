import type { Metadata } from "next";
import {
  Roboto_Mono,
  Roboto_Flex,
  Open_Sans,
  Montserrat,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const libreBodoni = localFont({
  src: [
    {
      path: "../fonts/libre-bodoni/LibreBodoni-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/libre-bodoni/LibreBodoni-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/libre-bodoni/LibreBodoni-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/libre-bodoni/LibreBodoni-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-libre-bodoni",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
        className={`${libreBodoni.variable} ${robotoMono.variable} ${robotoFlex.variable} ${openSans.variable} ${montserrat.variable} min-h-screen bg-[url('/BG-Color.jpg')] bg-cover bg-fixed bg-center bg-no-repeat antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
