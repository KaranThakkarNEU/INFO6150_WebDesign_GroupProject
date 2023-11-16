import { ReactNode } from 'react';
import './globals.css';
import ThemeRegistry from './../utility/ThemeRegistry/ThemeRegistry';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
