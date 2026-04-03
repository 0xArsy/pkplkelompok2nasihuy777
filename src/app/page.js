'use client';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { membersData } = useTheme();

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.linear-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div className="page-wrapper" onMouseMove={handleMouseMove}>
      <header className="linear-hero">
        <div className="badge">Tugas 2 PKPL</div>
        <h1>Kelompok Nasihuy777</h1>
        <p>Authentication & Authorization Implementation</p>
      </header>

      <section className="linear-grid">
        {membersData.map((member) => (
          <div key={member.name} className="linear-card">
            <div className="card-glow"></div>
            
            <div className="card-content">
              <div className="image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="member-image" 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = `https://api.dicebear.com/9.x/notionists/svg?seed=${member.name}`; 
                  }}
                />
              </div>
              
              <div className="member-info">
                <h3>{member.name}</h3>
                <span className="npm">{member.npm}</span>
                <span className="role">{member.role}</span>
                <p className="desc">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
