import { Navbar } from './components/Navbar';
import { CursorFollower } from './components/CursorFollower';
import { ScrollDecoration } from './components/ScrollDecoration';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Custom Cursor follower */}
      <CursorFollower />

      {/* Scrollbar vertical text decoration */}
      <ScrollDecoration />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Minimalist Footer */}
      <footer style={{
        padding: '3rem 0',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span>© {currentYear} DAVID IVAN. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
