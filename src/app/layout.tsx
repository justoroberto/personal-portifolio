import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Roberto Justo | Portfolio',
  description: 'Professional IT Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
