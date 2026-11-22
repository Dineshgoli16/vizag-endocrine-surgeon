import React, { useState } from 'react';
import { Activity, Stethoscope, AlertCircle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Category {
  id: 'thyroid' | 'parathyroid' | 'adrenal' | 'breast';
  name: string;
  badge: string;
  icon: string;
  symptoms: { id: string; label: string; detail: string }[];
}

const CATEGORIES: Category[] = [
  {
    id: 'thyroid',
    name: 'Thyroid & Neck',
    badge: 'Thyroid',
    icon: '🦋',
    symptoms: [
      { id: 't1', label: 'Visible Neck Swelling or Lump', detail: 'A palpable nodule moving on swallowing.' },
      { id: 't2', label: 'Difficulty Swallowing or Tightness', detail: 'Feeling of compression in lower throat.' },
      { id: 't3', label: 'Voice Changes or Hoarseness', detail: 'Sudden or progressive change in vocal pitch.' },
      { id: 't4', label: 'Abnormal TSH / Ultrasound Report', detail: 'TIRADS score reported on neck ultrasound.' },
    ]
  },
  {
    id: 'parathyroid',
    name: 'Calcium & Parathyroid',
    badge: 'Parathyroid',
    icon: '⚡',
    symptoms: [
      { id: 'p1', label: 'Recurrent Kidney Stones', detail: 'Frequent stones caused by hypercalcemia.' },
      { id: 'p2', label: 'High Serum Calcium (>10.2 mg/dL)', detail: 'Often found accidentally on routine health checks.' },
      { id: 'p3', label: 'Unexplained Bone Pain or Osteoporosis', detail: 'Low bone mineral density despite calcium pills.' },
      { id: 'p4', label: 'Elevated PTH (Parathyroid Hormone)', detail: 'Indicating primary hyperparathyroidism.' },
    ]
  },
  {
    id: 'adrenal',
    name: 'Adrenal & Endocrine BP',
    badge: 'Adrenal',
    icon: '⬡',
    symptoms: [
      { id: 'a1', label: 'Resistant High Blood Pressure', detail: 'Uncontrolled BP on 3+ different medications.' },
      { id: 'a2', label: 'Spells of Racing Heart & Sweating', detail: 'Episodic headaches and tremors (Pheochromocytoma).' },
      { id: 'a3', label: 'Incidental Adrenal Mass on CT/MRI', detail: 'Found incidentally during abdominal scan.' },
      { id: 'a4', label: 'Unexplained Low Potassium (Hypokalemia)', detail: 'Muscle cramps associated with Conn’s syndrome.' },
    ]
  },
  {
    id: 'breast',
    name: 'Breast Health & Oncoplasty',
    badge: 'Breast',
    icon: '🌸',
    symptoms: [
      { id: 'b1', label: 'Painless Lump in Breast or Axilla', detail: 'Firm discrete swelling requiring triple assessment.' },
      { id: 'b2', label: 'Nipple Discharge or Inversion', detail: 'Spontaneous blood-stained or clear fluid.' },
      { id: 'b3', label: 'Skin Puckering or Texture Change', detail: 'Peau d’orange appearance or localized dimple.' },
      { id: 'b4', label: 'Routine Mammogram Screening (>40 yrs)', detail: 'Preventive screening for high-risk families.' },
    ]
  }
];

export default function SymptomChecker({ onSelectSpecialty }: { onSelectSpecialty: (specialty: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<Category['id']>('thyroid');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory)!;
  const countSelected = selectedSymptoms.filter(s => currentCategory.symptoms.some(sym => sym.id === s)).length;

  const handleBooking = () => {
    let spec = 'Thyroid / Parathyroid';
    if (activeCategory === 'adrenal') spec = 'Adrenal Surgery';
    if (activeCategory === 'breast') spec = 'Breast Oncology';
    onSelectSpecialty(spec);
    
    // Smooth scroll to contact
    const contactElem = document.getElementById('contact');
    contactElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="symptom-checker" className="py-20 lg:py-28 bg-slate-bg border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
            Interactive Clinical Triage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            Should You See an Endocrine Surgeon?
          </h2>
          <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
            Select your symptom category to receive clinical triage guidance and next recommended diagnostic steps from Dr. Dinesh Goli.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20 scale-105'
                    : 'bg-white text-slate-600 hover:text-medical-blue border border-gray-200 shadow-sm'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Symptom Card Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Symptoms Checklist */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 card-shadow space-y-4">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-medical-teal">
                Select Any Symptoms That Apply:
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {countSelected} of {currentCategory.symptoms.length} selected
              </span>
            </div>

            <div className="space-y-3">
              {currentCategory.symptoms.map(symptom => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <div
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'border-medical-teal bg-medical-teal-light/60 shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-medical-teal text-white' : 'border border-gray-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 size={14} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-medical-blue">{symptom.label}</h4>
                      <p className="text-xs text-slate-500 mt-1">{symptom.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Assessment Guidance */}
          <div className="lg:col-span-5 bg-gradient-to-br from-medical-blue to-medical-blue-dark text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-white/10 text-medical-gold text-xs font-bold uppercase tracking-wider">
                  Specialist Assessment
                </span>
                <Activity size={20} className="text-medical-gold animate-pulse" />
              </div>

              <h3 className="font-serif font-bold text-2xl mb-3 text-white">
                {countSelected === 0 ? 'Diagnostic Recommendation' : `${countSelected} Symptom(s) Flagged`}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 font-sans">
                {countSelected === 0
                  ? `Click the checkboxes on the left that match your current health condition for an evidence-based clinical summary.`
                  : activeCategory === 'thyroid'
                  ? `Thyroid nodules require precise assessment via High-Resolution Ultrasound & fine needle biopsy (FNAC). Dr. Dinesh Goli utilizes nerve-sparing techniques for complete preservation of vocal cords and parathyroids.`
                  : activeCategory === 'parathyroid'
                  ? `Elevated calcium combined with kidney stones strongly points toward Parathyroid Adenoma. A focused scan (Sestamibi / 4D-CT) and minimally invasive surgery can offer complete cure.`
                  : activeCategory === 'adrenal'
                  ? `Secondary hypertension of adrenal origin is often curable surgically. Hormonal metanephrines evaluation and laparoscopic adrenalectomy are the clinical gold standard.`
                  : `Any breast lump requires the clinical 'Triple Assessment' (Clinical exam + Imaging/Mammogram + Core Biopsy). Dr. Dinesh Goli specializes in Breast Conservation Surgery (BCS) and Oncoplastic remodeling.`}
              </p>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs space-y-2 mb-6">
                <div className="flex items-center gap-2 text-medical-gold font-bold uppercase tracking-wider">
                  <Stethoscope size={14} /> Recommended Action:
                </div>
                <p className="text-white/90">
                  {countSelected > 0
                    ? `Schedule a clinical workup at Venkateshwara Vascular Foundation or Apollo Health City, Visakhapatnam.`
                    : `Consultation recommended if symptoms persist > 2 weeks or imaging shows abnormal findings.`}
                </p>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full py-4 px-6 rounded-xl bg-medical-gold text-medical-blue-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg cursor-pointer"
            >
              Book Consultation for {currentCategory.badge} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
