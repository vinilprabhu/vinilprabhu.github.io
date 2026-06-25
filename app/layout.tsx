import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vinil Prabhu | Senior System Architect',
  description: 'Portfolio site for Vinil Prabhu, a senior full-stack and backend engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
