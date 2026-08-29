export type FeedbackType = 'General feedback' | 'Bug report' | 'Feature request';

export type FeedbackStatus = 'new' | 'reviewed' | 'resolved';

export interface FeedbackItem {
  id: string;
  name?: string;
  email?: string;
  type: FeedbackType;
  rating: number;
  message: string;
  timestamp: string;
  status: FeedbackStatus;
}

export interface ApkConfig {
  version: string;
  buildNumber: string;
  fileSize: string;
  minAndroid: string;
  releaseDate: string;
  downloadUrl: string;
  fileName: string;
  checksum: string;
  releaseNotes: string[];
}

export interface TacticalMapHotspot {
  id: string;
  name: string;
  x: number; // percentage (0-100) or coordinate
  y: number; // percentage (0-100) or coordinate
  type: 'drop' | 'choke' | 'loot' | 'sniper' | 'highground';
  notes?: string;
}

export interface TacticalMapItem {
  id: string;
  name: string;
  key: string; // 'bermuda' | 'purgatory' | 'alpine' | 'kalahari' | 'nexterra' | custom string
  category: 'official' | 'custom' | 'scrim' | 'tournament';
  imageUrl: string; // Base64 data URL or external image URL
  description: string;
  author?: string;
  dropZones: string[];
  chokePoints: string[];
  hotspots?: TacticalMapHotspot[];
  isCustom?: boolean;
  isDefault?: boolean;
  lastUpdated: string;
}

export interface MediaConfig {
  heroMockupImage: string;
  bermudaMapImage: string;
  purgatoryMapImage: string;
  alpineMapImage?: string;
  kalahariMapImage?: string;
  customBanners: {
    id: string;
    title: string;
    imageUrl: string;
    active: boolean;
  }[];
  tacticalMaps: TacticalMapItem[];
}

export interface SquadPlayer {
  id: string;
  ign: string;
  realName: string;
  role: 'IGL / Shot Caller' | 'Primary Rusher' | 'Sniper / Marksman' | 'Flanker / Support';
  avatar: string;
  kdRatio: number;
  headshotRate: string;
  favoriteGun: string;
}

export interface ScrimMatchScore {
  teamName: string;
  rank: number;
  kills: number;
  placementPoints: number;
  totalPoints: number;
  booyah: boolean;
}
