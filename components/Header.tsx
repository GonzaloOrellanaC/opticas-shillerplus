import React, { useState } from 'react';
import { Menu, X, Instagram, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Óptica', href: '#optica' },
    { name: 'Perfumería', href: '#perfumeria' },
    { name: 'Agenda Médica', href: '#appointment' },
    { name: 'Asistente IA', href: '#ai-assistant' },
    { name: 'Contacto', href: '#contact' },
  ];

  // Fallback if the provided logo URL fails or expires
  const logoUrl = "https://lh6.googleusercontent.com/proxy/kXgLTKmEOl4VWrEK-EHkqDQm2nGnrxXRGIDl9MpvbDXk2pGrd84y28mG0lqodI4fQNfWAHgTRjeHM-ZxcvR0yzpqt3lzPrOyA3SRDhriivcLaZi8YDVjOggNON2Ys6fNieGDF0I";

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img 
              className="h-16 w-auto object-contain" 
              src={logoUrl} 
              alt="Logo de Schillerplus"
              onError={(e) => {
                // Fallback text if image fails
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden ml-2 text-2xl font-bold text-brand-red font-sans tracking-tighter">
              SCHILLERPLUS
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-brand-grey hover:text-brand-red px-3 py-2 text-sm font-medium transition-colors duration-200 uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://www.instagram.com/opticas_schillerplus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-red hover:text-brand-dark transition-colors"
            >
              <Instagram size={24} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-red focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-brand-grey hover:text-brand-red block px-3 py-2 text-base font-medium border-l-4 border-transparent hover:border-brand-red transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};