import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, ShieldCheck, Eye, Activity, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScarlessComparison({ onBookClick }: { onBookClick: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState<'toetva' | 'traditional'>('toetva');

  return (
    <section id="scarless" className="py-20 lg:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
      {/* Decorative aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-medical-teal/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-medical-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
            Advanced Aesthetic Surgery in Vizag
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            Scarless TOETVA vs Traditional Thyroid Surgery
          </h2>
          <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
            Experience the future of thyroid surgery with Transoral Endoscopic Thyroidectomy Vestibular Approach (TOETVA) performed by Dr. Dinesh Goli in Visakhapatnam.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-gray-200 mt-8 shadow-inner">
            <button
              onClick={() => setSelectedMethod('toetva')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedMethod === 'toetva'
                  ? 'bg-medical-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-medical-blue'
              }`}
            >
              <Sparkles size={14} className={selectedMethod === 'toetva' ? 'text-medical-gold' : ''} />
              Scarless TOETVA (Zero Neck Scar)
            </button>
            <button
              onClick={() => setSelectedMethod('traditional')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedMethod === 'traditional'
                  ? 'bg-medical-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-medical-blue'
              }`}
            >
              Traditional Open Surgery
            </button>
          </div>
        </div>

        {/* Comparison Showcase Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200 card-shadow">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {selectedMethod === 'toetva' ? (
                <motion.div
                  key="toetva-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-medical-teal text-xs font-bold uppercase tracking-wider">
                      Zero Visible Neck Scars
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">• Transoral Vestibular Route</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-medical-blue">
                    Zero Cut on the Neck with 4K Endoscopic Precision
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    Three micro-incisions are hidden completely inside the lower lip mucosa. Using specialized endoscopes and instruments, Dr. Dinesh Goli navigates behind the skin directly to the thyroid gland, leaving your neck completely unscarred.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-medical-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">0 cm Visible Neck Scar</h4>
                        <p className="text-xs text-slate-500 mt-1">Oral incisions heal rapidly within days without external trace.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <Eye size={18} className="text-medical-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">High-Definition View</h4>
                        <p className="text-xs text-slate-500 mt-1">Magnifies recurrent laryngeal nerves and parathyroids for superior voice and calcium preservation.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <ShieldCheck size={18} className="text-medical-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">Equal Oncological Safety</h4>
                        <p className="text-xs text-slate-500 mt-1">Full removal of thyroid lobes for benign nodules and selected cancers.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <Activity size={18} className="text-medical-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">Faster Social Recovery</h4>
                        <p className="text-xs text-slate-500 mt-1">No neck dressing or visible tape needed; resume daily life with confidence.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="traditional-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                      Standard Open Technique
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">• Collar Neck Incision</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-medical-blue">
                    Conventional Thyroidectomy via Cervical Incision
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    Conventional thyroidectomy involves a 5 to 8 cm horizontal cut across the anterior lower neck skin crease. While a trusted approach, it leaves a permanent visible scar on the throat.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">!</span>
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">5-8 cm Visible Neck Scar</h4>
                        <p className="text-xs text-slate-500 mt-1">Leaves a permanent mark on the lower neck requiring cosmetic care.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">!</span>
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">Risk of Keloid / Hypertrophic Scar</h4>
                        <p className="text-xs text-slate-500 mt-1">Prone individuals may develop thicker, noticeable scars.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-medical-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">Direct Surgical Access</h4>
                        <p className="text-xs text-slate-500 mt-1">Best suited for exceptionally large retrosternal goiters or advanced invasive cancers.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3">
                      <HeartHandshake size={18} className="text-medical-teal mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-xs text-medical-blue uppercase tracking-wide">Reliable Clinical Option</h4>
                        <p className="text-xs text-slate-500 mt-1">Subcuticular closure and scar minimization techniques applied by Dr. Dinesh.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Comparison Summary Matrix */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-widest text-medical-teal mb-6 pb-2 border-b border-gray-100">
              Quick Comparison Guide
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Visible Neck Scar:</span>
                <span className={`font-bold ${selectedMethod === 'toetva' ? 'text-medical-teal' : 'text-amber-700'}`}>
                  {selectedMethod === 'toetva' ? '0 cm (Zero Scar)' : '5 – 8 cm Permanent Cut'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Incision Location:</span>
                <span className="font-bold text-medical-blue">
                  {selectedMethod === 'toetva' ? 'Inside Lower Lip (Hidden)' : 'Front of Neck'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Visualization:</span>
                <span className="font-bold text-medical-blue">
                  {selectedMethod === 'toetva' ? '4K Magnified Endoscopy' : 'Direct Vision + Loupes'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-slate-500 font-medium">RLN Nerve Monitoring:</span>
                <span className="font-bold text-medical-teal flex items-center gap-1">
                  <CheckCircle2 size={13} /> Integrated IONM
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-slate-500 font-medium">Typical Hospital Stay:</span>
                <span className="font-bold text-medical-blue">24 to 48 Hours</span>
              </div>

              <div className="flex justify-between items-center py-2.5">
                <span className="text-slate-500 font-medium">Ideal For:</span>
                <span className="font-bold text-medical-blue text-right max-w-[200px]">
                  {selectedMethod === 'toetva'
                    ? 'Cosmetically conscious patients, nodules < 5cm'
                    : 'Very large retrosternal goiters'}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={onBookClick}
                className="w-full py-3.5 px-6 rounded-xl bg-medical-blue text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-colors shadow-lg shadow-medical-blue/20 cursor-pointer"
              >
                Check TOETVA Candidacy <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
