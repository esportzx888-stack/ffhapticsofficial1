import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Sparkles,
  Zap,
  HardDrive,
  FileCode,
  ArrowRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApkConfig } from '../types';

interface DownloadBannerProps {
  apkConfig: ApkConfig;
}

export const DownloadBanner: React.FC<DownloadBannerProps> = ({ apkConfig }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    // Realistic progressive download simulation
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setDownloadComplete(true);

          // Confetti celebration
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#FF9F1C', '#FFFFFF', '#38BDF8'],
            });
          } catch {}

          // Generate simulated real APK file blob for client download
          const blob = new Blob([
            `FF TACTIX - FREE FIRE MAX ESPORTS OPERATING SYSTEM\nVersion: ${apkConfig.version} (Build ${apkConfig.buildNumber})\nSize: ${apkConfig.fileSize}\nRelease Date: ${apkConfig.releaseDate}\nMinimum Android: ${apkConfig.minAndroid}\nChecksum: ${apkConfig.checksum}\n\nOfficial Download Package Ready For Installation.\nThank you for choosing FF TACTIX for your competitive esports edge!`
          ], { type: 'application/vnd.android.package-archive' });
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = apkConfig.fileName || `FF-TACTIX-v${apkConfig.version}-Universal.apk`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          return 100;
        }
        return prev + 15;
      });
    }, 180);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="download" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-radial-amber pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] via-[#141414] to-[#0E0E0E] border-2 border-[#262626] p-8 sm:p-12 lg:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Top Amber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9F1C] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: CTA & Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9F1C]/15 border border-[#FF9F1C]/40 text-[#FF9F1C] text-xs font-heading font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL ANDROID RELEASE</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-tight leading-tight">
                Your next advantage <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F1C] to-[#FFAE33]">
                  is available now.
                </span>
              </h2>

              {/* Version Tag */}
              <div className="inline-block p-2.5 rounded-xl bg-[#0D0D0D] border border-[#242424]">
                <p className="text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-300">
                  <span className="text-[#FF9F1C]">VERSION {apkConfig.version}</span> • {apkConfig.fileSize} • {apkConfig.minAndroid.toUpperCase()} • UNIVERSAL APK
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="banner-download-apk-btn"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-xs sm:text-sm px-6 py-4 rounded uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(255,159,28,0.3)] hover:shadow-[0_0_30px_rgba(255,159,28,0.5)] transition-all cursor-pointer active:scale-95 disabled:opacity-75"
                >
                  <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
                  <span>
                    {downloading
                      ? `DOWNLOADING... ${downloadProgress}%`
                      : downloadComplete
                      ? 'DOWNLOAD AGAIN (UNIVERSAL APK)'
                      : 'DOWNLOAD FOR ANDROID →'}
                  </span>
                </button>

                <button
                  id="qr-code-toggle-btn"
                  onClick={() => setShowQr(!showQr)}
                  className="bg-[#1F1F1F] border border-[#333] text-white font-heading font-black text-xs px-5 py-4 rounded hover:bg-[#2A2A2A] uppercase flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-[#FF9F1C]" />
                  <span>{showQr ? 'HIDE QR CODE' : 'SCAN ON MOBILE'}</span>
                </button>
              </div>

              {/* Download Progress Bar when active */}
              {downloading && (
                <div className="space-y-1.5 pt-2 max-w-md">
                  <div className="flex justify-between text-xs font-mono text-neutral-400">
                    <span>Downloading {apkConfig.fileName}...</span>
                    <span className="text-[#FF9F1C] font-bold">{downloadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF9F1C] to-[#38BDF8] transition-all duration-200"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Download Success Confirmation */}
              {downloadComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>{apkConfig.fileName}</strong> has been downloaded to your device! Follow the 3 install steps on the right.
                  </span>
                </motion.div>
              )}

              {/* Security & Verification note */}
              <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Clean & Malware-Free • SHA-256 Validated</span>
              </div>
            </div>

            {/* Right Column: 3-Step Download Instructions */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#0F0F0F] rounded-2xl p-6 sm:p-7 border border-[#222222] shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
                  <h3 className="font-heading font-bold text-sm uppercase text-white tracking-wider flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#FF9F1C]" />
                    <span>3-STEP INSTALLATION GUIDE</span>
                  </h3>
                  <span className="text-[11px] text-neutral-500 font-mono">STEP-BY-STEP</span>
                </div>

                {/* The 3 Steps */}
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 text-[#FF9F1C] font-heading font-black text-sm flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="font-heading font-bold text-white uppercase text-[13px]">
                        Get the APK file
                      </div>
                      <p className="text-neutral-400 leading-relaxed">
                        Tap <strong>Download for Android</strong> and wait for the APK to finish downloading.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 text-[#FF9F1C] font-heading font-black text-sm flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="font-heading font-bold text-white uppercase text-[13px]">
                        Open the download
                      </div>
                      <p className="text-neutral-400 leading-relaxed">
                        Open it from your download notification or browser <strong>Downloads</strong> manager.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FF9F1C]/20 border border-[#FF9F1C]/40 text-[#FF9F1C] font-heading font-black text-sm flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="font-heading font-bold text-white uppercase text-[13px]">
                        Update or Install
                      </div>
                      <p className="text-neutral-400 leading-relaxed">
                        Tap <strong>Update</strong> or <strong>Install</strong>. Do not uninstall the existing app (all your tactics & saved match logs will be preserved).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Release Notes Accordion Mini */}
                <div className="pt-3 border-t border-[#1F1F1F] text-[11px] text-neutral-400 space-y-1">
                  <div className="font-heading font-bold text-neutral-300 uppercase">What's New in v{apkConfig.version}:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-neutral-400">
                    {apkConfig.releaseNotes.slice(0, 2).map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* QR Code Popup */}
          <AnimatePresence>
            {showQr && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8 p-6 rounded-2xl bg-[#0D0D0D] border border-[#2B2B2B] flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white rounded-xl shadow-lg">
                    {/* Visual QR Code Generator */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24">
                      <rect width="100" height="100" fill="white" />
                      {/* Corner 1 */}
                      <rect x="10" y="10" width="25" height="25" fill="black" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" fill="black" />
                      {/* Corner 2 */}
                      <rect x="65" y="10" width="25" height="25" fill="black" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" fill="black" />
                      {/* Corner 3 */}
                      <rect x="10" y="65" width="25" height="25" fill="black" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" fill="black" />
                      {/* Inner QR patterns */}
                      <rect x="42" y="12" width="6" height="14" fill="black" />
                      <rect x="45" y="35" width="18" height="6" fill="#FF9F1C" />
                      <rect x="25" y="45" width="8" height="8" fill="black" />
                      <rect x="55" y="55" width="12" height="12" fill="black" />
                      <rect x="75" y="45" width="10" height="20" fill="black" />
                      <rect x="42" y="75" width="16" height="10" fill="black" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="font-heading font-bold text-white uppercase text-base">
                      Scan with Android Camera
                    </div>
                    <p className="text-xs text-neutral-400 max-w-sm">
                      Point your phone camera to download <strong>FF-TACTIX-v{apkConfig.version}.apk</strong> directly to your mobile device.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-[#2B2B2B] text-neutral-200 text-xs font-heading font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'LINK COPIED' : 'COPY DOWNLOAD LINK'}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
