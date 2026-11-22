import React from 'react';
import { X, CheckCircle2, Stethoscope, BookOpen, Award, Users, ChevronRight, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GuideData {
  id: string;
  title: string;
  category: string;
  icon: string;
  subtitle: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

const GUIDES: Record<string, GuideData> = {
  'thyroid-nodes': {
    id: 'thyroid-nodes',
    title: 'Thyroid Nodules & Diagnostic Pathways',
    category: 'Clinical Patient Guide',
    icon: '🦋',
    subtitle: 'From Ultrasound TIRADS scoring to FNAC and Scarless TOETVA removal.',
    sections: [
      {
        heading: 'What is a Thyroid Nodule?',
        content: [
          'A thyroid nodule is an abnormal lump within the thyroid gland located at the base of your throat.',
          'Over 90% of thyroid nodules are benign (non-cancerous). However, careful evaluation is mandatory to rule out malignancy and relieve pressure symptoms.'
        ]
      },
      {
        heading: 'The Diagnostic Workup',
        content: [
          'High-Resolution Neck Ultrasound (USG): Categorizes nodules into EU-TIRADS or ACR-TIRADS classes based on echogenicity, margins, and microcalcifications.',
          'Fine Needle Aspiration Cytology (FNAC): A painless, quick needle test performed under ultrasound guidance to classify cells under the Bethesda System (Bethesda I to VI).',
          'Thyroid Function Tests (TSH, Free T3, Free T4): Determines if the nodule is producing excess hormone (toxic nodule).'
        ]
      },
      {
        heading: 'Surgical Treatment by Dr. Dinesh Goli',
        content: [
          'Hemithyroidectomy / Lobectomy: Removes half the thyroid gland for single benign nodules or low-risk cancers, preserving your natural hormone production.',
          'Total Thyroidectomy: Complete gland removal for multinodular goiters or confirmed thyroid cancers.',
          'Scarless TOETVA Approach: Eliminates visible neck scarring by operating through the inside of the lower lip.'
        ]
      }
    ]
  },
  'pth-levels': {
    id: 'pth-levels',
    title: 'High Calcium, PTH & Parathyroid Adenoma',
    category: 'Endocrine Gland Guide',
    icon: '⚡',
    subtitle: 'Primary Hyperparathyroidism: Symptoms, 99mTc-Sestamibi scans, and curative surgery.',
    sections: [
      {
        heading: 'Understanding Primary Hyperparathyroidism (PHPT)',
        content: [
          'You have four tiny parathyroid glands behind the thyroid that control calcium in your blood and bones.',
          'When one of these glands develops a benign tumor (adenoma), it overproduces Parathyroid Hormone (PTH), leaching calcium out of bones into the bloodstream.'
        ]
      },
      {
        heading: 'Signs and Symptoms ("Bones, Stones, Groans & Moans")',
        content: [
          'Kidney Stones: Recurrent calcium oxalate stones causing flank pain and urinary urgency.',
          'Bone Pain & Osteoporosis: Accelerated bone thinning and unprovoked fractures.',
          'Abdominal Groans: Chronic constipation, indigestion, or recurrent pancreatitis.',
          'Psychic Moans: Chronic fatigue, memory fog, anxiety, and depression.'
        ]
      },
      {
        heading: 'Targeted Focused Parathyroidectomy (MIP)',
        content: [
          'Localization Imaging: Sestamibi SPECT-CT scan and ultrasound pinpoint the exact culprit adenoma before surgery.',
          'Focused Minimally Invasive Surgery: A mini-incision directly over the localized gland removes the tumor with rapid normalization of calcium within hours.'
        ]
      }
    ]
  },
  'nerve-safety': {
    id: 'nerve-safety',
    title: 'Recurrent Laryngeal Nerve (RLN) Monitoring & Voice Safety',
    category: 'Surgical Safety Protocol',
    icon: '🛡️',
    subtitle: 'State-of-the-art Intraoperative Nerve Monitoring (IONM) to safeguard your vocal cords.',
    sections: [
      {
        heading: 'Why is Voice Preservation Crucial?',
        content: [
          'The Recurrent Laryngeal Nerve (RLN) and External Branch of the Superior Laryngeal Nerve (EBSLN) run closely along the back of the thyroid to control your vocal cords.',
          'Injury to these nerves can cause hoarseness, loss of vocal pitch, or breathing difficulties.'
        ]
      },
      {
        heading: 'How Intraoperative Nerve Monitoring (IONM) Works',
        content: [
          'Dr. Dinesh Goli utilizes specialized nerve-monitoring endotracheal tubes and micro-stimulation probes during thyroidectomy.',
          'Continuous Audio-Visual Feedback: The surgical nerve monitor emits distinct acoustic signals when the nerve is identified and stimulated, confirming 100% electrical conductivity.',
          'Significantly decreases the risk of temporary or permanent vocal fold paralysis.'
        ]
      },
      {
        heading: 'Parathyroid Gland Preservation',
        content: [
          'The micro-blood vessels supplying the four parathyroid glands are delicately mapped and preserved, preventing post-operative hypocalcemia (tingling in fingers/lips).'
        ]
      }
    ]
  },
  'breast-wellness': {
    id: 'breast-wellness',
    title: 'Breast Lumps & Oncoplastic Breast Conservation',
    category: 'Breast Oncology Guide',
    icon: '🌸',
    subtitle: 'Preserving aesthetic appearance without compromising cancer clearance.',
    sections: [
      {
        heading: 'The Clinical "Triple Assessment"',
        content: [
          'Step 1: Clinical Breast Examination by an experienced surgeon.',
          'Step 2: Bilateral Digital Mammogram and High-Resolution Ultrasound.',
          'Step 3: Image-guided Core Needle Biopsy for accurate tissue diagnosis.'
        ]
      },
      {
        heading: 'What is Oncoplastic Breast Surgery (BCS)?',
        content: [
          'Historically, mastectomy (complete removal of the breast) was common. Today, Breast Conservation Surgery (Wide Local Excision with clear margins) achieves equivalent survival rates.',
          'Oncoplastic Techniques: Dr. Dinesh combines cancer removal with plastic surgery principles, rearranging local tissue or reshaping the breast to maintain symmetry and aesthetic form.'
        ]
      },
      {
        heading: 'Sentinel Lymph Node Biopsy (SLNB)',
        content: [
          'Avoids complete armpit lymph node clearance whenever possible, drastically reducing the long-term risk of arm swelling (lymphedema).'
        ]
      }
    ]
  }
};

export default function PatientGuideModal({ 
  guideId, 
  onClose,
  onBookClick
}: { 
  guideId: string | null; 
  onClose: () => void;
  onBookClick: () => void;
}) {
  if (!guideId) return null;
  const guide = GUIDES[guideId];
  if (!guide) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-medical-blue text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-medical-gold block mb-2">
              {guide.category}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">{guide.icon}</span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl leading-tight">
                {guide.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/80 mt-2 font-sans">
              {guide.subtitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
            {guide.sections.map((section, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="font-bold text-sm sm:text-base text-medical-blue flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-medical-teal flex-shrink-0" />
                  {section.heading}
                </h4>
                <ul className="space-y-2 pl-6 list-disc text-slate-600">
                  {section.content.map((point, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
              Have questions about this condition? Consult Dr. Dinesh Goli.
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onBookClick();
                }}
                className="flex-1 sm:flex-none px-6 py-3 bg-medical-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-all cursor-pointer shadow-md"
              >
                <Calendar size={14} /> Book Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
