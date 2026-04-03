'use client';
import { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { isAuthorized } from '@/data/members';

export default function AuthButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const handleSignOut = () => signOut(auth);

  if (user) {
    return (
      <div className="auth-container">
        <span className="user-email">{user.email}</span>
        {isAuthorized(user.email) && <span className="admin-badge">Team Member</span>}
        <button onClick={handleSignOut} className="btn-secondary">Log Out</button>
      </div>
    );
  }

  return <button onClick={handleSignIn} className="btn-primary">Login with Google</button>;
}
