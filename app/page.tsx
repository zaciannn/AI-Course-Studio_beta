import Hero from '@/components/Hero';
import React from 'react';

// Simple Interface for Nav Links
interface NavLink {
  label: string;
  href: string;
}

const Home: React.FC = () => {
  const navLinks: NavLink[] = [
    { label: 'My Courses', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'FAQs', href: '#' },
  ];

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-blue-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-black tracking-tighter text-blue-600 cursor-pointer">
          AI Course Studio
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button 
          className="px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-full hover:bg-gray-800 transition shadow-sm"
        >
                      <a href='/login'>Sign In</a>
        </button>
      </nav>

      <main>
        <Hero />
      </main>

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Course Studio</p>
      </footer>
    </div>
  );
}

export default Home;