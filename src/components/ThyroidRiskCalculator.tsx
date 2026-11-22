import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Stethoscope, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TIRADS_LEVELS = [
  {
    score: 'TIRADS 1',
    title: 'Benign (Normal / Simple Cyst)',
    risk: '< 0.3%',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    riskBar: 'w-[3%] bg-emerald-500',
    criteria: 'A purely cystic lesion or normal thyroid parenchyma with no suspicious microcalcifications or solid areas.',
    management: 'No biopsy (FNAC) or surgery required. Routine preventive health checks.'
  },
  {
    score: 'TIRADS 2',
    title: 'Not Suspicious',
    risk: '< 1.5%',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    riskBar: 'w-[5%] bg-emerald-500',
    criteria: 'Spongiform nodule or mixed cystic-solid nodule with smooth borders and regular architecture.',
    management: 'No FNAC required unless symptomatic (> 3 cm causing pressure). Clinical follow-up in 12-24 months.'
  },
  {
    score: 'TIRADS 3',
    title: 'Mildly Suspicious',
    risk: '~ 5%',
    color: 'bg-blue-50 text-blue-800 border-blue-300',
    riskBar: 'w-[15%] bg-blue-500',
    criteria: 'Isoechoic or hyperechoic solid nodule with regular margins and no high-risk features.',
    management: 'FNAC recommended only if nodule size is ≥ 2.5 cm. Otherwise, annual ultrasound surveillance.'
  },
  {
    score: 'TIRADS 4',
    title: 'Moderately Suspicious',
    risk: '10% – 20%',
    color: 'bg-amber-50 text-amber-800 border-amber-300',
    riskBar: 'w-[40%] bg-amber-500',
    criteria: 'Hypoechoic solid nodule with 1 or 2 features: lobulated margins, taller-than-wide, or punctate calcifications.',
    management: 'Image-guided FNAC recommended if size is ≥ 1.5 cm. Expert surgical consultation advised by Dr. Dinesh Goli.'
  },
  {
    score: 'TIRADS 5',
    title: 'Highly Suspicious',
    risk: '> 70% – 90%',
    color: 'bg-red-50 text-red-800 border-red-300',
    riskBar: 'w-[90%] bg-red-600',
    criteria: 'Marked hypoechogenicity, irregular borders, taller-than-wide shape, microcalcifications, or extra-thyroidal extension.',
    management: 'Urgent FNAC if ≥ 1.0 cm. Definitive surgical resection (Total/Hemi Thyroidectomy with nerve monitoring) indicated.'
  }
];

const BETHESDA_LEVELS = [
  {
    cat: 'Bethesda I',
    title: 'Non-Diagnostic / Unsatisfactory',
    risk: '5% – 10%',
    color: 'bg-slate-50 text-slate-800 border-slate-300',
    action: 'Inadequate cell count or obscuring blood. Repeat ultrasound-guided FNAC in 4-6 weeks.'
  },
  {
    cat: 'Bethesda II',
    title: 'Benign (Colloid Nodule / Thyroiditis)',
    risk: '0% – 3%',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    action: 'Overwhelmingly non-cancerous. Surgery only needed if nodule causes pressure on breathing or cosmetic bulging.'
  },
  {
    cat: 'Bethesda III',
    title: 'AUS / FLUS (Atypia of Undetermined Significance)',
    risk: '15% – 30%',
    color: 'bg-amber-50 text-amber-800 border-amber-300',
    action: 'Indeterminate cells. Repeat FNAC, molecular testing, or diagnostic hemithyroidectomy depending on clinical picture.'
  },
  {
    cat: 'Bethesda IV',
    title: 'Follicular Neoplasm / Suspicious for FN',
    risk: '25% – 40%',
    color: 'bg-amber-50 text-amber-800 border-amber-300',
    action: 'Cellular microfollicular pattern. Cannot distinguish benign adenoma from carcinoma without histological capsular invasion check; diagnostic lobectomy is gold standard.'
  },
  {
    cat: 'Bethesda V',
    title: 'Suspicious for Malignancy',
    risk: '70% – 75%',
    color: 'bg-orange-50 text-orange-800 border-orange-300',
    action: 'High probability of thyroid carcinoma. Surgery (Lobectomy or Total Thyroidectomy with RLN monitoring) strongly advised.'
  },
  {
    cat: 'Bethesda VI',
    title: 'Malignant (Papillary / Medullary Carcinoma)',
    risk: '97% – 99%',
    color: 'bg-red-50 text-red-800 border-red-300',
    action: 'Confirmed cancer. Complete total thyroidectomy + central lymph node clearance (Level VI). Excellent prognosis with timely surgery.'
  }
];

