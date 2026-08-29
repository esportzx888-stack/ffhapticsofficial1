import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureShowcase } from './components/FeatureShowcase';
import { DownloadBanner } from './components/DownloadBanner';
import { CommunityFeedback } from './components/CommunityFeedback';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { InteractiveAppExplorer } from './components/InteractiveAppExplorer';
import {
  FeedbackItem,
  ApkConfig,
  MediaConfig,
  FeedbackType,
} from './types';
import {
  getStoredFeedbacks,
  saveFeedbacks,
  addFeedback,
  getStoredApkConfig,
  saveApkConfig,
  getStoredMediaConfig,
  saveMediaConfig,
} from './utils/storage';

export default function App() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [apkConfig, setApkConfig] = useState<ApkConfig>(getStoredApkConfig());
  const [mediaConfig, setMediaConfig] = useState<MediaConfig>(getStoredMediaConfig());
  
  // Modals state
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [explorerModalOpen, setExplorerModalOpen] = useState(false);

  // Notification / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setFeedbacks(getStoredFeedbacks());
    setApkConfig(getStoredApkConfig());
    setMediaConfig(getStoredMediaConfig());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminTrigger = () => {
    setAdminModalOpen(true);
  };

  const handleFeedbackSubmit = (newFeedback: {
    name?: string;
    email?: string;
    type: FeedbackType;
    rating: number;
    message: string;
  }) => {
    const saved = addFeedback(newFeedback);
    setFeedbacks(getStoredFeedbacks());
    showToast('Feedback submitted successfully! Thank you for supporting FF TACTIX.');
  };

  const handleUpdateFeedbacks = (updated: FeedbackItem[]) => {
    setFeedbacks(updated);
    saveFeedbacks(updated);
  };

  const handleUpdateApkConfig = (newConfig: ApkConfig) => {
    setApkConfig(newConfig);
    saveApkConfig(newConfig);
    showToast(`APK Release configuration updated to v${newConfig.version}!`);
  };

  const handleUpdateMediaConfig = (newMedia: MediaConfig) => {
    setMediaConfig(newMedia);
    saveMediaConfig(newMedia);
    showToast('Media photos and custom assets updated!');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col selection:bg-[#FF9F1C] selection:text-black">
      
      {/* Top Header */}
      <Header
        onAdminTrigger={handleAdminTrigger}
        onNavigate={handleNavigate}
      />

      {/* Main Page Body */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero
          apkConfig={apkConfig}
          mediaConfig={mediaConfig}
          onDownloadClick={() => handleNavigate('download')}
          onExploreClick={() => setExplorerModalOpen(true)}
        />

        {/* 2. Feature Showcase Section */}
        <FeatureShowcase mediaConfig={mediaConfig} />

        {/* 3. Android Download Banner */}
        <DownloadBanner apkConfig={apkConfig} />

        {/* 4. Community Feedback Section */}
        <CommunityFeedback onFeedbackSubmit={handleFeedbackSubmit} />

      </main>

      {/* 5. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onAdminTrigger={handleAdminTrigger}
      />

      {/* Hidden Admin Modal (Triggered by 5 taps on Logo) */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        feedbacks={feedbacks}
        apkConfig={apkConfig}
        mediaConfig={mediaConfig}
        onUpdateFeedbacks={handleUpdateFeedbacks}
        onUpdateApkConfig={handleUpdateApkConfig}
        onUpdateMediaConfig={handleUpdateMediaConfig}
      />

      {/* Interactive App Explorer Modal (Triggered by 'Explore the App ▶') */}
      <InteractiveAppExplorer
        isOpen={explorerModalOpen}
        onClose={() => setExplorerModalOpen(false)}
        mediaConfig={mediaConfig}
        onDownloadClick={() => {
          setExplorerModalOpen(false);
          handleNavigate('download');
        }}
      />

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-[#FF9F1C]/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-heading font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FF9F1C] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
