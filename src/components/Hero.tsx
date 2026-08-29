import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Play,
  ShieldCheck,
  Zap,
  Smartphone,
  Trophy,
  Crosshair,
  MapPin,
  Flame,
  Radio,
  Users,
  Activity,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { ApkConfig, MediaConfig } from '../types';

interface HeroProps {
  apkConfig: ApkConfig;
  mediaConfig: MediaConfig;
  onDownloadClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  apkConfig,
  mediaConfig,
  onDownloadClick,
  onExploreClick,
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'analytics' | 'radar' | 'squad'>('analytics');

  return (
    <section
      id="product"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-tactical-grid"
    >
      {/* Background Amber Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9F1C]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-[#E58A00]/08 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill Tag: Amber Outline Style */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block border border-[#FF9F1C]/30 px-3 py-1 rounded-full w-max bg-[#FF9F1C]/05"
            >
              <span className="text-[#FF9F1C] text-[10px] font-bold tracking-[0.2em] uppercase">
                BUILT FOR THE COMPETITIVE EDGE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight uppercase text-white font-heading">
                Every match is <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F1C] to-[#E58A00]">
                  a lesson.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed font-normal"
            >
              The operating system for Free Fire MAX esports. Plan rotations, align your squad, capture match intelligence, and preserve every competitive advantage.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Main CTA */}
              <button
                id="hero-main-cta-download"
                onClick={onDownloadClick}
                className="bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-black text-xs sm:text-sm px-6 py-4 rounded uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(255,159,28,0.3)] hover:shadow-[0_0_30px_rgba(255,159,28,0.5)] transition-all cursor-pointer active:scale-95"
              >
                <span>Download for Android</span>
                <Download className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-secondary-cta-explore"
                onClick={onExploreClick}
                className="bg-[#1F1F1F] border border-[#333] text-white font-black text-xs sm:text-sm px-6 py-4 rounded hover:bg-[#2A2A2A] uppercase flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Explore the App ▶</span>
              </button>
            </motion.div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest pt-2"
            >
              <span>• Android 8.0+</span>
              <span>• Free to use</span>
              <span>• No Root Required</span>
            </motion.div>

            {/* Scrim Performance Snapshot Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg border-t border-[#1F1F1F]">
              <div className="bg-[#141414]/90 p-3 rounded-lg border border-[#1F1F1F]">
                <div className="text-xl font-heading font-black text-[#FF9F1C]">10,000+</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Matches Logged</div>
              </div>
              <div className="bg-[#141414]/90 p-3 rounded-lg border border-[#1F1F1F]">
                <div className="text-xl font-heading font-black text-white">450+</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Esports Squads</div>
              </div>
              <div className="bg-[#141414]/90 p-3 rounded-lg border border-[#1F1F1F]">
                <div className="text-xl font-heading font-black text-[#FF9F1C]">0.02s</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Sync Latency</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Asset - Floating Mobile UI Frame */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute w-[320px] h-[320px] bg-[#FF9F1C]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Floating Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[300px] sm:max-w-[340px]"
            >
              {/* Mobile Phone Mockup Chassis */}
              <div className="relative w-full bg-[#1F1F1F] rounded-[40px] border-[6px] border-[#333] overflow-hidden shadow-2xl min-h-[580px] flex flex-col">
                
                {/* Notch */}
                <div className="h-6 w-1/2 bg-black absolute top-0 left-1/4 rounded-b-xl z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-[#222] rounded-full" />
                </div>

                {/* Inner Screen */}
                <div className="p-5 pt-9 flex-1 flex flex-col justify-between space-y-3 bg-[#111111]">
                  
                  {/* Header inside Phone */}
                  <div>
                    <div className="text-[10px] text-[#FF9F1C] font-bold uppercase mb-0.5 tracking-wider">
                      Live Command
                    </div>
                    <div className="text-base sm:text-lg font-black leading-tight text-white uppercase font-heading">
                      Match Analytics &<br />Score Command
                    </div>
                  </div>

                  {/* Interactive Screen Tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-[#1A1A1A] p-1 rounded-lg border border-[#2B2B2B]">
                    <button
                      onClick={() => setActiveMobileTab('analytics')}
                      className={`py-1 rounded text-[9px] font-heading font-bold uppercase tracking-wider transition-colors ${
                        activeMobileTab === 'analytics'
                          ? 'bg-[#FF9F1C] text-black font-black'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Analytics
                    </button>
                    <button
                      onClick={() => setActiveMobileTab('radar')}
                      className={`py-1 rounded text-[9px] font-heading font-bold uppercase tracking-wider transition-colors ${
                        activeMobileTab === 'radar'
                          ? 'bg-[#FF9F1C] text-black font-black'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Bermuda
                    </button>
                    <button
                      onClick={() => setActiveMobileTab('squad')}
                      className={`py-1 rounded text-[9px] font-heading font-bold uppercase tracking-wider transition-colors ${
                        activeMobileTab === 'squad'
                          ? 'bg-[#FF9F1C] text-black font-black'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Squad
                    </button>
                  </div>

                  {/* Tab 1: Analytics */}
                  {activeMobileTab === 'analytics' && (
                    <div className="space-y-2.5 flex-1">
                      {/* Rotation Progress card */}
                      <div className="bg-[#0D0D0D] rounded-xl border border-[#333] p-3 flex flex-col justify-end">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-1.5">
                          <span>ROUND 04 // BERMUDA</span>
                          <span className="text-[#FF9F1C] font-bold font-heading">18 ELIMS</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1F1F1F] rounded overflow-hidden mb-2">
                          <div className="w-3/4 h-full bg-gradient-to-r from-[#FF9F1C] to-[#E58A00]" />
                        </div>
                        <div className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                          Squad Rotation Precision: 88%
                        </div>
                      </div>

                      {/* 2 Metric Boxes */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#0D0D0D] rounded-xl border border-[#333] p-2.5">
                          <div className="text-base font-heading font-black text-white">+12.4%</div>
                          <div className="text-[8px] text-neutral-500 uppercase tracking-wider font-bold">Win Probability</div>
                        </div>
                        <div className="bg-[#0D0D0D] rounded-xl border border-[#333] p-2.5">
                          <div className="text-base font-heading font-black text-[#FF9F1C]">8.2s</div>
                          <div className="text-[8px] text-neutral-500 uppercase tracking-wider font-bold">Reaction Time</div>
                        </div>
                      </div>

                      {/* Leaderboard Snippet */}
                      <div className="bg-[#0D0D0D] p-2.5 rounded-xl border border-[#333] space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-heading font-bold text-white border-l-2 border-[#FF9F1C] pl-1.5">
                          <span>#1 TACTIX PRIME</span>
                          <span className="text-[#FF9F1C] font-mono">30 PTS</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-neutral-400 pl-2">
                          <span>#2 VORTEX ESPORTS</span>
                          <span className="font-mono">17 PTS</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Bermuda Map View */}
                  {activeMobileTab === 'radar' && (
                    <div className="relative flex-1 bg-[#0A0E14] rounded-xl border border-[#333] overflow-hidden p-2 flex flex-col justify-between">
                      {/* Background Map Pic if specified */}
                      {(mediaConfig?.bermudaMapImage || mediaConfig?.tacticalMaps?.[0]?.imageUrl) && (
                        <img
                          src={mediaConfig?.bermudaMapImage || mediaConfig?.tacticalMaps?.[0]?.imageUrl}
                          alt="Bermuda Map"
                          className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-tactical-grid opacity-25 pointer-events-none" />
                      
                      <div className="relative z-10 flex justify-between text-[9px] font-heading font-bold text-neutral-400">
                        <span className="text-white bg-black/75 px-1.5 py-0.5 rounded border border-[#333]">CLOCK TOWER</span>
                        <span className="text-[#FF9F1C] bg-black/75 px-1.5 py-0.5 rounded border border-[#FF9F1C]/40">PEAK [Z4]</span>
                      </div>
                      <div className="relative my-auto flex items-center justify-center z-10">
                        <svg viewBox="0 0 200 130" className="w-full h-24">
                          <circle cx="110" cy="65" r="38" fill="rgba(255, 159, 28, 0.18)" stroke="#FF9F1C" strokeWidth="1.5" strokeDasharray="3 2" />
                          <path d="M 45 75 Q 75 80 105 65" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 2" />
                          <circle cx="45" cy="75" r="4" fill="#38bdf8" stroke="#fff" strokeWidth="1" />
                          <circle cx="105" cy="65" r="5" fill="#FF9F1C" stroke="#fff" strokeWidth="1" />
                        </svg>
                      </div>
                      <div className="relative z-10 bg-black/85 p-1.5 rounded text-[8px] flex justify-between text-neutral-300 font-mono border border-[#333]">
                        <span>Shrink: <strong className="text-[#FF9F1C]">0:45</strong></span>
                        <span className="text-emerald-400 font-bold">Zone 4 Secure</span>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Squad Details */}
                  {activeMobileTab === 'squad' && (
                    <div className="space-y-1.5 flex-1 text-xs">
                      {[
                        { role: 'IGL', name: 'TACTIX_Cipher', hp: '100%' },
                        { role: 'Rusher', name: 'TACTIX_Apex', hp: '85%' },
                        { role: 'Sniper', name: 'TACTIX_Aero', hp: '100%' },
                        { role: 'Support', name: 'TACTIX_Ghost', hp: '92%' },
                      ].map((member, i) => (
                        <div key={i} className="bg-[#0D0D0D] p-2 rounded-lg border border-[#333] flex items-center justify-between">
                          <div>
                            <div className="font-heading font-bold text-white text-[11px] flex items-center gap-1">
                              <span>{member.name}</span>
                              <span className="text-[8px] px-1 py-0.2 bg-[#FF9F1C]/20 text-[#FF9F1C] rounded">
                                {member.role}
                              </span>
                            </div>
                          </div>
                          <div className="text-[9px] font-mono text-emerald-400 font-bold">{member.hp} HP</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Button inside phone */}
                  <button
                    onClick={onDownloadClick}
                    className="w-full py-2.5 rounded bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-md cursor-pointer transition-colors"
                  >
                    <Zap className="w-3 h-3 fill-black" />
                    <span>INSTALL APK {apkConfig.version}</span>
                  </button>

                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
