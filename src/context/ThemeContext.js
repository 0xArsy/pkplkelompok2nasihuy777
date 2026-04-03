'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { members as initialMembers } from '@/data/members';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    primaryBlue: '#003366',
    accentRed: '#990000',
    fontFamily: 'Inter, sans-serif'
  });
  
  const [membersData, setMembersData] = useState(initialMembers);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "settings", "global_config"), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.theme) setTheme(data.theme);
          if (data.members) setMembersData(data.members);
        } else {
          pushToCloud(theme, initialMembers);
        }
        setIsInitializing(false);
      });
      return () => unsub();
    } catch (error) {
      console.error("error loading sync:", error);
      setIsInitializing(false);
    }
  }, []);

  const pushToCloud = async (currentTheme, currentMembers) => {
    try {
      await setDoc(doc(db, "settings", "global_config"), {
        theme: currentTheme,
        members: currentMembers,
        lastUpdated: new Date()
      });
    } catch (e) {
      console.error("error pushing sync:", e);
    }
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    pushToCloud(newTheme, membersData);
  };

  const updateMember = (index, field, value) => {
    const newMembersData = [...membersData];
    newMembersData[index] = { ...newMembersData[index], [field]: value };
    setMembersData(newMembersData);
    pushToCloud(theme, newMembersData);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, membersData, updateMember, isInitializing }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
