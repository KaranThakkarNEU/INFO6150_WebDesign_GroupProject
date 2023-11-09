import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/utility/ThemeRegistry/ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
