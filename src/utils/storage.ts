import { FeedbackItem, ApkConfig, MediaConfig, TacticalMapItem } from '../types';

const FEEDBACK_STORAGE_KEY = 'ff_tactix_feedbacks';
const APK_STORAGE_KEY = 'ff_tactix_apk_config';
const MEDIA_STORAGE_KEY = 'ff_tactix_media_config';

export const DEFAULT_APK_CONFIG: ApkConfig = {
  version: '1.1.5',
  buildNumber: '1154',
  fileSize: '94 MB',
  minAndroid: 'Android 7.0+',
  releaseDate: '2026-08-20',
  downloadUrl: 'https://cdn.fftactix.com/releases/FF-TACTIX-v1.1.5-universal.apk',
  fileName: 'FF-TACTIX-v1.1.5-Universal.apk',
  checksum: 'SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  releaseNotes: [
    'Added real-time Bermuda & Alpine circle prediction overlay',
    'Interactive squad loadout sync & role assignments',
    'Ultra-low latency scrim chat channels with global room codes',
    'Fixed crash during high-resolution map zoom'
  ]
};

export const DEFAULT_FEEDBACKS: FeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Vortex_IGL',
    email: 'vortex.esports@gmail.com',
    type: 'Feature request',
    rating: 5,
    message: 'The Bermuda rotation plotter saved us 3 wipeouts in yesterday’s qualifiers! Would love if we could export tactical routes directly as MP4 animations for our YouTube VOD reviews.',
    timestamp: '2026-08-27T14:30:00Z',
    status: 'new'
  },
  {
    id: 'fb-2',
    name: 'ShadowSniper99',
    email: 'shadow@proscrims.io',
    type: 'General feedback',
    rating: 5,
    message: 'Incredible UI design. Dark mode with amber accents looks super clean on AMOLED displays. Runs butter smooth on my ROG Phone.',
    timestamp: '2026-08-26T18:15:00Z',
    status: 'reviewed'
  },
  {
    id: 'fb-3',
    name: 'Coach Rex',
    email: 'rex.teamomega@gg.com',
    type: 'Bug report',
    rating: 4,
    message: 'Score command leaderboard worked flawlessly for all 6 scrim rounds. One tiny note: Purgatory drop pin marker colors reset if app goes to background for more than 5 minutes.',
    timestamp: '2026-08-25T09:40:00Z',
    status: 'reviewed'
  }
];

export const DEFAULT_TACTICAL_MAPS: TacticalMapItem[] = [
  {
    id: 'map-bermuda-max',
    name: 'Bermuda MAX',
    key: 'bermuda',
    category: 'official',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    description: 'The premier Free Fire MAX esports battleground. Features high-ground control at Peak, hot drop combat at Clock Tower and Factory, and strategic compound rotations.',
    author: 'Garena Esports Official',
    dropZones: ['Clock Tower (West)', 'Peak High Plateau', 'Factory Compound', 'Pochinok Downtown', 'Bimasakti Strip'],
    chokePoints: ['Bimasakti River Bridge', 'Peak South Slope', 'Factory Trench', 'Graveyard Ridge'],
    hotspots: [
      { id: 'h1', name: 'Clock Tower', x: 20, y: 45, type: 'drop', notes: 'High Tier Armor & Gloo Walls' },
      { id: 'h2', name: 'Peak High Ground', x: 58, y: 46, type: 'highground', notes: 'Optimal Zone 3 & 4 Dominance' },
      { id: 'h3', name: 'Factory Complex', x: 32, y: 78, type: 'drop', notes: 'Close Quarters Hot Drop' },
      { id: 'h4', name: 'Bimasakti Strip', x: 44, y: 48, type: 'choke', notes: 'Bridge and trench intercept point' },
      { id: 'h5', name: 'Mill Sniper Cliff', x: 80, y: 22, type: 'sniper', notes: 'Elevated AWM Angle' },
    ],
    isCustom: false,
    isDefault: true,
    lastUpdated: '2026-08-28T00:00:00Z',
  },
  {
    id: 'map-purgatory-pro',
    name: 'Purgatory Pro',
    key: 'purgatory',
    category: 'official',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep river valleys, sweeping mountain roads, and intense city warfare centered around Brasilia and Central.',
    author: 'FFWS Scrim League',
    dropZones: ['Brasilia Central City', 'Marbleworks Factory', 'Central High Rise', 'Moathouse Island', 'Campsite East'],
    chokePoints: ['Brasilia Main Bridge', 'River Crossing North', 'Fields Canal', 'Lumber Mill Pass'],
    hotspots: [
      { id: 'hp1', name: 'Brasilia', x: 50, y: 50, type: 'drop', notes: 'High combat frequency center' },
      { id: 'hp2', name: 'Marbleworks', x: 25, y: 30, type: 'loot', notes: 'Heavy weapon supply crates' },
      { id: 'hp3', name: 'Moathouse', x: 82, y: 18, type: 'sniper', notes: 'Water isolated sniper nest' },
      { id: 'hp4', name: 'Central', x: 40, y: 70, type: 'highground', notes: 'Compound gatekeeping' },
    ],
    isCustom: false,
    isDefault: true,
    lastUpdated: '2026-08-28T00:00:00Z',
  },
  {
    id: 'map-alpine-snow',
    name: 'Alpine Sub-Zero',
    key: 'alpine',
    category: 'official',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    description: 'Glacial topography with multi-level industrial complexes, alpine cable cars, and dense forest flanking routes.',
    author: 'Garena Esports Official',
    dropZones: ['Militia Headquarters', 'Sunside Compound', 'Snowfall Valley', 'Railroad Station', 'Forest Red'],
    chokePoints: ['Glacier Bridge', 'Railroad Overpass', 'Sunside Chasm', 'Militia Ridge'],
    hotspots: [
      { id: 'ha1', name: 'Militia Base', x: 48, y: 42, type: 'drop', notes: 'Bunker loot and elevated roofs' },
      { id: 'ha2', name: 'Snowfall', x: 22, y: 65, type: 'choke', notes: 'Valley intercept corridor' },
      { id: 'ha3', name: 'Railroad', x: 75, y: 55, type: 'loot', notes: 'High tier vehicle spawns' },
    ],
    isCustom: false,
    isDefault: true,
    lastUpdated: '2026-08-28T00:00:00Z',
  },
  {
    id: 'map-kalahari-desert',
    name: 'Kalahari Dunes',
    key: 'kalahari',
    category: 'official',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    description: 'Arid desert landscape defined by vertical high ground at Refinery, canyon skirmishes, and rapid zip-line rotations.',
    author: 'FFWS Scrim League',
    dropZones: ['Refinery High Tower', 'Council Hall', 'Santa Catarina Wreck', 'Foundation Ruins', 'Submarine Hill'],
    chokePoints: ['Refinery Ascent Zipline', 'Canyon Pass', 'Shrine Basin', 'Old Hampton Choke'],
    hotspots: [
      { id: 'hk1', name: 'Refinery', x: 52, y: 48, type: 'highground', notes: 'Supreme vertical superiority' },
      { id: 'hk2', name: 'Santa Catarina', x: 25, y: 35, type: 'loot', notes: 'Shipwreck tier 3 loot' },
      { id: 'hk3', name: 'Council Hall', x: 68, y: 72, type: 'drop', notes: 'Close quarters urban maze' },
    ],
    isCustom: false,
    isDefault: true,
    lastUpdated: '2026-08-28T00:00:00Z',
  },
  {
    id: 'map-nexterra-cyber',
    name: 'NeXTerra 2.0',
    key: 'nexterra',
    category: 'official',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    description: 'Futuristic battlefield with anti-gravity zones at Grav Labs, portal corridors, and hyper-structured urban complexes.',
    author: 'Garena Esports Official',
    dropZones: ['Grav Labs (Zero-G)', 'Intellect Center', 'Decapolation City', 'Mud Site', 'Farmtopia'],
    chokePoints: ['Portal Transit Hub', 'Grav Lab Ramp', 'Decapolation Underpass'],
    hotspots: [
      { id: 'hn1', name: 'Grav Labs', x: 45, y: 40, type: 'drop', notes: 'Anti-gravity combat arena' },
      { id: 'hn2', name: 'Intellect Center', x: 60, y: 65, type: 'highground', notes: 'High density smart cover' },
    ],
    isCustom: false,
    isDefault: true,
    lastUpdated: '2026-08-28T00:00:00Z',
  }
];

