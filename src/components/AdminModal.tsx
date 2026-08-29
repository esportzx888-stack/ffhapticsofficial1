import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Upload,
  MessageSquare,
  Smartphone,
  Image as ImageIcon,
  Save,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Filter,
  Eye,
  Star,
  MapPin,
  Compass,
  Layers,
  Crosshair,
  ZoomIn,
  Edit3,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { FeedbackItem, ApkConfig, MediaConfig, TacticalMapItem, FeedbackType, FeedbackStatus } from '../types';
import { DEFAULT_TACTICAL_MAPS } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbacks: FeedbackItem[];
  apkConfig: ApkConfig;
  mediaConfig: MediaConfig;
  onUpdateFeedbacks: (feedbacks: FeedbackItem[]) => void;
  onUpdateApkConfig: (config: ApkConfig) => void;
  onUpdateMediaConfig: (config: MediaConfig) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  feedbacks,
  apkConfig,
  mediaConfig,
  onUpdateFeedbacks,
  onUpdateApkConfig,
  onUpdateMediaConfig,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'tactical-maps' | 'media' | 'apk' | 'feedbacks'>('tactical-maps');

  // Feedback filter
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | FeedbackType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | FeedbackStatus>('all');

  // Form states for APK
  const [apkForm, setApkForm] = useState<ApkConfig>(apkConfig);
  const [apkSavedAlert, setApkSavedAlert] = useState(false);
  const [newReleaseNote, setNewReleaseNote] = useState('');

  // Media states
  const [mediaForm, setMediaForm] = useState<MediaConfig>(mediaConfig);
  const [mediaSavedAlert, setMediaSavedAlert] = useState(false);

  // Sync state when props update
  React.useEffect(() => {
    setMediaForm(mediaConfig);
  }, [mediaConfig]);

  React.useEffect(() => {
    setApkForm(apkConfig);
  }, [apkConfig]);

  // Tactical Maps Management State
  const [mapCategoryFilter, setMapCategoryFilter] = useState<'all' | 'official' | 'custom' | 'scrim' | 'tournament'>('all');
  const [showAddMapForm, setShowAddMapForm] = useState(false);
  const [editingMapId, setEditingMapId] = useState<string | null>(null);
  const [selectedPreviewMap, setSelectedPreviewMap] = useState<TacticalMapItem | null>(null);
  const [mapNotification, setMapNotification] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // In-App Confirmation Dialog State (100% iframe safe, replaces window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    confirmVariant?: 'danger' | 'warning' | 'primary';
    onConfirm: () => void;
  } | null>(null);

  // New Map Form State
  const [newMapName, setNewMapName] = useState('');
  const [newMapKey, setNewMapKey] = useState('');
  const [newMapCategory, setNewMapCategory] = useState<'official' | 'custom' | 'scrim' | 'tournament'>('custom');
  const [newMapImageUrl, setNewMapImageUrl] = useState('');
  const [newMapDescription, setNewMapDescription] = useState('');
  const [newMapDropZones, setNewMapDropZones] = useState('');
  const [newMapChokePoints, setNewMapChokePoints] = useState('');
  const [newMapAuthor, setNewMapAuthor] = useState('Admin Commander');

  if (!isOpen) return null;

  const triggerMapAlert = (msg: string) => {
    setMapNotification(msg);
    setTimeout(() => setMapNotification(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'tactix2026' || password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Passcode. (Demo hint: use "admin123")');
    }
  };

  const handleQuickLogin = () => {
    setPassword('admin123');
    setIsAuthenticated(true);
    setLoginError('');
  };

  // Feedback Actions
  const handleUpdateFeedbackStatus = (id: string, newStatus: FeedbackStatus) => {
    const updated = feedbacks.map((fb) =>
      fb.id === id ? { ...fb, status: newStatus } : fb
    );
    onUpdateFeedbacks(updated);
  };

  const handleDeleteFeedback = (id: string) => {
    const target = feedbacks.find((fb) => fb.id === id);
    const authorName = target?.name || 'Anonymous Player';
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Feedback Entry?',
      message: `Are you sure you want to delete feedback from "${authorName}"? This entry will be permanently removed.`,
      confirmText: 'Yes, Delete Feedback',
      confirmVariant: 'danger',
      onConfirm: () => {
        const updated = feedbacks.filter((fb) => fb.id !== id);
        onUpdateFeedbacks(updated);
        setConfirmDialog(null);
        triggerMapAlert('Community feedback deleted successfully.');
      }
    });
  };

  const handleClearResolvedFeedback = () => {
    const resolvedList = feedbacks.filter((fb) => fb.status === 'resolved');
    if (resolvedList.length === 0) {
      triggerMapAlert('No resolved feedback items found to clear.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Clear Resolved Feedback?',
      message: `This will permanently delete all ${resolvedList.length} resolved feedback submissions from the database.`,
      confirmText: `Delete ${resolvedList.length} Resolved Entries`,
      confirmVariant: 'danger',
      onConfirm: () => {
        const updated = feedbacks.filter((fb) => fb.status !== 'resolved');
        onUpdateFeedbacks(updated);
        setConfirmDialog(null);
        triggerMapAlert(`${resolvedList.length} resolved feedback items cleared.`);
      }
    });
  };

  // APK Actions
  const handleSaveApk = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateApkConfig(apkForm);
    setApkSavedAlert(true);
    setTimeout(() => setApkSavedAlert(false), 3000);
  };

  const handleAddReleaseNote = () => {
    if (!newReleaseNote.trim()) return;
    setApkForm((prev) => ({
      ...prev,
      releaseNotes: [...prev.releaseNotes, newReleaseNote.trim()],
    }));
    setNewReleaseNote('');
  };

  const handleRemoveReleaseNote = (index: number) => {
    setApkForm((prev) => ({
      ...prev,
      releaseNotes: prev.releaseNotes.filter((_, i) => i !== index),
    }));
  };

  const handleApkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setApkForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeMb,
        releaseDate: new Date().toISOString().split('T')[0],
      }));
    }
  };

  // Media Actions
  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMediaConfig(mediaForm);
    setMediaSavedAlert(true);
    setTimeout(() => setMediaSavedAlert(false), 3000);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'heroMockupImage' | 'bermudaMapImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        if (loadEv.target?.result) {
          const resultStr = loadEv.target.result as string;
          setMediaForm((prev) => ({
            ...prev,
            [key]: resultStr,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Tactical Map Pics Management Actions
  const handleMapImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        if (loadEv.target?.result) {
          setNewMapImageUrl(loadEv.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReplaceMapPic = (mapId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        if (loadEv.target?.result) {
          const newImgUrl = loadEv.target.result as string;
          const updatedMaps = (mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS).map((m) =>
            m.id === mapId ? { ...m, imageUrl: newImgUrl, lastUpdated: new Date().toISOString() } : m
          );
          const updatedConfig = { ...mediaForm, tacticalMaps: updatedMaps };
          
          // Also sync with direct keys if matching
          const currentMap = updatedMaps.find((m) => m.id === mapId);
          if (currentMap?.key === 'bermuda') updatedConfig.bermudaMapImage = newImgUrl;
          if (currentMap?.key === 'purgatory') updatedConfig.purgatoryMapImage = newImgUrl;

          setMediaForm(updatedConfig);
          onUpdateMediaConfig(updatedConfig);
          triggerMapAlert(`Tactical map picture for "${currentMap?.name}" updated successfully!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateOrUpdateMap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMapName.trim() || !newMapImageUrl.trim()) {
      setFormError('Please provide a Map Name and either upload a picture or paste an image URL.');
      return;
    }
    setFormError(null);

    const dropZonesArr = newMapDropZones
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const chokePointsArr = newMapChokePoints
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const generatedKey = newMapKey.trim() || newMapName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingMapId) {
      // Edit existing
      const updatedMaps = (mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS).map((m) => {
        if (m.id === editingMapId) {
          return {
            ...m,
            name: newMapName.trim(),
            key: generatedKey,
            category: newMapCategory,
            imageUrl: newMapImageUrl,
            description: newMapDescription.trim(),
            author: newMapAuthor.trim(),
            dropZones: dropZonesArr.length > 0 ? dropZonesArr : m.dropZones,
            chokePoints: chokePointsArr.length > 0 ? chokePointsArr : m.chokePoints,
            lastUpdated: new Date().toISOString(),
          };
        }
        return m;
      });

      const updatedConfig = { ...mediaForm, tacticalMaps: updatedMaps };
      setMediaForm(updatedConfig);
      onUpdateMediaConfig(updatedConfig);
      triggerMapAlert(`Map "${newMapName}" updated successfully!`);
    } else {
      // Add new tactical map
      const newMapItem: TacticalMapItem = {
        id: `map-custom-${Date.now()}`,
        name: newMapName.trim(),
        key: generatedKey,
        category: newMapCategory,
        imageUrl: newMapImageUrl,
        description: newMapDescription.trim() || 'Custom tournament tactical map layout.',
        author: newMapAuthor.trim() || 'Admin Commander',
        dropZones: dropZonesArr.length > 0 ? dropZonesArr : ['Zone 1 Hot Drop', 'High Ground Compound', 'River Valley'],
        chokePoints: chokePointsArr.length > 0 ? chokePointsArr : ['Bridge Overpass', 'Mountain Pass'],
        isCustom: true,
        lastUpdated: new Date().toISOString(),
      };

      const updatedMaps = [newMapItem, ...(mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS)];
      const updatedConfig = { ...mediaForm, tacticalMaps: updatedMaps };
      setMediaForm(updatedConfig);
      onUpdateMediaConfig(updatedConfig);
      triggerMapAlert(`New tactical map picture "${newMapName}" added!`);
    }

    // Reset Form
    resetMapForm();
  };

  const resetMapForm = () => {
    setNewMapName('');
    setNewMapKey('');
    setNewMapCategory('custom');
    setNewMapImageUrl('');
    setNewMapDescription('');
    setNewMapDropZones('');
    setNewMapChokePoints('');
    setNewMapAuthor('Admin Commander');
    setShowAddMapForm(false);
    setEditingMapId(null);
    setFormError(null);
  };

  const handleStartEditMap = (mapItem: TacticalMapItem) => {
    setEditingMapId(mapItem.id);
    setNewMapName(mapItem.name);
    setNewMapKey(mapItem.key);
    setNewMapCategory(mapItem.category);
    setNewMapImageUrl(mapItem.imageUrl);
    setNewMapDescription(mapItem.description || '');
    setNewMapDropZones(mapItem.dropZones?.join(', ') || '');
    setNewMapChokePoints(mapItem.chokePoints?.join(', ') || '');
    setNewMapAuthor(mapItem.author || 'Admin Commander');
    setFormError(null);
    setShowAddMapForm(true);
  };

  const handleDeleteMap = (mapId: string) => {
    const currentList = mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS;
    const targetMap = currentList.find((m) => m.id === mapId);
    const mapName = targetMap?.name || 'this tactical map';
    
    setConfirmDialog({
      isOpen: true,
      title: `Delete Tactical Map?`,
      message: `Are you sure you want to delete "${mapName}"? It will be permanently removed from all Tactical Playbooks and the Whiteboard Explorer.`,
      confirmText: 'Yes, Delete Map',
      confirmVariant: 'danger',
      onConfirm: () => {
        const updatedMaps = currentList.filter((m) => m.id !== mapId);
        const updatedConfig = { ...mediaForm, tacticalMaps: updatedMaps };
        setMediaForm(updatedConfig);
        onUpdateMediaConfig(updatedConfig);
        if (editingMapId === mapId) {
          resetMapForm();
        }
        setConfirmDialog(null);
        triggerMapAlert(`Map "${mapName}" deleted successfully.`);
      }
    });
  };

  const handleRestoreAllDefaults = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Restore Default Tactical Maps?',
      message: 'This will restore all 5 official tournament blueprints (Bermuda MAX, Purgatory Pro, Alpine Sub-Zero, Kalahari Dunes, NeXTerra 2.0). Any custom community maps you created will be kept.',
      confirmText: 'Restore Defaults',
      confirmVariant: 'warning',
      onConfirm: () => {
        const currentList = mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS;
        const customOnly = currentList.filter((m) => m.isCustom);
        const updatedMaps = [...DEFAULT_TACTICAL_MAPS, ...customOnly];
        const updatedConfig = { 
          ...mediaForm, 
          tacticalMaps: updatedMaps,
          bermudaMapImage: DEFAULT_TACTICAL_MAPS[0].imageUrl,
          purgatoryMapImage: DEFAULT_TACTICAL_MAPS[1].imageUrl,
        };
        setMediaForm(updatedConfig);
        onUpdateMediaConfig(updatedConfig);
        setConfirmDialog(null);
        triggerMapAlert('All official default tactical maps restored.');
      }
    });
  };

  const handleResetToDefaultMap = (mapId: string) => {
    const defaultItem = DEFAULT_TACTICAL_MAPS.find((m) => m.id === mapId);
    if (!defaultItem) return;
    const updatedMaps = (mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS).map((m) =>
      m.id === mapId ? { ...defaultItem, lastUpdated: new Date().toISOString() } : m
    );
    const updatedConfig = { ...mediaForm, tacticalMaps: updatedMaps };
    if (defaultItem.key === 'bermuda') updatedConfig.bermudaMapImage = defaultItem.imageUrl;
    if (defaultItem.key === 'purgatory') updatedConfig.purgatoryMapImage = defaultItem.imageUrl;

    setMediaForm(updatedConfig);
    onUpdateMediaConfig(updatedConfig);
    triggerMapAlert(`Reset "${defaultItem.name}" to default tournament blueprint!`);
  };

  const handleAddSampleScrimMap = () => {
    const sampleMap: TacticalMapItem = {
      id: `map-scrim-${Date.now()}`,
      name: 'FFWS Season 2026 Grand Finals Scrim Map',
      key: 'ffws-finals-2026',
      category: 'tournament',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      description: 'Exclusive Grand Finals satellite layout with custom thermal heatmap overlays, drop priority pins, and vehicle rotation lanes.',
      author: 'FFWS Tournament Operations',
      dropZones: ['Zone 1 Stadium', 'North Hillside Nest', 'Harbor Trench', 'Alpha Compound'],
      chokePoints: ['Grand River Causeway', 'Radar Ridge Zipline', 'Central Tunnel Gate'],
      isCustom: true,
      lastUpdated: new Date().toISOString(),
    };

    const updatedMaps = [sampleMap, ...(mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS)];
    const updatedConfig = { ...mediaForm, tacticalMaps: updatedMaps };
    setMediaForm(updatedConfig);
    onUpdateMediaConfig(updatedConfig);
    triggerMapAlert('Sample FFWS Grand Finals Scrim Map added to Tactical Maps!');
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchType = feedbackFilter === 'all' || fb.type === feedbackFilter;
    const matchStatus = statusFilter === 'all' || fb.status === statusFilter;
    return matchType && matchStatus;
  });

  const currentTacticalMaps = mediaForm.tacticalMaps || DEFAULT_TACTICAL_MAPS;
  const filteredTacticalMaps = currentTacticalMaps.filter((m) => {
    if (mapCategoryFilter === 'all') return true;
    return m.category === mapCategoryFilter;
  });

  return (
    <div
      id="admin-portal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-6xl bg-[#111111] border-2 border-[#262626] rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Top Modal Header */}
        <div className="bg-[#181818] p-4 sm:px-8 border-b border-[#242424] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF9F1C] text-black flex items-center justify-center font-heading font-black text-base shadow-[0_0_20px_rgba(255,159,28,0.3)]">
              FF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg uppercase text-white tracking-wider">
                  COMMAND ADMIN CONSOLE
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-heading font-black bg-[#FF9F1C] text-black">
                  ROOT / ESPORTS HQ
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Upload & manage tactical map pictures, APK binaries, and community telemetry.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#222] hover:bg-[#333] text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Login Gate Screen */
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FF9F1C]/15 border border-[#FF9F1C]/30 text-[#FF9F1C] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,159,28,0.25)]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-heading font-black uppercase text-white tracking-wide">
                  Admin Passcode Required
                </h4>
                <p className="text-xs text-neutral-400">
                  Access restricted to FF TACTIX esports engineers and administrators.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-neutral-300 mb-1.5">
                    Security Passcode
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin passcode (e.g. admin123)"
                    className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder-neutral-600 font-mono"
                    autoFocus
                  />
                </div>

                {loginError && (
                  <p className="text-xs text-red-400 flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{loginError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-sm uppercase tracking-wider transition-colors shadow-lg cursor-pointer active:scale-95"
                >
                  AUTHENTICATE & ENTER
                </button>
              </form>

              {/* Demo Helper Button */}
              <div className="pt-4 border-t border-[#222]">
                <button
                  onClick={handleQuickLogin}
                  className="text-xs text-neutral-400 hover:text-[#FF9F1C] underline font-mono cursor-pointer"
                >
                  Quick Demo Access (Auto-fill `admin123`)
                </button>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-[#242424] pb-4">
                {/* 1. TACTICAL MAPS TAB (PRIMARY FEATURE) */}
                <button
                  onClick={() => setActiveTab('tactical-maps')}
                  className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'tactical-maps'
                      ? 'bg-[#FF9F1C] text-black shadow-[0_0_15px_rgba(255,159,28,0.3)]'
                      : 'bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#2B2B2B]'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Tactical Maps & Pics ({currentTacticalMaps.length})</span>
                </button>

                {/* 2. MEDIA & MOCKUPS */}
                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'media'
                      ? 'bg-[#FF9F1C] text-black shadow-[0_0_15px_rgba(255,159,28,0.3)]'
                      : 'bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#2B2B2B]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Hero Phone Media</span>
                </button>

                {/* 3. APK PACKAGES */}
                <button
                  onClick={() => setActiveTab('apk')}
                  className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'apk'
                      ? 'bg-[#FF9F1C] text-black shadow-[0_0_15px_rgba(255,159,28,0.3)]'
                      : 'bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#2B2B2B]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>APK Release Manager</span>
                </button>

                {/* 4. PLAYER FEEDBACKS */}
                <button
                  onClick={() => setActiveTab('feedbacks')}
                  className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'feedbacks'
                      ? 'bg-[#FF9F1C] text-black shadow-[0_0_15px_rgba(255,159,28,0.3)]'
                      : 'bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#2B2B2B]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Feedbacks ({feedbacks.length})</span>
                </button>
              </div>

              {/* Notification Banner */}
              {mapNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-[#FF9F1C]/15 border border-[#FF9F1C]/40 text-[#FF9F1C] text-xs font-heading font-bold flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{mapNotification}</span>
                </motion.div>
              )}

              {/* TAB 1: TACTICAL MAPS & PICS MANAGER */}
              {activeTab === 'tactical-maps' && (
                <div className="space-y-6">
                  
                  {/* Top Bar with Filter and Add Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161616] p-4 rounded-2xl border border-[#242424]">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-[#FF9F1C]" />
                        <span className="text-xs font-heading font-bold uppercase text-neutral-300">Filter Maps:</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {(['all', 'official', 'tournament', 'scrim', 'custom'] as const).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setMapCategoryFilter(cat)}
                            className={`px-3 py-1 rounded-lg text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                              mapCategoryFilter === cat
                                ? 'bg-[#FF9F1C] text-black shadow-sm'
                                : 'bg-[#222] text-neutral-400 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleRestoreAllDefaults}
                        className="px-3.5 py-2 rounded-xl bg-[#1F1F1F] hover:bg-[#2A2A2A] text-xs font-heading font-bold text-neutral-300 hover:text-white uppercase border border-[#333] flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Restore 4 official tournament tactical maps"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#FF9F1C]" />
                        <span>Restore Defaults</span>
                      </button>

                      <button
                        onClick={handleAddSampleScrimMap}
                        className="px-3.5 py-2 rounded-xl bg-[#1F1F1F] hover:bg-[#2A2A2A] text-xs font-heading font-bold text-neutral-300 hover:text-white uppercase border border-[#333] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF9F1C]" />
                        <span>Add Sample Scrim Map</span>
                      </button>

                      <button
                        onClick={() => {
                          resetMapForm();
                          setShowAddMapForm(!showAddMapForm);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black text-xs font-heading font-black uppercase flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,159,28,0.3)] cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{showAddMapForm ? 'CLOSE MAP BUILDER' : 'ADD TACTICAL MAP PIC'}</span>
                      </button>
                    </div>
                  </div>

                  {/* ADD / EDIT MAP PIC SLIDE FORM */}
                  <AnimatePresence>
                    {showAddMapForm && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleCreateOrUpdateMap}
                        className="bg-[#161616] p-6 rounded-2xl border-2 border-[#FF9F1C]/40 space-y-5 overflow-hidden"
                      >
                        <div className="flex items-center justify-between border-b border-[#242424] pb-3">
                          <h4 className="font-heading font-black text-sm uppercase text-white flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[#FF9F1C]" />
                            <span>{editingMapId ? 'EDIT TACTICAL MAP PHOTO' : 'ADD NEW TACTICAL MAP PICTURE & STRATEGY'}</span>
                          </h4>
                          <span className="text-[11px] text-neutral-400 font-mono">
                            Admin Map Ingestor
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Map Name */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                              Map Name / Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={newMapName}
                              onChange={(e) => setNewMapName(e.target.value)}
                              placeholder="e.g. Bermuda Season 4 Scrim Map"
                              className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2.5 text-xs text-white"
                            />
                          </div>

                          {/* Map Key / Identifier */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                              Map Identifier Key
                            </label>
                            <input
                              type="text"
                              value={newMapKey}
                              onChange={(e) => setNewMapKey(e.target.value)}
                              placeholder="e.g. bermuda, purgatory, scrim-map-01"
                              className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                            />
                          </div>

                          {/* Category */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                              Category
                            </label>
                            <select
                              value={newMapCategory}
                              onChange={(e) => setNewMapCategory(e.target.value as any)}
                              className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2.5 text-xs text-white"
                            >
                              <option value="official">Official FF MAX Map</option>
                              <option value="tournament">Tournament Finals</option>
                              <option value="scrim">Custom Scrim Blueprint</option>
                              <option value="custom">Team Playbook Map</option>
                            </select>
                          </div>
                        </div>

                        {/* Tactical Map Picture Upload Dropzone & URL Input */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                          {/* File Upload / Drag Drop */}
                          <div className="md:col-span-6 bg-[#0E0E0E] p-4 rounded-xl border-2 border-dashed border-[#2E2E2E] text-center space-y-2">
                            <Upload className="w-6 h-6 text-[#FF9F1C] mx-auto" />
                            <div className="font-heading font-bold text-xs uppercase text-white">
                              Upload Local Tactical Map Picture
                            </div>
                            <p className="text-[11px] text-neutral-400">
                              PNG, JPG, WebP satellite render or tactical whiteboard photo.
                            </p>
                            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#242424] hover:bg-[#303030] text-xs font-heading font-bold text-white uppercase cursor-pointer border border-[#383838]">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Select Map Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleMapImageFileUpload}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* Image URL fallback */}
                          <div className="md:col-span-6 space-y-3">
                            <div className="space-y-1.5">
                              <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                                ... Or Paste Direct Map Image URL
                              </label>
                              <input
                                type="text"
                                value={newMapImageUrl}
                                onChange={(e) => setNewMapImageUrl(e.target.value)}
                                placeholder="https://cdn.example.com/tactical-map-bermuda.jpg"
                                className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2.5 text-xs text-white"
                              />
                            </div>

                            {/* Preset High-Def Blueprints Buttons */}
                            <div>
                              <span className="text-[10px] font-heading font-bold uppercase text-neutral-500 block mb-1">
                                Quick Preset Blueprints:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {[
                                  { label: 'Bermuda Satellite', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80' },
                                  { label: 'Purgatory Valley', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' },
                                  { label: 'Alpine Snow', url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80' },
                                  { label: 'Kalahari Desert', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80' },
                                ].map((pre, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setNewMapImageUrl(pre.url)}
                                    className="px-2 py-1 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-neutral-300 text-[10px] font-mono rounded border border-[#2F2F2F] cursor-pointer"
                                  >
                                    {pre.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image Preview Box */}
                        {newMapImageUrl && (
                          <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#2B2B2B] flex items-center gap-4">
                            <div className="w-28 h-20 bg-[#161616] rounded-lg overflow-hidden shrink-0 border border-[#333] relative">
                              <img
                                src={newMapImageUrl}
                                alt="Map Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-heading font-bold text-white flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Image Loaded & Verified</span>
                              </div>
                              <p className="text-[11px] text-neutral-400">
                                This picture will be rendered in the Visual Playbooks, Whiteboard Rotation Canvas, and Hero Radar.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Meta: Description, Drop zones, Choke points */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                              Primary Drop Zones (Comma-separated)
                            </label>
                            <input
                              type="text"
                              value={newMapDropZones}
                              onChange={(e) => setNewMapDropZones(e.target.value)}
                              placeholder="Clock Tower, Peak, Factory, Pochinok"
                              className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2 text-xs text-white"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                              Rotation Choke Points (Comma-separated)
                            </label>
                            <input
                              type="text"
                              value={newMapChokePoints}
                              onChange={(e) => setNewMapChokePoints(e.target.value)}
                              placeholder="Bimasakti Bridge, Peak South Ridge, Factory Trench"
                              className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                            Tactical Description / Strategic Breakdown
                          </label>
                          <textarea
                            rows={2}
                            value={newMapDescription}
                            onChange={(e) => setNewMapDescription(e.target.value)}
                            placeholder="Describe high-ground dominance, compound loot density, and recommended zone rotations..."
                            className="w-full bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#FF9F1C] rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                          />
                        </div>

                        {/* Error Alert */}
                        {formError && (
                          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{formError}</span>
                          </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                          >
                            <Save className="w-4 h-4" />
                            <span>{editingMapId ? 'UPDATE MAP PICTURE & SPECS' : 'SAVE & PUBLISH TACTICAL MAP'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={resetMapForm}
                            className="px-5 py-3 rounded-xl bg-[#222] hover:bg-[#2C2C2C] text-neutral-300 hover:text-white font-heading font-bold text-xs uppercase cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>

                          {editingMapId && (
                            <button
                              type="button"
                              onClick={() => handleDeleteMap(editingMapId)}
                              className="px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 font-heading font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer ml-auto transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete Map</span>
                            </button>
                          )}
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* MAPS GALLERY GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTacticalMaps.map((mapItem) => (
                      <div
                        key={mapItem.id}
                        className="bg-[#161616] rounded-2xl border border-[#282828] overflow-hidden flex flex-col justify-between hover:border-[#FF9F1C]/60 transition-all group"
                      >
                        {/* Map Image Thumbnail Card Header */}
                        <div className="relative h-44 bg-[#0A0A0A] overflow-hidden">
                          {mapItem.imageUrl ? (
                            <img
                              src={mapItem.imageUrl}
                              alt={mapItem.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-[#0E0E0E]">
                              <Compass className="w-12 h-12" />
                            </div>
                          )}

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-heading font-black uppercase tracking-wider shadow-md ${
                              mapItem.category === 'official'
                                ? 'bg-sky-500 text-black'
                                : mapItem.category === 'tournament'
                                ? 'bg-[#FF9F1C] text-black'
                                : 'bg-emerald-500 text-black'
                            }`}>
                              {mapItem.category}
                            </span>

                            <span className="px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] border border-[#333]">
                              KEY: {mapItem.key.toUpperCase()}
                            </span>
                          </div>

                          {/* Quick Change Pic Overlay Button */}
                          <div className="absolute bottom-2 right-2">
                            <label className="px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-[11px] font-heading font-bold text-[#FF9F1C] border border-[#333] hover:border-[#FF9F1C] cursor-pointer flex items-center gap-1 shadow-lg transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Replace Pic</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleReplaceMapPic(mapItem.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-heading font-black text-white text-base">
                                {mapItem.name}
                              </h5>
                              <button
                                onClick={() => setSelectedPreviewMap(mapItem)}
                                className="text-xs text-neutral-400 hover:text-[#FF9F1C] p-1 cursor-pointer"
                                title="Inspect Live Map"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                              {mapItem.description}
                            </p>

                            {/* Drop zones chips */}
                            {mapItem.dropZones && mapItem.dropZones.length > 0 && (
                              <div className="space-y-1">
                                <span className="text-[10px] font-heading font-bold uppercase text-neutral-500">
                                  Drop Zones:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {mapItem.dropZones.slice(0, 3).map((dz, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-[#1F1F1F] text-neutral-300 text-[10px] rounded border border-[#2C2C2C]"
                                    >
                                      {dz}
                                    </span>
                                  ))}
                                  {mapItem.dropZones.length > 3 && (
                                    <span className="px-1.5 py-0.5 text-neutral-500 text-[10px]">
                                      +{mapItem.dropZones.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Footer Actions */}
                          <div className="pt-3 border-t border-[#222] flex items-center justify-between text-xs">
                            <div className="text-[10px] text-neutral-500 font-mono">
                              Updated {new Date(mapItem.lastUpdated || Date.now()).toLocaleDateString()}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartEditMap(mapItem)}
                                className="px-2.5 py-1 rounded bg-[#222] hover:bg-[#2D2D2D] text-neutral-300 hover:text-white font-heading font-bold text-[11px] uppercase flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>

                              {mapItem.isDefault && (
                                <button
                                  onClick={() => handleResetToDefaultMap(mapItem.id)}
                                  className="px-2 py-1 rounded bg-[#222] hover:bg-[#2D2D2D] text-neutral-400 hover:text-[#FF9F1C] font-heading font-bold text-[11px] uppercase flex items-center gap-1 cursor-pointer transition-colors"
                                  title="Reset image to default blueprint"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteMap(mapItem.id)}
                                className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 font-heading font-bold text-[11px] uppercase flex items-center gap-1 cursor-pointer transition-colors"
                                title={`Delete ${mapItem.name}`}
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: HERO PHONE MEDIA MANAGER */}
              {activeTab === 'media' && (
                <form onSubmit={handleSaveMedia} className="space-y-6">
                  {mediaSavedAlert && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Media assets updated successfully!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hero Mockup Customizer */}
                    <div className="bg-[#161616] p-5 rounded-2xl border border-[#262626] space-y-4">
                      <h4 className="font-heading font-black uppercase text-white text-sm flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#FF9F1C]" />
                        <span>Hero Phone Screenshot / Photo</span>
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload custom gameplay screenshot or scoreboard photo to display inside the floating hero mockup chassis.
                      </p>

                      <input
                        type="text"
                        value={mediaForm.heroMockupImage}
                        onChange={(e) => setMediaForm({ ...mediaForm, heroMockupImage: e.target.value })}
                        placeholder="Paste image URL (https://...)"
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2 text-xs text-white"
                      />

                      <div className="flex items-center gap-3">
                        <label className="px-3.5 py-2 rounded-xl bg-[#222] hover:bg-[#2C2C2C] text-xs font-heading font-bold text-white uppercase cursor-pointer border border-[#333] flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5" />
                          <span>UPLOAD LOCAL PHOTO</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, 'heroMockupImage')}
                            className="hidden"
                          />
                        </label>
                        {mediaForm.heroMockupImage && (
                          <button
                            type="button"
                            onClick={() => setMediaForm({ ...mediaForm, heroMockupImage: '' })}
                            className="text-xs text-neutral-400 hover:text-red-400 cursor-pointer"
                          >
                            Reset to Vector UI
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Primary Bermuda Map Overlay */}
                    <div className="bg-[#161616] p-5 rounded-2xl border border-[#262626] space-y-4">
                      <h4 className="font-heading font-black uppercase text-white text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#38BDF8]" />
                        <span>Bermuda Map Radar Background</span>
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload default Free Fire MAX Bermuda satellite blueprint photo.
                      </p>

                      <input
                        type="text"
                        value={mediaForm.bermudaMapImage}
                        onChange={(e) => setMediaForm({ ...mediaForm, bermudaMapImage: e.target.value })}
                        placeholder="Paste map image URL (https://...)"
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2 text-xs text-white"
                      />

                      <div className="flex items-center gap-3">
                        <label className="px-3.5 py-2 rounded-xl bg-[#222] hover:bg-[#2C2C2C] text-xs font-heading font-bold text-white uppercase cursor-pointer border border-[#333] flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5" />
                          <span>UPLOAD MAP OVERLAY</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(e, 'bermudaMapImage')}
                            className="hidden"
                          />
                        </label>
                        {mediaForm.bermudaMapImage && (
                          <button
                            type="button"
                            onClick={() => setMediaForm({ ...mediaForm, bermudaMapImage: '' })}
                            className="text-xs text-neutral-400 hover:text-red-400 cursor-pointer"
                          >
                            Reset to Default
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE MEDIA ASSETS</span>
                  </button>
                </form>
              )}

              {/* TAB 3: APK RELEASE MANAGER */}
              {activeTab === 'apk' && (
                <form onSubmit={handleSaveApk} className="space-y-6">
                  {apkSavedAlert && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>APK Release configurations saved and updated live across the website!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                        Release Version
                      </label>
                      <input
                        type="text"
                        value={apkForm.version}
                        onChange={(e) => setApkForm({ ...apkForm, version: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                        Build Number
                      </label>
                      <input
                        type="text"
                        value={apkForm.buildNumber}
                        onChange={(e) => setApkForm({ ...apkForm, buildNumber: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                        File Size
                      </label>
                      <input
                        type="text"
                        value={apkForm.fileSize}
                        onChange={(e) => setApkForm({ ...apkForm, fileSize: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                        Minimum OS
                      </label>
                      <input
                        type="text"
                        value={apkForm.minAndroid}
                        onChange={(e) => setApkForm({ ...apkForm, minAndroid: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                        Package File Name
                      </label>
                      <input
                        type="text"
                        value={apkForm.fileName}
                        onChange={(e) => setApkForm({ ...apkForm, fileName: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                        Release Date
                      </label>
                      <input
                        type="date"
                        value={apkForm.releaseDate}
                        onChange={(e) => setApkForm({ ...apkForm, releaseDate: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Upload APK File Dropzone */}
                  <div className="bg-[#161616] p-5 rounded-2xl border-2 border-dashed border-[#2E2E2E] text-center space-y-3">
                    <Upload className="w-8 h-8 text-[#FF9F1C] mx-auto" />
                    <div>
                      <div className="font-heading font-black text-white text-sm uppercase">
                        Upload New .APK Binary Package
                      </div>
                      <p className="text-xs text-neutral-400">
                        Upload a new build file directly or update download URLs.
                      </p>
                    </div>
                    <label className="inline-block px-4 py-2 rounded-xl bg-[#242424] hover:bg-[#303030] text-xs font-heading font-bold text-white uppercase cursor-pointer border border-[#383838]">
                      <span>SELECT APK FILE</span>
                      <input
                        type="file"
                        accept=".apk"
                        onChange={handleApkFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Release Notes Manager */}
                  <div className="space-y-3">
                    <label className="block text-xs font-heading font-bold uppercase text-neutral-300">
                      Release Notes (Changelog)
                    </label>
                    <div className="space-y-2">
                      {apkForm.releaseNotes.map((note, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-[#0A0A0A] p-2.5 rounded-xl border border-[#242424] text-xs">
                          <span className="text-neutral-300">{note}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveReleaseNote(idx)}
                            className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newReleaseNote}
                        onChange={(e) => setNewReleaseNote(e.target.value)}
                        placeholder="Add a new release note bullet point..."
                        className="flex-1 bg-[#0A0A0A] border border-[#2B2B2B] rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddReleaseNote}
                        className="px-4 py-2 bg-[#222] hover:bg-[#2C2C2C] text-white font-heading font-bold text-xs uppercase rounded-xl border border-[#333] cursor-pointer"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE & PUBLISH APK CONFIG</span>
                  </button>
                </form>
              )}

              {/* TAB 4: FEEDBACKS MANAGEMENT */}
              {activeTab === 'feedbacks' && (
                <div className="space-y-4">
                  {/* Filters Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#161616] p-3.5 rounded-2xl border border-[#222]">
                    <div className="flex flex-wrap items-center gap-2">
                      <Filter className="w-4 h-4 text-[#FF9F1C]" />
                      <span className="text-xs font-heading font-bold uppercase text-neutral-300">Filter By:</span>
                      
                      <select
                        value={feedbackFilter}
                        onChange={(e) => setFeedbackFilter(e.target.value as any)}
                        className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-2.5 py-1 text-xs text-white"
                      >
                        <option value="all">All Feedback Types</option>
                        <option value="General feedback">General feedback</option>
                        <option value="Bug report">Bug report</option>
                        <option value="Feature request">Feature request</option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-2.5 py-1 text-xs text-white"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs text-neutral-400 font-mono">
                        Showing {filteredFeedbacks.length} of {feedbacks.length} items
                      </div>

                      {feedbacks.some(f => f.status === 'resolved') && (
                        <button
                          type="button"
                          onClick={handleClearResolvedFeedback}
                          className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-heading font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear Resolved</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Feedback Cards List */}
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {filteredFeedbacks.length === 0 ? (
                      <div className="text-center py-12 bg-[#161616] rounded-2xl border border-[#222] text-neutral-400 text-xs">
                        No feedback items match the selected filter.
                      </div>
                    ) : (
                      filteredFeedbacks.map((fb) => (
                        <div
                          key={fb.id}
                          className="bg-[#161616] p-4 sm:p-5 rounded-2xl border border-[#262626] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="font-heading font-bold text-white text-sm">
                                {fb.name || 'Anonymous Player'}
                              </span>
                              {fb.email && (
                                <span className="text-xs text-neutral-400 font-mono">
                                  ({fb.email})
                                </span>
                              )}
                              <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase ${
                                fb.type === 'Bug report'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : fb.type === 'Feature request'
                                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                  : 'bg-neutral-800 text-neutral-300'
                              }`}>
                                {fb.type}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < fb.rating ? 'text-[#FF9F1C] fill-[#FF9F1C]' : 'text-neutral-700'
                                  }`}
                                />
                              ))}
                              <span className="text-[11px] text-neutral-400 font-mono ml-1.5">
                                {new Date(fb.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-neutral-300 leading-relaxed bg-[#0D0D0D] p-3 rounded-xl border border-[#1F1F1F]">
                            "{fb.message}"
                          </p>

                          {/* Status and Action Buttons */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-neutral-400 font-semibold uppercase">Status:</span>
                              <div className="flex gap-1">
                                {(['new', 'reviewed', 'resolved'] as FeedbackStatus[]).map((st) => (
                                  <button
                                    key={st}
                                    onClick={() => handleUpdateFeedbackStatus(fb.id, st)}
                                    className={`px-2.5 py-1 rounded text-[10px] font-heading font-bold uppercase transition-colors cursor-pointer ${
                                      fb.status === st
                                        ? st === 'resolved'
                                          ? 'bg-emerald-500 text-black'
                                          : st === 'reviewed'
                                          ? 'bg-sky-500 text-black'
                                          : 'bg-[#FF9F1C] text-black'
                                        : 'bg-[#222] text-neutral-400 hover:text-white'
                                    }`}
                                  >
                                    {st}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteFeedback(fb.id)}
                              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* FULLSCREEN TACTICAL MAP PREVIEW MODAL */}
        <AnimatePresence>
          {selectedPreviewMap && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-[#111] border-2 border-[#333] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                <div className="bg-[#181818] p-4 border-b border-[#2B2B2B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#FF9F1C] text-black font-heading font-black text-xs uppercase">
                      {selectedPreviewMap.category}
                    </span>
                    <h4 className="font-heading font-black text-base text-white uppercase">
                      {selectedPreviewMap.name} (LIVE INSPECTION)
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedPreviewMap(null)}
                    className="p-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                  <div className="relative rounded-2xl overflow-hidden border border-[#333] bg-[#0A0A0A] aspect-video flex items-center justify-center shadow-inner">
                    <img
                      src={selectedPreviewMap.imageUrl}
                      alt={selectedPreviewMap.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-tactical-grid opacity-25 pointer-events-none" />

                    {/* HUD Safe Zone Circle Preview */}
                    <div className="absolute w-44 h-44 rounded-full border-2 border-dashed border-[#FF9F1C] bg-[#FF9F1C]/10 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-heading font-bold text-[#FF9F1C] bg-black/80 px-2 py-0.5 rounded">
                        ZONE 3 PREDICTION
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#161616] p-4 rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[11px] font-heading font-bold text-[#FF9F1C] uppercase block">
                        Drop Zones & Compounds
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPreviewMap.dropZones?.map((dz, i) => (
                          <span key={i} className="px-2 py-1 bg-[#222] text-neutral-300 rounded text-xs">
                            📍 {dz}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#161616] p-4 rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[11px] font-heading font-bold text-sky-400 uppercase block">
                        Choke Points & Intercept Paths
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPreviewMap.chokePoints?.map((cp, i) => (
                          <span key={i} className="px-2 py-1 bg-[#222] text-neutral-300 rounded text-xs">
                            ⚠️ {cp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed bg-[#161616] p-3 rounded-xl border border-[#262626]">
                    {selectedPreviewMap.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* IN-APP CONFIRMATION MODAL (100% IFRAME SAFE, NO BROWSER POPUPS) */}
        <AnimatePresence>
          {confirmDialog && confirmDialog.isOpen && (
            <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 15 }}
                className="w-full max-w-md bg-[#141414] border-2 border-[#2F2F2F] rounded-3xl p-6 shadow-2xl space-y-5"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-2xl shrink-0 ${
                    confirmDialog.confirmVariant === 'danger'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-[#FF9F1C]/20 text-[#FF9F1C] border border-[#FF9F1C]/30'
                  }`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-white text-base uppercase tracking-wide">
                      {confirmDialog.title}
                    </h4>
                    <span className="text-[10px] font-heading font-bold text-neutral-400 uppercase tracking-wider">
                      ADMIN ACTION CONFIRMATION
                    </span>
                  </div>
                </div>

                <div className="text-xs text-neutral-300 leading-relaxed bg-[#0A0A0A] p-4 rounded-2xl border border-[#222]">
                  {confirmDialog.message}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setConfirmDialog(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#222] hover:bg-[#2C2C2C] text-neutral-300 hover:text-white font-heading font-bold text-xs uppercase cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={confirmDialog.onConfirm}
                    className={`px-5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 transition-all ${
                      confirmDialog.confirmVariant === 'danger'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#FF9F1C] hover:bg-[#E58A00] text-black'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{confirmDialog.confirmText || 'Yes, Delete'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
