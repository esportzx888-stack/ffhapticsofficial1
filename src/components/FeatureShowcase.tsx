import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Users2,
  BarChart3,
  MessageSquareCode,
  Shield,
  Layers,
  Crosshair,
  MapPin,
  TrendingUp,
  Radio,
  Sparkles,
  Send,
  Check,
  ChevronRight,
  Flame,
  Globe2,
  Swords,
  Image as ImageIcon,
  ZoomIn
} from 'lucide-react';
import { MediaConfig, TacticalMapItem } from '../types';
import { DEFAULT_TACTICAL_MAPS } from '../utils/storage';

interface FeatureShowcaseProps {
  mediaConfig?: MediaConfig;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ mediaConfig }) => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  
  const allMaps: TacticalMapItem[] = mediaConfig?.tacticalMaps || DEFAULT_TACTICAL_MAPS;
  const [selectedMapKey, setSelectedMapKey] = useState<string>('bermuda');
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');

  const activeMapData = allMaps.find((m) => m.key === selectedMapKey) || allMaps[0];

  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; role: string; text: string; time: string; verified?: boolean }[]>([
    { id: '1', user: 'Viper_FFWS', role: 'IGL', text: 'Looking for Tier-1 Scrims at 20:00 UTC. Bermuda + Purgatory 6 matches.', time: '18:40', verified: true },
    { id: '2', user: 'GhostRider', role: 'Sniper', text: 'Tactix circle predictor for Alpine round 3 was spot on yesterday!', time: '18:42' },
    { id: '3', user: 'Echo_Cap', role: 'Manager', text: 'Need a substitute Rusher for next week FF Pro League qualifier lobby.', time: '18:45', verified: true },
  ]);
  const [inputChat, setInputChat] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'You (Squad Captain)',
        role: 'IGL',
        text: inputChat.trim(),
        time: 'Just now',
        verified: true,
      },
    ]);
    setInputChat('');
  };

  const features = [
    {
      num: '01',
      id: 'playbooks',
      title: 'Visual Playbooks',
      headline: 'Tactical Maps & Rotation Strategy',
      description: 'Draw drops, rotations, fights, and contingencies on real Free Fire MAX maps, then keep every version ready for the squad.',
      icon: Compass,
      accent: '#FF9F1C',
      tags: ['Bermuda', 'Purgatory', 'Alpine', 'Kalahari', 'Safe-Zone Prediction'],
    },
    {
      num: '02',
      id: 'team-ops',
      title: 'Team Operations',
      headline: 'Rosters & Competitive Identity',
      description: 'Align rosters, role-based assignments, practice sessions, opponents, and competitive identity.',
      icon: Users2,
      accent: '#38BDF8',
      tags: ['IGL / Rusher / Sniper Roles', 'Scrim Schedule', 'Opponent Scouting', 'Loadout Sync'],
    },
    {
      num: '03',
      id: 'match-intelligence',
      title: 'Match Intelligence',
      headline: 'Lobby Breakdown & Score Command',
      description: 'Review lobby sessions, placements, eliminations, execution, and overall player contributions.',
      icon: BarChart3,
      accent: '#34D399',
      tags: ['12-Point Booyah Matrix', 'Damage Heatmaps', 'Kill Conversion', 'Lobby Leaderboard'],
    },
    {
      num: '04',
      id: 'community-chat',
      title: 'Global Community Chat & Squad Messaging',
      headline: 'Live Scrim Finder & Squad Channels',
      description: 'Connect globally with competitive players, host live tactical discussions, find scrimmage opponents, and coordinate with your squad in real-time.',
      icon: MessageSquareCode,
      accent: '#F472B6',
      tags: ['Global Scrim Matchmaking', 'Tactical Voice/Chat', 'Verified Tournaments', 'Anti-Troll'],
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#0D0D0D] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FF9F1C]/05 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#38BDF8]/05 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F1F1F] border border-[#2A2A2A] text-xs font-heading font-bold uppercase tracking-widest text-[#FF9F1C]">
            <Layers className="w-3.5 h-3.5" />
            <span>TACTICAL OS ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-tight leading-tight">
            INSIDE FF TACTIX — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              Your game. Made visible.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Replace scattered screenshots, chat messages, and spreadsheets with one durable source of truth for tactics, rosters, practice, opponents, and performance.
          </p>
        </div>

        {/* Feature Cards Grid (4 Core Columns/Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {features.map((feat, index) => {
            const isSelected = activeFeature === index;
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1F1F1F] border border-[#FF9F1C] shadow-[0_0_25px_rgba(255,159,28,0.2)]'
                    : 'bg-[#1F1F1F]/40 hover:bg-[#1F1F1F]/80 border border-[#1F1F1F] hover:border-[#333]'
                }`}
              >
                {/* Number Badge & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#FF9F1C]">
                      {feat.num}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isSelected ? '#FF9F1C' : '#141414',
                        color: isSelected ? '#000000' : '#FF9F1C',
                        border: '1px solid #2B2B2B',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-heading font-black uppercase text-white tracking-wide">
                      {feat.title}
                    </h3>
                    <p className="text-[10px] font-bold text-[#FF9F1C] uppercase tracking-wider mt-0.5">
                      {feat.headline}
                    </p>
                  </div>

                  <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Active Indicator / Tags */}
                <div className="pt-4 mt-3 border-t border-[#262626] flex items-center justify-between text-[10px]">
                  <span className={`font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isSelected ? 'text-[#FF9F1C]' : 'text-neutral-500'
                  }`}>
                    {isSelected ? 'ACTIVE PREVIEW' : 'CLICK TO PREVIEW'}
                    <ChevronRight className="w-3 h-3" />
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F1C] animate-ping" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Feature Sandbox / Deep Dive Panel */}
        <div className="rounded-3xl bg-[#141414] border border-[#242424] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Tabs inside the sandbox */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#242424]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 text-[#FF9F1C] font-heading font-bold text-xs uppercase tracking-wider">
                FEATURE SANDBOX // {features[activeFeature].num}
              </span>
              <h4 className="text-xl font-heading font-bold text-white uppercase">
                {features[activeFeature].title}
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {features[activeFeature].tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#1F1F1F] text-neutral-300 text-xs font-mono border border-[#2B2B2B]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Feature View Body */}
          <div className="pt-8">
            <AnimatePresence mode="wait">
              
              {/* VIEW 01: VISUAL PLAYBOOKS MAP ENGINE */}
              {activeFeature === 0 && (
                <motion.div
                  key="feature-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Left: Map Controls & Strategic Plan */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono text-[#FF9F1C] font-semibold uppercase">
                          Tactical Map Library ({allMaps.length})
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          Category: {activeMapData?.category.toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Dynamic Tactical Map Selector Pill Grid */}
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {allMaps.map((m) => (
                          <button
                            key={m.id || m.key}
                            onClick={() => setSelectedMapKey(m.key)}
                            className={`px-3 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                              selectedMapKey === m.key
                                ? 'bg-[#FF9F1C] text-black shadow-[0_0_15px_rgba(255,159,28,0.3)]'
                                : 'bg-[#1E1E1E] text-neutral-300 hover:text-white border border-[#2A2A2A]'
                            }`}
                          >
                            <span>{m.name.split(' ')[0]}</span>
                            {m.isCustom && (
                              <span className="px-1 py-0.2 bg-black/40 text-[9px] rounded text-white font-mono">
                                CUSTOM
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* View Switcher: Photo / Satellite vs Vector Topo */}
                    <div className="bg-[#141414] p-1.5 rounded-xl border border-[#222] flex items-center justify-between text-xs">
                      <span className="text-neutral-400 font-heading font-bold uppercase text-[11px] px-2">
                        Display Mode:
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setViewMode('photo')}
                          className={`px-3 py-1 rounded-lg font-heading font-bold text-[11px] uppercase flex items-center gap-1 transition-colors cursor-pointer ${
                            viewMode === 'photo'
                              ? 'bg-[#FF9F1C] text-black font-black'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Tactical Photo / Satellite</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('vector')}
                          className={`px-3 py-1 rounded-lg font-heading font-bold text-[11px] uppercase flex items-center gap-1 transition-colors cursor-pointer ${
                            viewMode === 'vector'
                              ? 'bg-[#FF9F1C] text-black font-black'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Vector Grid</span>
                        </button>
                      </div>
                    </div>

                    {/* Tactics Step-by-Step Callouts */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono text-neutral-400 font-semibold uppercase">
                        Strategic Intel & Drop Callouts
                      </div>
                      
                      <div className="bg-[#0D0D0D] p-3.5 rounded-xl border border-[#1F1F1F] space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-heading font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Phase 1: High-Loot Drop
                          </span>
                          <span className="text-[#38BDF8] font-mono">
                            {activeMapData?.dropZones?.[0] || 'Primary Compound'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">
                          Secure Lv3 Armor, Gloo Wall generators, and high-velocity snipers before enemy squads contest.
                        </p>
                      </div>

                      <div className="bg-[#0D0D0D] p-3.5 rounded-xl border border-[#1F1F1F] space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-heading font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF9F1C]" /> Phase 2: Rotation Intercept
                          </span>
                          <span className="text-[#FF9F1C] font-mono">
                            {activeMapData?.chokePoints?.[0] || 'Ridge Choke Point'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">
                          {activeMapData?.description || 'Rotate via low-ground trenches and gatekeep rotating enemies into Zone 3.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Tactical Map Canvas Representation */}
                  <div className="lg:col-span-7 bg-[#0A0D12] rounded-2xl border border-[#223042] p-5 relative overflow-hidden shadow-inner min-h-[400px] flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex justify-between items-center z-10">
                      <div className="flex items-center gap-2 text-xs font-heading font-bold text-white bg-black/80 px-3 py-1.5 rounded-lg border border-[#223042]">
                        <Compass className="w-4 h-4 text-[#FF9F1C]" />
                        <span>MAP: {activeMapData?.name.toUpperCase()}</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono bg-emerald-500/15 px-2.5 py-1 rounded border border-emerald-500/30">
                        ● 4 ROTATION ARROWS ACTIVE
                      </span>
                    </div>

                    {/* Canvas Area: PHOTO VIEW OR VECTOR BLUEPRINT */}
                    <div className="relative my-3 rounded-xl overflow-hidden min-h-[260px] flex items-center justify-center bg-[#07090D] border border-[#1D2838]">
                      {viewMode === 'photo' && activeMapData?.imageUrl ? (
                        <div className="relative w-full h-64 sm:h-72">
                          {/* Real uploaded / designated tactical map image */}
                          <img
                            src={activeMapData.imageUrl}
                            alt={activeMapData.name}
                            className="w-full h-full object-cover opacity-85"
                          />
                          
                          {/* Tactical HUD Overlay with Grid */}
                          <div className="absolute inset-0 bg-tactical-grid opacity-30 pointer-events-none" />

                          {/* Safe Zone Rings Overlay */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed border-[#FF9F1C] bg-[#FF9F1C]/10 flex items-center justify-center pointer-events-none shadow-[0_0_20px_rgba(255,159,28,0.2)]">
                            <div className="w-24 h-24 rounded-full border border-emerald-400 bg-emerald-400/15 flex items-center justify-center">
                              <span className="text-[9px] font-heading font-black text-emerald-300 bg-black/80 px-1.5 py-0.5 rounded">
                                ZONE 4
                              </span>
                            </div>
                          </div>

                          {/* Tactical Pins */}
                          {activeMapData.dropZones?.slice(0, 2).map((dz, idx) => (
                            <div
                              key={idx}
                              style={{
                                top: idx === 0 ? '30%' : '65%',
                                left: idx === 0 ? '25%' : '70%',
                              }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 pointer-events-none"
                            >
                              <div className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] border-2 border-white shadow-lg animate-pulse" />
                              <span className="text-[9px] font-heading font-black text-[#38BDF8] bg-black/90 px-1.5 py-0.5 rounded border border-[#38BDF8]/40 whitespace-nowrap">
                                📍 {dz}
                              </span>
                            </div>
                          ))}

                          {/* Dynamic Choke Point Flag */}
                          {activeMapData.chokePoints?.[0] && (
                            <div
                              style={{ top: '48%', left: '52%' }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 pointer-events-none"
                            >
                              <div className="w-3.5 h-3.5 rounded-full bg-[#FF9F1C] border-2 border-white shadow-lg" />
                              <span className="text-[9px] font-heading font-black text-[#FF9F1C] bg-black/90 px-1.5 py-0.5 rounded border border-[#FF9F1C]/40 whitespace-nowrap">
                                ⚠️ {activeMapData.chokePoints[0]}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Vector Map Fallback View */
                        <svg viewBox="0 0 500 280" className="w-full h-64">
                          {/* Landmass Outlines */}
                          <path
                            d="M 40 100 Q 120 20 250 40 T 450 90 T 420 240 T 200 260 T 50 180 Z"
                            fill="#131C28"
                            stroke="#27394E"
                            strokeWidth="2.5"
                          />
                          {/* River / Water Channel */}
                          <path
                            d="M 120 20 Q 220 120 380 260"
                            fill="none"
                            stroke="#1A2838"
                            strokeWidth="14"
                          />
                          {/* Contour elevation lines */}
                          <path
                            d="M 160 80 Q 240 70 320 120 T 280 200 T 160 160 Z"
                            fill="#192535"
                            stroke="#2A3D55"
                            strokeWidth="1.5"
                          />

                          {/* Safe Zone Circles */}
                          <circle cx="280" cy="140" r="95" fill="none" stroke="#FF9F1C" strokeWidth="2.5" strokeDasharray="6 4" />
                          <circle cx="295" cy="135" r="55" fill="rgba(255, 159, 28, 0.1)" stroke="#FF9F1C" strokeWidth="2" />
                          <circle cx="305" cy="130" r="25" fill="rgba(52, 211, 153, 0.2)" stroke="#34D399" strokeWidth="1.5" />

                          {/* Drop Locations */}
                          <circle cx="100" cy="130" r="6" fill="#38BDF8" />
                          <text x="70" y="152" fill="#38BDF8" fontSize="11" fontWeight="bold">PRIMARY DROP</text>

                          <circle cx="150" cy="220" r="5" fill="#EF4444" />
                          <text x="140" y="238" fill="#EF4444" fontSize="10" fontWeight="bold">ENEMY CONTEST</text>

                          <circle cx="295" cy="135" r="7" fill="#FF9F1C" />
                          <text x="310" y="140" fill="#FFFFFF" fontSize="12" fontWeight="bold">★ FINAL CIRCLE HOLD</text>

                          {/* Rotation Tactical Arrows */}
                          <path
                            d="M 105 130 Q 160 110 220 135 T 290 135"
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="3.5"
                            strokeDasharray="5 5"
                          />
                          <path
                            d="M 220 135 Q 260 190 295 145"
                            fill="none"
                            stroke="#FF9F1C"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Bottom HUD Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-black/80 p-3 rounded-xl border border-[#223042] z-10">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Drop Ingest
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Circle Prediction
                        </span>
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Squad Live Sync
                        </span>
                      </div>
                      <span className="text-neutral-400 font-mono">
                        Author: {activeMapData?.author || 'Esports Ops'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 02: TEAM OPERATIONS */}
              {activeFeature === 1 && (
                <motion.div
                  key="feature-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { role: 'IGL / Shot Caller', ign: 'TACTIX_Cipher', real: 'Aiden Vance', kd: '4.82', hs: '68%', guns: 'Woodpecker / M1887', color: 'border-[#FF9F1C]' },
                      { role: 'Primary Rusher', ign: 'TACTIX_Apex', real: 'Marco Silva', kd: '5.14', hs: '74%', guns: 'MP40 / Charge Buster', color: 'border-red-500' },
                      { role: 'Sniper / Marksman', ign: 'TACTIX_Aero', real: 'Liam Sato', kd: '6.20', hs: '89%', guns: 'AWM / Desert Eagle', color: 'border-sky-400' },
                      { role: 'Flanker / Support', ign: 'TACTIX_Ghost', real: 'Devin Cole', kd: '3.95', hs: '61%', guns: 'Groza / Gloo Master', color: 'border-emerald-400' },
                    ].map((player, idx) => (
                      <div
                        key={idx}
                        className={`bg-[#0D0D0D] p-5 rounded-2xl border-2 ${player.color} space-y-4 shadow-lg`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-heading font-extrabold px-2 py-0.5 rounded bg-white/10 text-white uppercase tracking-wider">
                            {player.role}
                          </span>
                          <span className="text-xs font-mono text-emerald-400">ACTIVE ROSTER</span>
                        </div>

                        <div>
                          <div className="text-lg font-heading font-bold text-white">{player.ign}</div>
                          <div className="text-xs text-neutral-400">{player.real}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#1F1F1F]">
                          <div>
                            <span className="text-neutral-500 block text-[10px] uppercase">K/D Ratio</span>
                            <span className="font-heading font-bold text-white text-base">{player.kd}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px] uppercase">Headshot %</span>
                            <span className="font-heading font-bold text-[#FF9F1C] text-base">{player.hs}</span>
                          </div>
                        </div>

                        <div className="text-[11px] bg-[#141414] p-2 rounded-lg text-neutral-300 font-mono border border-[#1F1F1F]">
                          Build: {player.guns}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[#1F1F1F] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <Swords className="w-5 h-5 text-[#FF9F1C]" />
                      <span className="text-neutral-300">
                        Next Scrim Session: <strong>Grand Masters Scrim Series 09</strong> (Today @ 20:00 UTC)
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded bg-[#FF9F1C]/20 text-[#FF9F1C] font-heading font-bold uppercase">
                      4/4 Roster Confirmed
                    </span>
                  </div>
                </motion.div>
              )}

              {/* VIEW 03: MATCH INTELLIGENCE & SCORE COMMAND */}
              {activeFeature === 2 && (
                <motion.div
                  key="feature-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  <div className="lg:col-span-8 bg-[#0D0D0D] p-6 rounded-2xl border border-[#1F1F1F] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-heading font-bold text-base uppercase text-white">
                          TOURNAMENT LOBBY STANDINGS (6 ROUNDS)
                        </h5>
                        <p className="text-xs text-neutral-400">Official Free Fire World Series (FFWS) Scoring System</p>
                      </div>
                      <span className="text-xs font-mono text-[#FF9F1C] bg-[#FF9F1C]/10 px-2.5 py-1 rounded border border-[#FF9F1C]/30">
                        12-PT BOOYAH MATRIX
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#1F1F1F] text-neutral-500 font-heading uppercase text-[11px]">
                            <th className="py-2.5">Rank</th>
                            <th className="py-2.5">Team Name</th>
                            <th className="py-2.5">Booyah #</th>
                            <th className="py-2.5">Placement Pts</th>
                            <th className="py-2.5">Kill Pts</th>
                            <th className="py-2.5 font-bold text-white">Total Pts</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1F1F1F]">
                          <tr className="bg-[#FF9F1C]/10 text-white font-semibold">
                            <td className="py-3 text-[#FF9F1C] font-bold">#1</td>
                            <td className="py-3 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#FF9F1C]" />
                              <span>TACTIX PRIME</span>
                            </td>
                            <td className="py-3 text-[#FF9F1C]">3 🏆</td>
                            <td className="py-3">36 pts</td>
                            <td className="py-3">48 pts</td>
                            <td className="py-3 text-lg font-heading font-extrabold text-[#FF9F1C]">84</td>
                          </tr>
                          <tr className="text-neutral-300">
                            <td className="py-3 text-neutral-400 font-bold">#2</td>
                            <td className="py-3">VORTEX ESPORTS</td>
                            <td className="py-3">2 🏆</td>
                            <td className="py-3">28 pts</td>
                            <td className="py-3">34 pts</td>
                            <td className="py-3 text-lg font-heading font-bold text-white">62</td>
                          </tr>
                          <tr className="text-neutral-300">
                            <td className="py-3 text-neutral-400 font-bold">#3</td>
                            <td className="py-3">NINJA ALLIANCE</td>
                            <td className="py-3">1 🏆</td>
                            <td className="py-3">21 pts</td>
                            <td className="py-3">29 pts</td>
                            <td className="py-3 text-lg font-heading font-bold text-white">50</td>
                          </tr>
                          <tr className="text-neutral-400">
                            <td className="py-3 font-bold">#4</td>
                            <td className="py-3">VALOR SQUAD</td>
                            <td className="py-3">0</td>
                            <td className="py-3">16 pts</td>
                            <td className="py-3">22 pts</td>
                            <td className="py-3 text-lg font-heading font-bold text-white">38</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <div className="bg-[#0D0D0D] p-5 rounded-2xl border border-[#1F1F1F] space-y-3">
                      <div className="text-xs font-heading font-bold text-white uppercase flex items-center justify-between">
                        <span>Squad Combat Heat</span>
                        <span className="text-[#FF9F1C]">88% Winrate</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                            <span>Drop Survivability</span>
                            <span className="text-white font-bold">96%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 w-[96%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                            <span>First Blood Conversion</span>
                            <span className="text-white font-bold">82%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                            <div className="h-full bg-[#FF9F1C] w-[82%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                            <span>Circle 5 Edge Control</span>
                            <span className="text-white font-bold">90%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                            <div className="h-full bg-sky-400 w-[90%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#FF9F1C]/15 to-transparent p-4 rounded-2xl border border-[#FF9F1C]/30 text-xs space-y-1">
                      <div className="font-heading font-bold text-white flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#FF9F1C]" />
                        <span>AI TACTICAL RECOMMENDATION</span>
                      </div>
                      <p className="text-neutral-300">
                        Bermuda North rotation via Pochinok increased placement points by +34% compared to south river crossing.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 04: GLOBAL COMMUNITY CHAT */}
              {activeFeature === 3 && (
                <motion.div
                  key="feature-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  <div className="lg:col-span-8 bg-[#0D0D0D] rounded-2xl border border-[#1F1F1F] flex flex-col h-[340px]">
                    <div className="p-3.5 border-b border-[#1F1F1F] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-[#FF9F1C]" />
                        <span className="font-heading font-bold text-white uppercase">
                          GLOBAL SCRIM LOBBY & RECRUITMENT (#FFWS-TIER-1)
                        </span>
                      </div>
                      <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 1,420 ONLINE
                      </span>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="bg-[#141414] p-3 rounded-xl border border-[#1F1F1F] text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-bold text-white">{msg.user}</span>
                              <span className="text-[10px] px-1.5 py-0.2 bg-[#FF9F1C]/20 text-[#FF9F1C] rounded font-semibold">
                                {msg.role}
                              </span>
                              {msg.verified && (
                                <span className="text-[10px] text-sky-400 font-bold">✓ VERIFIED</span>
                              )}
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono">{msg.time}</span>
                          </div>
                          <p className="text-neutral-300">{msg.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input Bar */}
                    <form onSubmit={handleSendChat} className="p-3 border-t border-[#1F1F1F] flex gap-2">
                      <input
                        type="text"
                        value={inputChat}
                        onChange={(e) => setInputChat(e.target.value)}
                        placeholder="Message competitive players or find a scrim..."
                        className="flex-1 bg-[#141414] border border-[#2A2A2A] focus:border-[#FF9F1C] rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>SEND</span>
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-4 space-y-3 text-xs">
                    <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[#1F1F1F] space-y-2">
                      <div className="font-heading font-bold text-white uppercase text-sm">
                        Upcoming Scrim Rooms
                      </div>
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg bg-[#141414] border border-[#1F1F1F] flex justify-between items-center">
                          <div>
                            <div className="font-bold text-white">Room #8849 - Bermuda</div>
                            <div className="text-[10px] text-neutral-400">Host: FF Pro League | 10/12 Slots</div>
                          </div>
                          <span className="px-2 py-1 rounded bg-[#FF9F1C] text-black font-heading font-bold text-[10px]">JOIN</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#141414] border border-[#1F1F1F] flex justify-between items-center">
                          <div>
                            <div className="font-bold text-white">Room #9021 - Purgatory</div>
                            <div className="text-[10px] text-neutral-400">Host: Vortex Org | 8/12 Slots</div>
                          </div>
                          <span className="px-2 py-1 rounded bg-[#FF9F1C] text-black font-heading font-bold text-[10px]">JOIN</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0D0D0D] p-3.5 rounded-xl border border-[#1F1F1F] text-neutral-400 space-y-1">
                      <div className="text-white font-bold font-heading uppercase text-xs">Squad Encrypted Channels</div>
                      <p className="text-[11px]">Private tactical channels with zero packet delay for in-match coordination.</p>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