export default function ThyroidRiskCalculator({ onBookClick }: { onBookClick: () => void }) {
  const [tab, setTab] = useState<'tirads' | 'bethesda'>('tirads');
  const [selectedTiradsIndex, setSelectedTiradsIndex] = useState(2); // default TIRADS 3
  const [selectedBethesdaIndex, setSelectedBethesdaIndex] = useState(1); // default Bethesda II

  const currentTirads = TIRADS_LEVELS[selectedTiradsIndex];
  const currentBethesda = BETHESDA_LEVELS[selectedBethesdaIndex];

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-slate-bg border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
            Diagnostic Decision Aid
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            Thyroid Nodule & Biopsy Risk Calculator
          </h2>
          <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
            Have an Ultrasound or FNAC Biopsy report? Select your reported TIRADS or Bethesda score to see standard clinical recommendations based on ATA guidelines.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-200/80 border border-slate-300 mt-8 shadow-inner">
            <button
              onClick={() => setTab('tirads')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === 'tirads'
                  ? 'bg-medical-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-medical-blue'
              }`}
            >
              Ultrasound TIRADS Score
            </button>
            <button
              onClick={() => setTab('bethesda')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === 'bethesda'
                  ? 'bg-medical-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-medical-blue'
              }`}
            >
              FNAC Bethesda Category
            </button>
          </div>
        </div>

        {tab === 'tirads' ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 card-shadow grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Selector */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Select Score Reported on Ultrasound:
              </span>
              {TIRADS_LEVELS.map((t, idx) => (
                <div
                  key={t.score}
                  onClick={() => setSelectedTiradsIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    selectedTiradsIndex === idx
                      ? 'border-medical-teal bg-teal-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm text-medical-blue">{t.score}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{t.title}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${t.color}`}>
                    Risk: {t.risk}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Explanation */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-medical-teal">Clinical Assessment</span>
                  <h3 className="font-serif font-bold text-2xl text-medical-blue mt-1">
                    {currentTirads.score}: {currentTirads.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Malignancy Risk</span>
                  <p className="text-xl font-bold text-medical-blue">{currentTirads.risk}</p>
                </div>
              </div>

              {/* Visual Risk Gauge */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5 uppercase">
                  <span>Benign Probability</span>
                  <span>Malignancy Risk: {currentTirads.risk}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${currentTirads.riskBar}`}></div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-medical-blue block mb-1">Ultrasound Findings:</span>
                  {currentTirads.criteria}
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-medical-teal block mb-1">Recommended Action (ATA Guidelines):</span>
                  {currentTirads.management}
                </div>
              </div>

              <button
                onClick={onBookClick}
                className="w-full py-3.5 px-6 rounded-xl bg-medical-blue text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-all cursor-pointer shadow-md"
              >
                Discuss This Report With Dr. Dinesh Goli <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 card-shadow grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Select Category from FNAC Cytology:
              </span>
              {BETHESDA_LEVELS.map((b, idx) => (
                <div
                  key={b.cat}
                  onClick={() => setSelectedBethesdaIndex(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    selectedBethesdaIndex === idx
                      ? 'border-medical-teal bg-teal-50/70 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm text-medical-blue">{b.cat}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{b.title}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${b.color}`}>
                    {b.risk}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Explanation */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-medical-teal">Bethesda Reporting System</span>
                  <h3 className="font-serif font-bold text-2xl text-medical-blue mt-1">
                    {currentBethesda.cat}
                  </h3>
                  <p className="text-xs text-slate-500">{currentBethesda.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Estimated Risk</span>
                  <p className="text-xl font-bold text-medical-blue">{currentBethesda.risk}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                <span className="font-bold text-medical-blue text-sm block">Surgical Pathway & Guidelines:</span>
                <p>{currentBethesda.action}</p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-slate-700">
                <span className="font-bold text-medical-teal block mb-1">Second Opinion Advantage:</span>
                Many indeterminate biopsies (Bethesda III & IV) can avoid complete thyroid removal through careful second review and targeted diagnostic lobectomy.
              </div>

              <button
                onClick={onBookClick}
                className="w-full py-3.5 px-6 rounded-xl bg-medical-blue text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-all cursor-pointer shadow-md"
              >
                Schedule Biopsy Review Consultation <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
