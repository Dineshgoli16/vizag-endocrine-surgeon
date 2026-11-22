import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare, Sparkles, ChevronRight, Check } from 'lucide-react';

interface WhatsAppFloatingWidgetProps {
  language?: 'en' | 'te';
}

export default function WhatsAppFloatingWidget({ language = 'en' }: WhatsAppFloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const isTelugu = language === 'te';

  const quickTopics = [
    {
      id: 'maharanipeta',
      title: isTelugu ? 'మహారాణిపేట క్లినిక్ బుకింగ్ (5-7 PM)' : 'Maharanipeta Clinic (5–7 PM)',
      subtitle: isTelugu ? 'వెంకటేశ్వర వాస్కులర్ ఫౌండేషన్' : 'Venkateshwara Vascular Foundation',
      text: 'Hello Dr. Dinesh Goli, I would like to book a consultation at your Maharanipeta Clinic (5:00 PM - 7:00 PM). Patient Name: '
    },
    {
      id: 'apollo',
      title: isTelugu ? 'అపోలో హెల్త్ సిటీ బుకింగ్ (1-4 PM)' : 'Apollo Health City (1–4 PM)',
      subtitle: isTelugu ? 'అరిలోవ, విశాఖపట్నం' : 'Arilova, Visakhapatnam',
      text: 'Hello Dr. Dinesh Goli, I would like to schedule an appointment at Apollo Health City, Arilova (1:00 PM - 4:00 PM). Patient Name: '
    },
    {
      id: 'toetva',
      title: isTelugu ? 'స్కార్‌లెస్ థైరాయిడ్ సర్జరీ (TOETVA)' : 'Scarless TOETVA Thyroid Inquiry',
      subtitle: isTelugu ? 'మెడపై మచ్చలేని సర్జరీ వివరాలు' : 'Zero neck scar procedure details',
      text: 'Hello Dr. Dinesh Goli, I am inquiring about Scarless TOETVA Thyroid Surgery (zero neck scar). Please share details and evaluation process.'
    },
    {
      id: 'reports',
      title: isTelugu ? 'రిపోర్ట్‌లు పంపండి (Second Opinion)' : 'Send Reports for 2nd Opinion',
      subtitle: isTelugu ? 'అల్ట్రాసౌండ్ & బయాప్సీ పరిశీలన' : 'Ultrasound, FNAC or Mammogram',
      text: 'Hello Dr. Dinesh Goli, I would like to share my Thyroid / Breast ultrasound and biopsy report for your clinical second opinion.'
    }
  ];

  const handleLaunchWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/916300550392?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleLaunchWhatsApp(customMsg);
    setCustomMsg('');
  };

  return (
    <>
      {/* Floating Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 sm:left-6 z-40 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/images/dr-dinesh-primary.jpeg"
                    alt="Dr. Dinesh Goli"
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/60 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero-photo.jpg';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm leading-tight">
                    Dr. Dinesh Goli Desk
                  </h4>
                  <p className="text-[11px] text-white/80 font-sans flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    {isTelugu ? 'ఆన్‌లైన్ • త్వరిత స్పందన' : 'Online • Quick Response'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close WhatsApp Menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 max-h-[380px]">
              <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-xs text-slate-700 leading-relaxed font-sans">
                {isTelugu 
                  ? 'నమస్కారం! డాక్టర్ దినేష్ గోలి గారి క్లినిక్ డెస్క్‌కు స్వాగతం. కింది అంశాలలో ఒకదాన్ని ఎంచుకోండి లేదా నేరుగా సందేశం పంపండి:'
                  : 'Namaskaram! Welcome to Dr. Dinesh Goli\'s clinical WhatsApp desk. Select a quick consultation topic below to start chatting immediately:'}
              </div>

              <div className="space-y-2">
                {quickTopics.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLaunchWhatsApp(item.text)}
                    className="w-full text-left p-3 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-sm group flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-medical-blue group-hover:text-emerald-800 font-sans transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* Direct Custom Message Input */}
              <form onSubmit={handleSendCustom} className="pt-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder={isTelugu ? 'మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి...' : 'Type custom query here...'}
                    className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-sans shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={!customMsg.trim()}
                    className="absolute right-1.5 w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
                    aria-label="Send via WhatsApp"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Footer */}
            <div className="p-3 bg-white border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-medium">
                Official Helpline: +91 6300550392 / +91 9133685222
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Bottom-Left) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-700 border-2 border-white transition-all cursor-pointer group"
        aria-label="Open WhatsApp Desk"
      >
        <div className="relative">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 68.9 27.1 106.1 27.1h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? (isTelugu ? 'మూసివేయి' : 'Close') : (isTelugu ? 'వాట్సాప్ డెస్క్' : 'WhatsApp Desk')}
        </span>
      </motion.button>
    </>
  );
}
