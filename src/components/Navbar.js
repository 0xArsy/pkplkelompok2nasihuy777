'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { useTheme } from '@/context/ThemeContext';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { isAuthorized } from '@/data/members';

export default function Navbar() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav 
      className="navbar" 
      style={{ 
        borderBottom: "2px solid transparent",
        borderImage: `linear-gradient(to right, ${theme.primaryBlue} 0%, ${theme.primaryBlue} 45%, ${theme.accentRed} 55%, ${theme.accentRed} 100%) 1`
      }}
    >
      <div className="nav-container">
        <Link href="/" className="logo">Nasihuy777</Link>
        <div className="nav-links">
          <Link href="/">Biodata</Link>
          {user && isAuthorized(user.email) && (
            <Link href="/settings">Settings</Link>
          )}
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