export const DEFAULT_MEDIA_CONFIG: MediaConfig = {
  heroMockupImage: '', // If empty, interactive vector SVG mockup is rendered
  bermudaMapImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  purgatoryMapImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  alpineMapImage: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
  kalahariMapImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  customBanners: [
    {
      id: 'ban-1',
      title: 'FFWS Season 2026 Tactical Blueprint Pack Available Now',
      imageUrl: '',
      active: true
    }
  ],
  tacticalMaps: DEFAULT_TACTICAL_MAPS
};

export function getStoredFeedbacks(): FeedbackItem[] {
  try {
    const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!data) return DEFAULT_FEEDBACKS;
    return JSON.parse(data);
  } catch {
    return DEFAULT_FEEDBACKS;
  }
}

export function saveFeedbacks(feedbacks: FeedbackItem[]): void {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbacks));
  } catch (err) {
    console.error('Failed to save feedbacks to localStorage', err);
  }
}

export function addFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp' | 'status'>): FeedbackItem {
  const current = getStoredFeedbacks();
  const newItem: FeedbackItem = {
    ...feedback,
    id: `fb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    status: 'new'
  };
  const updated = [newItem, ...current];
  saveFeedbacks(updated);
  return newItem;
}

export function getStoredApkConfig(): ApkConfig {
  try {
    const data = localStorage.getItem(APK_STORAGE_KEY);
    if (!data) return DEFAULT_APK_CONFIG;
    return { ...DEFAULT_APK_CONFIG, ...JSON.parse(data) };
  } catch {
    return DEFAULT_APK_CONFIG;
  }
}

export function saveApkConfig(config: ApkConfig): void {
  try {
    localStorage.setItem(APK_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save apk config to localStorage', err);
  }
}

export function getStoredMediaConfig(): MediaConfig {
  try {
    const data = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (!data) return DEFAULT_MEDIA_CONFIG;
    const parsed = JSON.parse(data);
    
    // Ensure tacticalMaps array is populated and correctly saved
    let tacticalMaps: TacticalMapItem[] = DEFAULT_TACTICAL_MAPS;
    if (parsed && Array.isArray(parsed.tacticalMaps)) {
      tacticalMaps = parsed.tacticalMaps;
    }

    return {
      ...DEFAULT_MEDIA_CONFIG,
      ...parsed,
      tacticalMaps
    };
  } catch {
    return DEFAULT_MEDIA_CONFIG;
  }
}

export function saveMediaConfig(config: MediaConfig): void {
  try {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save media config to localStorage', err);
  }
}
