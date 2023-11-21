import { ReactNode } from 'react';
import './globals.css';
import ThemeRegistry from './../utility/ThemeRegistry/ThemeRegistry';
import { AuthProvider } from '../utility/context/auth';
import NavbarComponent from '@/components/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <ThemeRegistry>
            <NavbarComponent>{children}</NavbarComponent>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
