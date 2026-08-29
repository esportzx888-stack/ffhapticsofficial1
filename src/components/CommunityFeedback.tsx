import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Send,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FeedbackType, FeedbackItem } from '../types';

interface CommunityFeedbackProps {
  onFeedbackSubmit: (feedback: {
    name?: string;
    email?: string;
    type: FeedbackType;
    rating: number;
    message: string;
  }) => void;
}

export const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({ onFeedbackSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<FeedbackType>('General feedback');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const ratingLabels: Record<number, string> = {
    1: '1 Star — Needs Improvement',
    2: '2 Stars — Basic',
    3: '3 Stars — Good Potential',
    4: '4 Stars — Very Strong',
    5: '5 Stars — Elite Competitive Edge',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('Please enter your feedback message before sending.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      onFeedbackSubmit({
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        type,
        rating,
        message: message.trim(),
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#FF9F1C', '#FFFFFF', '#38BDF8'],
        });
      } catch {}

      // Reset fields
      setName('');
      setEmail('');
      setMessage('');
      setRating(5);
    }, 400);
  };

  return (
    <section id="feedback" className="py-24 bg-[#0D0D0D] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FF9F1C]/05 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Contact Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#2B2B2B] text-[#FF9F1C] text-xs font-heading font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CO-CREATING ESPORTS INTELLIGENCE</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-tight leading-tight">
              Built with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F1C] to-[#FFAE33]">
                the community.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base text-neutral-300 leading-relaxed">
              Every feature in FF TACTIX is shaped directly by IGLs, competitive coaches, and tournament champions across global Free Fire MAX servers.
            </p>

            {/* Contact Card */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-[#222222] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF9F1C]/15 text-[#FF9F1C] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-heading font-bold text-neutral-400 uppercase">Direct Support & Contact</div>
                  <a
                    href="mailto:tacticsff62@gmail.com"
                    className="text-base font-bold text-white hover:text-[#FF9F1C] transition-colors"
                  >
                    tacticsff62@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-xs text-neutral-400">
                For help, sponsorships, or business inquiries, email us directly at <strong className="text-neutral-200">tacticsff62@gmail.com</strong>
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#141414] p-4 rounded-xl border border-[#1F1F1F]">
                <div className="text-2xl font-heading font-bold text-[#FF9F1C]">99.4%</div>
                <div className="text-xs text-neutral-400 font-semibold uppercase">Feedback Resolved</div>
              </div>
              <div className="bg-[#141414] p-4 rounded-xl border border-[#1F1F1F]">
                <div className="text-2xl font-heading font-bold text-white">&lt; 24 hrs</div>
                <div className="text-xs text-neutral-400 font-semibold uppercase">Avg Response Time</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Feedback Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#141414] rounded-2xl p-6 sm:p-8 border border-[#222222] shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-5 border-b border-[#222222] mb-6">
                <div>
                  <h3 className="text-lg font-heading font-black text-white uppercase">
                    Submit Feedback & Feature Request
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Your insights go directly to our engineering & esports analytics team.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-[#FF9F1C]" />
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="feedback-name" className="block text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-300">
                      Name <span className="text-neutral-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="feedback-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vortex_IGL / Coach Alex"
                      className="w-full bg-[#1F1F1F] border border-[#2B2B2B] focus:border-[#FF9F1C] focus:ring-1 focus:ring-[#FF9F1C] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="feedback-email" className="block text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-300">
                      Email <span className="text-neutral-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.squad@esports.gg"
                      className="w-full bg-[#1F1F1F] border border-[#2B2B2B] focus:border-[#FF9F1C] focus:ring-1 focus:ring-[#FF9F1C] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Feedback Type Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="feedback-type" className="block text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-300">
                    Feedback Type <span className="text-[#FF9F1C]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="feedback-type"
                      value={type}
                      onChange={(e) => setType(e.target.value as FeedbackType)}
                      className="w-full bg-[#1F1F1F] border border-[#2B2B2B] focus:border-[#FF9F1C] focus:ring-1 focus:ring-[#FF9F1C] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="General feedback">General feedback</option>
                      <option value="Bug report">Bug report</option>
                      <option value="Feature request">Feature request</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* 5-Star Rating Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-300">
                      How does it feel? <span className="text-[#FF9F1C]">*</span>
                    </label>
                    <span className="text-xs font-mono text-[#FF9F1C] font-bold">
                      {ratingLabels[hoverRating || rating]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-[#1F1F1F] rounded-lg border border-[#2B2B2B]">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          id={`rating-star-${star}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 rounded transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${
                              isFilled
                                ? 'text-[#FF9F1C] fill-[#FF9F1C] drop-shadow-[0_0_8px_rgba(255,159,28,0.6)]'
                                : 'text-neutral-600'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Textarea for message */}
                <div className="space-y-1.5">
                  <label htmlFor="feedback-message" className="block text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-300">
                    Your Feedback / Idea <span className="text-[#FF9F1C]">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your idea, issue, or experience with FF TACTIX rotations, score command, or community scrims..."
                    className="w-full bg-[#1F1F1F] border border-[#2B2B2B] focus:border-[#FF9F1C] focus:ring-1 focus:ring-[#FF9F1C] rounded-lg p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors resize-y min-h-[100px]"
                  />
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Success Banner */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="font-heading uppercase block text-xs">Feedback Received!</strong>
                          <span>Thank you for making FF TACTIX sharper. Your report has been logged to the tactical review dashboard.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-xs text-neutral-400 hover:text-white px-2 py-1 cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="feedback-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded bg-[#FF9F1C] hover:bg-[#E58A00] text-black font-heading font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,159,28,0.3)] hover:shadow-[0_0_30px_rgba(255,159,28,0.5)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'SENDING INTEL...' : 'SEND FEEDBACK →'}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
