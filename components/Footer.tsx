import React from 'react';
import { Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="scroll-mt-24 bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-red tracking-wider">SCHILLERPLUS</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Expertos en salud visual y fragancias de lujo. Combinamos tecnología óptica de vanguardia con las esencias más exclusivas del mundo.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.instagram.com/opticas_schillerplus/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-brand-red transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2 inline-block">Contacto</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-brand-red flex-shrink-0 mt-1" />
                <span>Av Carlos Condell 1687 local 26 (Mall Quillota Shopping)<br/>Quillota, Chile</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-brand-red flex-shrink-0" />
                <span>+56 9 XXXXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-brand-red flex-shrink-0" />
                <span>contacto@schillerplus.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-gray-700 pb-2 inline-block">Horario</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center"><Clock size={16} className="mr-2"/> Lunes - Viernes</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center"><Clock size={16} className="mr-2"/> Sábado</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex items-center justify-between text-brand-red">
                <span className="flex items-center"><Clock size={16} className="mr-2"/> Domingo</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Schillerplus. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};