import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Compass,
  Users2,
  Calculator,
  Download,
  Crosshair,
  MapPin,
  Trophy,
  Check,
  Plus,
  RefreshCw,
  Sparkles,
  Zap,
  Flame,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { MediaConfig, TacticalMapItem } from '../types';
import { DEFAULT_TACTICAL_MAPS } from '../utils/storage';

interface InteractiveAppExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadClick: () => void;
  mediaConfig?: MediaConfig;
}

export const InteractiveAppExplorer: React.FC<InteractiveAppExplorerProps> = ({
  isOpen,
  onClose,
  onDownloadClick,
  mediaConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'roster' | 'calculator'>('map');

  const allMaps: TacticalMapItem[] =
    mediaConfig?.tacticalMaps && mediaConfig.tacticalMaps.length > 0
      ? mediaConfig.tacticalMaps
      : DEFAULT_TACTICAL_MAPS;
  const [selectedMapKey, setSelectedMapKey] = useState<string>('bermuda');
  const activeMapData =
    allMaps.find((m) => m.key === selectedMapKey) || allMaps[0] || DEFAULT_TACTICAL_MAPS[0];

  // Interactive Map State
  const [selectedDrop, setSelectedDrop] = useState<string>('Clock Tower');
  const [rotationPoints, setRotationPoints] = useState<string[]>(['Clock Tower', 'Bimasakti Strip', 'Peak']);
  const [circlePhase, setCirclePhase] = useState<number>(3);
  const [showPhotoBg, setShowPhotoBg] = useState<boolean>(true);

  // Scrim Calculator State
  const [teamName, setTeamName] = useState('TACTIX PRIME');
  const [placement, setPlacement] = useState<number>(1);
  const [kills, setKills] = useState<number>(12);

  if (!isOpen) return null;

  // FFWS Placement Points Table
  const placementPointsMap: Record<number, number> = {
    1: 12, // Booyah
    2: 9,
    3: 8,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 3,
    9: 2,
    10: 1,
    11: 0,
    12: 0,
  };

  const calculatedPlacementPts = placementPointsMap[placement] || 0;
  const totalScore = calculatedPlacementPts + kills;

  const landmarks = [
    { name: 'Clock Tower', x: 80, y: 120, loot: 'High Tier (Level 3 Armor)' },
    { name: 'Peak', x: 260, y: 130, loot: 'Zone King (High Ground)' },
    { name: 'Factory', x: 130, y: 220, loot: 'Combat Hotspot' },
    { name: 'Pochinok', x: 170, y: 150, loot: 'Compound Heavy' },
    { name: 'Bimasakti Strip', x: 200, y: 120, loot: 'Rotation Choke' },
    { name: 'Mill', x: 380, y: 60, loot: 'Sniper Nest' },
    { name: 'Mars Electric', x: 320, y: 240, loot: 'Edge Loot' },
  ];

  const handleLandmarkClick = (landmarkName: string) => {
    if (rotationPoints.includes(landmarkName)) {
      if (rotationPoints.length > 1) {
        setRotationPoints(rotationPoints.filter((p) => p !== landmarkName));
      }
    } else {
      setRotationPoints([...rotationPoints, landmarkName]);
    }
  };

  return (
    <div
      id="app-explorer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-5xl bg-[#111111] border-2 border-[#262626] rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#181818] p-4 sm:px-6 border-b border-[#242424] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF9F1C] text-black font-heading font-black text-sm flex items-center justify-center">
              FF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base uppercase text-white tracking-wider">
                  FF TACTIX LIVE APP SIMULATOR
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-heading font-bold bg-[#FF9F1C]/20 text-[#FF9F1C] border border-[#FF9F1C]/40">
                  INTERACTIVE DEMO
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Experience the rotation engine, roster builder, and FFWS score command in action.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#222] hover:bg-[#333] text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulator Tabs */}
        <div className="flex gap-2 p-4 bg-[#141414] border-b border-[#222] shrink-0">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#FF9F1C] text-black shadow-md'
                : 'bg-[#1C1C1C] text-neutral-300 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Map Rotation Whiteboard</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-[#FF9F1C] text-black shadow-md'
                : 'bg-[#1C1C1C] text-neutral-300 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>FFWS Scrim Score Command</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: INTERACTIVE MAP ROTATION WHITEBOARD */}
          {activeTab === 'map' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-lg uppercase text-white">
                    Interactive Tactical Map Whiteboard
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Plot squad rotation routes and predict zone shrinks on real tactical map pictures.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Photo Bg Toggle */}
                  <button
                    onClick={() => setShowPhotoBg(!showPhotoBg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      showPhotoBg
                        ? 'bg-[#FF9F1C] text-black border-[#FF9F1C]'
                        : 'bg-[#181818] text-neutral-300 border-[#333]'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{showPhotoBg ? 'Photo Map ON' : 'Photo Map OFF'}</span>
                  </button>

                  <div className="flex items-center gap-2 bg-[#181818] p-1.5 rounded-xl border border-[#262626]">
                    <span className="text-xs font-heading font-bold uppercase text-neutral-400 px-2">Zone:</span>
                    {[1, 2, 3, 4, 5].map((ph) => (
                      <button
                        key={ph}
                        onClick={() => setCirclePhase(ph)}
                        className={`w-7 h-7 rounded-lg font-heading font-bold text-xs transition-colors cursor-pointer ${
                          circlePhase === ph ? 'bg-[#FF9F1C] text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        P{ph}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Selection Pills */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs font-heading font-bold text-neutral-400 uppercase mr-1">Choose Map:</span>
                {allMaps.map((m) => (
                  <button
                    key={m.id || m.key}
                    onClick={() => setSelectedMapKey(m.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                      selectedMapKey === m.key
                        ? 'bg-[#FF9F1C] text-black shadow-sm'
                        : 'bg-[#181818] text-neutral-400 hover:text-white border border-[#282828]'
                    }`}
                  >
                    {m.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Map Canvas with Interactive Buttons */}
              <div className="relative bg-[#0A0E14] rounded-2xl border border-[#233346] p-4 min-h-[380px] flex items-center justify-center overflow-hidden shadow-inner">
                {/* Background Tactical Photo if enabled */}
                {showPhotoBg && activeMapData?.imageUrl && (
                  <img
                    src={activeMapData.imageUrl}
                    alt={activeMapData.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                  />
                )}

                <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />

                {/* SVG Tactical Layer */}
                <svg viewBox="0 0 500 300" className="w-full h-72 relative z-10">
                  {/* Island outline if photo is off */}
                  {!showPhotoBg && (
                    <path
                      d="M 30 110 Q 100 20 250 30 T 460 70 T 440 250 T 210 280 T 40 190 Z"
                      fill="#111B27"
                      stroke="#22364D"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Dynamic Zone Circle */}
                  <circle
                    cx="260"
                    cy="130"
                    r={120 - circlePhase * 18}
                    fill="rgba(255, 159, 28, 0.15)"
                    stroke="#FF9F1C"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                  />

                  {/* Draw paths connecting active rotation points */}
                  {rotationPoints.map((ptName, idx) => {
                    if (idx === 0) return null;
                    const prevPt = landmarks.find((l) => l.name === rotationPoints[idx - 1]);
                    const currPt = landmarks.find((l) => l.name === ptName);
                    if (!prevPt || !currPt) return null;
                    return (
                      <line
                        key={idx}
                        x1={prevPt.x}
                        y1={prevPt.y}
                        x2={currPt.x}
                        y2={currPt.y}
                        stroke="#38BDF8"
                        strokeWidth="3.5"
                        strokeDasharray="4 4"
                      />
                    );
                  })}
                </svg>

                {/* Clickable Landmarks on Map (Clean tactical waypoint pins with no text overlay on map) */}
                {landmarks.map((lm) => {
                  const isSelected = rotationPoints.includes(lm.name);
                  const order = rotationPoints.indexOf(lm.name) + 1;
                  return (
                    <button
                      key={lm.name}
                      onClick={() => handleLandmarkClick(lm.name)}
                      title={`Waypoint: ${lm.name}`}
                      style={{
                        position: 'absolute',
                        left: `${(lm.x / 500) * 85 + 5}%`,
                        top: `${(lm.y / 300) * 75 + 10}%`,
                      }}
                      className="group -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-transform hover:scale-125 z-20"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-black border shadow-lg transition-colors ${
                          isSelected
                            ? 'bg-[#FF9F1C] text-black border-white shadow-[0_0_15px_rgba(255,159,28,0.8)] scale-110'
                            : 'bg-[#181818]/90 text-white border-[#333] hover:border-[#FF9F1C]'
                        }`}
                      >
                        {isSelected ? order : <MapPin className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Rotation Path Summary */}
              <div className="bg-[#161616] p-4 rounded-2xl border border-[#262626] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-neutral-400 font-heading uppercase font-bold">Rotation Order:</span>
                  {rotationPoints.map((pt, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="px-2.5 py-1 rounded bg-[#FF9F1C]/20 text-[#FF9F1C] font-heading font-bold">
                        {i + 1}. {pt}
                      </span>
                      {i < rotationPoints.length - 1 && <span className="text-neutral-600">➔</span>}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setRotationPoints(['Clock Tower', 'Peak'])}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Plan</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SCRIM SCORE CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Form Controls */}
              <div className="md:col-span-6 bg-[#161616] p-6 rounded-2xl border border-[#262626] space-y-5">
                <div className="space-y-1">
                  <h4 className="font-heading font-bold uppercase text-white text-base">
                    FFWS Official Scoring Matrix
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Calculates placement points (#1 Booyah = 12pts) + 1 point per confirmed elimination.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase text-neutral-300 mb-1.5">
                      Squad / Team Name
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-heading font-bold uppercase text-neutral-300 mb-1.5">
                      <span>Lobby Placement: #{placement}</span>
                      <span className="text-[#FF9F1C]">+{calculatedPlacementPts} Placement Pts</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={placement}
                      onChange={(e) => setPlacement(Number(e.target.value))}
                      className="w-full accent-[#FF9F1C] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-heading font-bold uppercase text-neutral-300 mb-1.5">
                      <span>Squad Eliminations: {kills} Kills</span>
                      <span className="text-[#FF9F1C]">+{kills} Kill Pts</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="35"
                      value={kills}
                      onChange={(e) => setKills(Number(e.target.value))}
                      className="w-full accent-[#FF9F1C] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation Output Card */}
              <div className="md:col-span-6 bg-gradient-to-br from-[#1E1E1E] to-[#121212] p-8 rounded-3xl border-2 border-[#FF9F1C]/40 space-y-6 shadow-2xl text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 text-[#FF9F1C] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,159,28,0.3)]">
                  <Trophy className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-heading font-bold uppercase text-[#FF9F1C] tracking-widest">
                    TOTAL MATCH SCORE
                  </span>
                  <div className="text-6xl font-heading font-black text-white">
                    {totalScore} <span className="text-2xl text-[#FF9F1C]">PTS</span>
                  </div>
                  <p className="text-sm font-heading font-bold text-neutral-300 uppercase">
                    {teamName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#2A2A2A] text-xs">
                  <div className="bg-[#0D0D0D] p-3 rounded-xl">
                    <span className="text-neutral-400 block text-[10px] uppercase">Rank Bonus</span>
                    <span className="font-heading font-bold text-white text-base">+{calculatedPlacementPts} pts</span>
                  </div>
                  <div className="bg-[#0D0D0D] p-3 rounded-xl">
                    <span className="text-neutral-400 block text-[10px] uppercase">Eliminations</span>
                    <span className="font-heading font-bold text-[#FF9F1C] text-base">+{kills} pts</span>
                  </div>
                </div>

                <button
                  onClick={onDownloadClick}
                  className="w-full py-3.5 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-sm uppercase tracking-wider transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>GET FULL APP FOR AUTOMATED LOBBY TRACKING</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
