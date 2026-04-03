'use client';
import { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { isAuthorized } from '@/data/members';

export default function AuthButton() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("sign in failed:", error);
      setLoading(false);
    }
  };

  const handleSignOut = () => signOut(auth);

  if (user) {
    return (
      <div className="auth-container">
        <span className="user-email">{user.email}</span>
        {isAuthorized(user.email) && <span className="admin-status">team member</span>}
        <button onClick={handleSignOut} className="btn-secondary">log out</button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleSignIn} 
      className="btn-primary" 
      disabled={loading}
    >
      {loading ? "logging in..." : "login with google"}
    </button>
  );
}
