import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SkiLevel — Your mountain experience, ready to share',
  description: 'A portable skier and snowboarder ability profile for faster, better lessons.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://skilevel.com'),
  openGraph: { title: 'SkiLevel', description: 'Your mountain experience, ready to share.', images: [{ url: '/og.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'SkiLevel', description: 'Your mountain experience, ready to share.', images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const body = (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  );

  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? <ClerkProvider>{body}</ClerkProvider> : body}
    </html>
  );
}
