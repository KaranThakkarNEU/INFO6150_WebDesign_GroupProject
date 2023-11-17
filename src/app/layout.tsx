import { ReactNode } from 'react';
import './globals.css';
import ThemeRegistry from './../utility/ThemeRegistry/ThemeRegistry';
import { AuthProvider } from '../utility/context/auth';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
