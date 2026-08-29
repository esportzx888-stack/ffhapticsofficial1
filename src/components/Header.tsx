import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, Shield, Sparkles, MessageSquare, Smartphone, Cpu } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onAdminTrigger: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminTrigger, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', id: 'product', icon: Cpu },
    { name: 'Features', id: 'features', icon: Sparkles },
    { name: 'Chat', id: 'chat', icon: MessageSquare },
    { name: 'Download for Android', id: 'download', icon: Download, isCta: true },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#1F1F1F]/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo with 5-click hidden admin access */}
        <div className="flex items-center gap-3">
          <Logo onAdminTrigger={onAdminTrigger} size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            if (link.isCta) {
              return (
                <button
                  key={link.id}
                  id={`nav-btn-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(255,159,28,0.3)] hover:shadow-[0_0_25px_rgba(255,159,28,0.5)] active:scale-95 cursor-pointer"
                >
                  <link.icon className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                  <span>{link.name}</span>
                </button>
              );
            }
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#FF9F1C] transition-colors duration-200 cursor-pointer relative py-1"
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1F1F1F] text-neutral-200 hover:text-[#FF9F1C] border border-[#2A2A2A] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#1F1F1F] px-4 pt-3 pb-6 space-y-2 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-heading uppercase text-sm tracking-wider transition-all duration-200 cursor-pointer ${
                    link.isCta
                      ? 'bg-[#FF9F1C] text-black font-bold shadow-[0_0_20px_rgba(255,159,28,0.3)]'
                      : 'bg-[#141414] text-neutral-200 hover:text-[#FF9F1C] hover:bg-[#1A1A1A] border border-[#1F1F1F]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <link.icon className={`w-4 h-4 ${link.isCta ? 'text-black' : 'text-[#FF9F1C]'}`} />
                    {link.name}
                  </span>
                  <span className="text-xs opacity-60">→</span>
                </button>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-[#1F1F1F] flex items-center justify-between text-xs text-neutral-500 px-1">
              <span>Free Fire MAX Competitive OS</span>
              <span className="text-[#FF9F1C]">v1.1.5 Stable</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
