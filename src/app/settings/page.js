'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isAuthorized } from '@/data/members';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const { theme, updateTheme, membersData, updateMember } = useTheme();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('theme');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/');
      } else {
        const authStatus = isAuthorized(user.email);
        setAuthorized(authStatus);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="page-wrapper" style={{textAlign:"center", paddingTop: "5rem"}}>authorized checking...</div>;

  if (!authorized) {
    return (
      <div className="page-wrapper" style={{textAlign:"center", paddingTop: "5rem"}}>
        <h2>Forbidden Access</h2>
        <p style={{color: "var(--accent-red)"}}>authorized member only can change this.</p>
        <button className="btn-primary" onClick={() => router.push('/')} style={{marginTop: "1rem"}}>back to home</button>
      </div>
    );
  }

  const handleThemeChange = (e) => {
    updateTheme({
      ...theme,
      [e.target.name]: e.target.value
    });
  };

  const handleMemberChange = (index, field, value) => {
    updateMember(index, field, value);
  };

  return (
    <div className="settings-box">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Dashboard</h2>
        <button className="btn-primary" onClick={() => router.push('/')}>save</button>
      </div>
      <p style={{marginBottom: "2rem"}}>welcome, admin! edit bios or theme here.</p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button 
          className={activeTab === 'theme' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('theme')}
          style={{flex: 1}}
        >
          Theme
        </button>
        <button 
          className={activeTab === 'members' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('members')}
          style={{flex: 1}}
        >
          Bios
        </button>
      </div>
      
      {activeTab === 'theme' && (
        <div className="tab-pane">
          <div className="form-group">
            <label>prime blue color</label>
            <input 
              type="color" 
              name="primaryBlue" 
              value={theme.primaryBlue} 
              onChange={handleThemeChange} 
            />
          </div>

          <div className="form-group">
            <label>accent red color</label>
            <input 
              type="color" 
              name="accentRed" 
              value={theme.accentRed} 
              onChange={handleThemeChange} 
            />
          </div>

          <div className="form-group">
            <label>font family</label>
            <select name="fontFamily" value={theme.fontFamily} onChange={handleThemeChange}>
              <option value="'Inter', sans-serif">inter</option>
              <option value="'Outfit', sans-serif">outfit</option>
              <option value="'Segoe UI', Roboto, sans-serif">system</option>
              <option value="'Courier New', monospace">mono</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="tab-pane" style={{ overflowY: "auto", maxHeight: "500px", paddingRight: "10px" }}>
          {membersData.map((member, index) => (
            <div key={index} style={{ border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: "700", marginBottom: "1rem" }}>Member {index + 1}</div>
              
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>name</label>
                <input 
                  type="text" 
                  value={member.name} 
                  onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "white", borderRadius: "4px" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>npm</label>
                <input 
                  type="text" 
                  value={member.npm} 
                  onChange={(e) => handleMemberChange(index, "npm", e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "white", borderRadius: "4px" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label>role</label>
                <input 
                  type="text" 
                  value={member.role} 
                  onChange={(e) => handleMemberChange(index, "role", e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "white", borderRadius: "4px" }}
                />
              </div>

              <div className="form-group">
                <label>desc</label>
                <textarea 
                  value={member.description} 
                  onChange={(e) => handleMemberChange(index, "description", e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "white", borderRadius: "4px", minHeight: "80px", resize: "vertical" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
