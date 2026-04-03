'use client';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeWrapper({ children }) {
  const { theme } = useTheme();

  return (
    <div style={{
      '--primary-blue': theme.primaryBlue,
      '--accent-red': theme.accentRed,
      '--font-family': theme.fontFamily,
      fontFamily: theme.fontFamily,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {children}
    </div>
  );
}
