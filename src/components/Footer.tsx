import React from 'react';
import { Logo } from './Logo';
import { Shield, Sparkles, ExternalLink, Heart, MessageSquare, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onAdminTrigger: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onAdminTrigger }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] border-t border-[#1F1F1F] text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#1F1F1F] items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo onAdminTrigger={onAdminTrigger} size="sm" />
            <p className="text-neutral-400 max-w-sm leading-relaxed text-xs">
              The operating system for Free Fire MAX esports. Plan rotations, align your squad, capture match intelligence, and preserve every competitive advantage.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>All Systems Operational • Cloud Sync Active</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-black uppercase text-white tracking-widest text-xs">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Product', id: 'product' },
                { name: 'Features', id: 'features' },
                { name: 'Chat', id: 'chat' },
                { name: 'Download for Android', id: 'download' },
                { name: 'Community Feedback', id: 'feedback' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-[#FF9F1C] transition-colors cursor-pointer text-left text-xs text-neutral-400"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-black uppercase text-white tracking-widest text-xs">
              Support & Inquiries
            </h4>
            <p className="text-neutral-400 text-xs">
              Support / Esports Sponsorships / Custom Maps:
            </p>
            <div className="p-3 rounded-lg bg-[#141414] border border-[#1F1F1F]">
              <a
                href="mailto:tacticsff62@gmail.com"
                className="text-[#FF9F1C] hover:underline font-mono text-xs font-bold"
              >
                tacticsff62@gmail.com
              </a>
            </div>
            <p className="text-[11px] text-neutral-500">
              Direct Support: <a href="mailto:tacticsff62@gmail.com" className="text-neutral-400 hover:text-white">tacticsff62@gmail.com</a>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {currentYear} FF TACTIX. All rights reserved. Built for the competitive Free Fire MAX esports community.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('product')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('product')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('feedback')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Feedback Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
