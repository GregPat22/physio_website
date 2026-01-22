import type { Metadata } from 'next';
import { Open_Sans, Roboto_Mono } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Physiotherapy & Rehabilitation',
  description: 'Personalized care to help you move better, feel better, and live better.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${robotoMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
