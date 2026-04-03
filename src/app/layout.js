import { ThemeProvider } from '@/context/ThemeContext';
import ThemeWrapper from '@/components/ThemeWrapper';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'PKPL Tugas 2 - Nasihuy777',
  description: 'Authentication & Authorization Demo - Biodata Kelompok',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeWrapper>
            <Navbar />
            <main className="container">
              {children}
            </main>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
