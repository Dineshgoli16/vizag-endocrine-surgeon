import React, { useState } from 'react';
import { Activity, ShieldCheck, Eye, CheckCircle2, ChevronRight, Stethoscope, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Structure {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  icon: string;
  color: string;
  function: string;
  clinicalConcern: string;
  surgicalPreservation: string;
  facts: string[];
}

const STRUCTURES: Structure[] = [
  {
    id: 'thyroid',
    name: 'Thyroid Gland',
    subtitle: 'Endocrine powerhouse regulating overall body metabolism',
    badge: 'Hormone Gland',
    icon: '🦋',
    color: 'border-teal-500 bg-teal-50 text-teal-800',
    function: 'Produces thyroxine (T4) and triiodothyronine (T3) hormones that regulate body energy, heart rate, temperature, and cellular metabolism.',
    clinicalConcern: 'Nodules, multinodular goiters, hyperthyroidism (Graves disease), and differentiated thyroid carcinomas (Papillary & Follicular).',
    surgicalPreservation: 'Dr. Dinesh performs precision lobectomy (preserving half the gland so patients do not need synthetic tablets) or total thyroidectomy with Zero Neck Scar TOETVA.',
    facts: [
      'Weighs only about 20-25 grams in healthy adults',
      'Over 90% of solitary thyroid nodules are non-cancerous',
      'Nerve-monitoring ensures 100% vocal cord preservation'
    ]
  },
  {
    id: 'parathyroid',
    name: 'Parathyroid Glands',
    subtitle: 'Four microscopic glands governing calcium homeostasis',
    badge: 'Calcium Regulators',
    icon: '⚡',
    color: 'border-amber-500 bg-amber-50 text-amber-800',
    function: 'Maintains precise blood calcium levels strictly between 8.5 to 10.2 mg/dL by releasing Parathyroid Hormone (PTH) to mobilize calcium from bones and kidneys.',
    clinicalConcern: 'Parathyroid adenoma causing primary hyperparathyroidism, recurrent painful kidney stones, severe osteopenia/osteoporosis, and chronic brain fog.',
    surgicalPreservation: 'During every thyroidectomy, all 4 parathyroid glands and their hairline feeding vessels are meticulously visualized and preserved. If an adenoma is present, focused minimally invasive removal provides a permanent cure.',
    facts: [
      'Each gland is the size of a single grain of rice (3-4 mm)',
      'Hidden directly along the back surface of thyroid lobes',
      'Over 98% cure rate with focused mini-incision surgery'
    ]
  },
  {
    id: 'rln',
    name: 'Recurrent Laryngeal Nerve (RLN)',
    subtitle: 'Crucial vocal cord nerve requiring 100% intraoperative protection',
    badge: 'Voice Safety',
    icon: '🛡️',
    color: 'border-blue-500 bg-blue-50 text-blue-800',
    function: 'Branches off the vagus nerve and loops under the aortic arch/subclavian artery to supply motor signals to the vocal cords inside your voice box (larynx).',
    clinicalConcern: 'Traction or thermal damage can cause permanent hoarseness, loss of vocal pitch, and breathing difficulty.',
    surgicalPreservation: 'Dr. Dinesh Goli utilizes routine Intraoperative Nerve Monitoring (IONM). Micro-electric stimulation confirms nerve integrity with visual and acoustic waveforms before closing.',
    facts: [
      'Travels millimeters from the posterior capsule of the thyroid',
      'Continuous neural stimulation verifies conductivity in real-time',
      'Critical for teachers, singers, and all speaking professionals'
    ]
  },
  {
    id: 'lymph',
    name: 'Neck Lymph Nodes (Level VI & Lateral)',
    subtitle: 'Critical immune filtration network in endocrine oncology',
    badge: 'Oncological Clearance',
    icon: '⬡',
    color: 'border-purple-500 bg-purple-50 text-purple-800',
    function: 'Acts as first-line biological filters surrounding the trachea and neck veins, trapping thyroid cancer cells and preventing systemic spread.',
    clinicalConcern: 'Papillary thyroid carcinoma frequently spreads to central neck nodes (Level VI) even when invisible on pre-op scans.',
    surgicalPreservation: 'Systematic Central Compartment Neck Dissection is performed meticulously alongside the thyroid without injuring the recurrent nerve or parathyroid glands.',
    facts: [
      'Central compartment (Level VI) nodes sit directly behind the thyroid',
      'Clearance prevents recurrent surgery in the future',
      'Performed with magnifying loupes for delicate precision'
    ]
  }
];

export default function AnatomyExplorer({ onBookClick }: { onBookClick: () => void }) {
  const [selectedId, setSelectedId] = useState<string>('thyroid');
  const active = STRUCTURES.find(s => s.id === selectedId)!;

  return (
    <section id="anatomy" className="py-20 lg:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
            Visual Educational Explorer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            Understanding Neck & Gland Anatomy
          </h2>
          <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
            Click on any anatomical structure below to see how Dr. Dinesh Goli safeguards delicate nerves, calcium glands, and vocal functions during precision surgery.
          </p>

          {/* Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {STRUCTURES.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedId === s.id
                    ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20 scale-105'
                    : 'bg-slate-50 text-slate-600 hover:text-medical-blue border border-slate-200'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Anatomy Display Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch bg-slate-50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 card-shadow">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${active.color}`}>
                    {active.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• Precision Micro-Anatomy</span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-medical-blue mb-2">
                    {active.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans">
                    {active.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-medical-teal uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Activity size={15} /> Biological Function
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {active.function}
                    </p>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Stethoscope size={15} /> Clinical Conditions & Risks
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {active.clinicalConcern}
                    </p>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-medical-blue uppercase tracking-wider mb-1 flex items-center gap-2">
                      <ShieldCheck size={15} /> Dr. Dinesh Goli's Surgical Protocol
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {active.surgicalPreservation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Highlights & Fast Facts */}
          <div className="lg:col-span-5 bg-gradient-to-br from-medical-blue to-medical-blue-dark text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-medical-gold">
                  Anatomical Highlights
                </span>
                <span className="text-2xl">{active.icon}</span>
              </div>

              <h4 className="font-serif font-bold text-xl text-white mb-4">
                Key Clinical Takeaways
              </h4>

              <div className="space-y-3 mb-8">
                {active.facts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs text-white/90 leading-relaxed">
                    <CheckCircle2 size={16} className="text-medical-gold mt-0.5 flex-shrink-0" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-medical-teal/30 border border-medical-teal/40 text-xs text-white/90 leading-relaxed">
                <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-medical-gold" /> Personalized Assessment
                </p>
                Have a scan showing a nodule or swelling near this area? Book an in-person clinical review.
              </div>
            </div>

            <button
              onClick={onBookClick}
              className="mt-6 w-full py-3.5 px-6 rounded-xl bg-medical-gold text-medical-blue-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all shadow-md cursor-pointer"
            >
              Consult Dr. Dinesh on This Condition <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
