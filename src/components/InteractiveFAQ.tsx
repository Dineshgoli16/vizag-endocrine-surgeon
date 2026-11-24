import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, ShieldCheck, CreditCard, Sparkles, Stethoscope, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  q: string;
  a: string;
  category: 'toetva' | 'thyroid' | 'parathyroid' | 'breast' | 'insurance';
}

const FAQS_EN: FAQItem[] = [
  {
    category: 'toetva',
    q: 'How is Scarless TOETVA different from regular thyroid surgery?',
    a: 'In conventional thyroid surgery, a 5 to 8 cm visible incision is made across the front of your neck. In TOETVA (Transoral Endoscopic Thyroidectomy Vestibular Approach), three micro-incisions are made completely inside the mouth behind your lower lip. Specialized endoscopic instruments navigate underneath the neck muscles directly to the thyroid gland. Once healed, there is ZERO visible scar on the neck skin.'
  },
  {
    category: 'toetva',
    q: 'Is Scarless TOETVA safe for my speaking voice and nerves?',
    a: 'Yes, TOETVA offers safety equal to or greater than open surgery because the 4K high-definition endoscopic camera magnifies the Recurrent Laryngeal Nerve (RLN) and parathyroid glands up to 10 times. Dr. Dinesh Goli routinely couples this with Intraoperative Nerve Monitoring (IONM) to electrically verify vocal cord nerve function in real-time.'
  },
  {
    category: 'toetva',
    q: 'Can I eat and brush my teeth after Scarless TOETVA?',
    a: 'Yes. Patients start drinking liquids on the evening of surgery and transition to soft foods (rice, curd, dal) the next morning. Gentle mouth rinsing with antiseptic mouthwash is recommended after every meal. Brushing teeth is resumed gently from post-op Day 2.'
  },
  {
    category: 'thyroid',
    q: 'Will I need to take thyroid tablets for the rest of my life after surgery?',
    a: 'If only one lobe is removed (Hemithyroidectomy / Lobectomy), your remaining healthy lobe usually produces enough natural hormone, avoiding lifelong medication in up to 70-80% of patients. If a Total Thyroidectomy is necessary (for multinodular goiters or bilateral cancer), a simple single daily thyroxine pill (Thyronorm/Eltroxin) completely replaces natural gland function with zero side effects.'
  },
  {
    category: 'parathyroid',
    q: 'Why do my kidney stones keep coming back despite drinking plenty of water?',
    a: 'Recurrent calcium kidney stones are frequently caused by Primary Hyperparathyroidism (PHPT), where a tiny benign tumor in one of the 4 parathyroid glands overproduces Parathyroid Hormone (PTH). This continuously leaches calcium out of your skeleton into your bloodstream and urine. Once Dr. Dinesh Goli surgically removes the single hyperfunctioning gland (Focused MIP), calcium levels normalize permanently within 24 hours and stone formation halts.'
  },
  {
    category: 'breast',
    q: 'Does having a breast cancer diagnosis always mean a complete mastectomy?',
    a: 'No. Modern international oncological guidelines recommend Breast Conservation Surgery (BCS) whenever clinically appropriate. Dr. Dinesh Goli specializes in Oncoplastic Breast Surgery, where the entire tumor is excised with wide clear margins, followed by plastic surgical tissue rearrangement to restore a natural, symmetric breast shape.'
  },
  {
    category: 'insurance',
    q: 'Are endocrine and breast surgeries covered by health insurance at Apollo Health City?',
    a: 'Yes. Surgeries performed by Dr. Dinesh Goli at Apollo Health City and recognized network surgical centers in Visakhapatnam are eligible for Cashless Health Insurance pre-authorization across all major insurers (Star Health, Care Health, HDFC Ergo, ICICI Lombard, Bajaj Allianz, MediBuddy, Aditya Birla, and corporate TPA policies). Our patient desk assists you with all pre-authorization and claim documentation.'
  },
  {
    category: 'insurance',
    q: 'What is the typical hospital stay and recovery timeline?',
    a: 'For minimally invasive parathyroidectomy or hemithyroidectomy, patients are typically discharged within 24 to 36 hours. Patients undergoing total thyroidectomy or breast oncoplasty usually stay 48 hours. Most patients comfortably return to office desk work and light social activities within 5 to 7 days.'
  }
];

const FAQS_TE: FAQItem[] = [
  {
    category: 'toetva',
    q: 'సాధారణ థైరాయిడ్ సర్జరీకి, స్కార్‌లెస్ TOETVA కు తేడా ఏమిటి?',
    a: 'సాధారణ సర్జరీలో మెడ ముందు భాగంలో 5 నుండి 8 సెం.మీ పొడవైన కోత పెడతారు. TOETVA పద్ధతిలో కింది పెదవి లోపలి భాగంలో 3 చిన్న రంధ్రాల ద్వారా కెమెరాను పంపి థైరాయిడ్ గడ్డను తొలగిస్తారు. మెడ చర్మంపై ఎటువంటి కోత ఉండదు, మచ్చ సున్నా.'
  },
  {
    category: 'toetva',
    q: 'స్కార్‌లెస్ TOETVA వల్ల స్వరపేటికకు లేదా గొంతు నరాలకు ప్రమాదం ఉందా?',
    a: 'లేదు. TOETVA లో 4K హెచ్‌డీ కెమెరా 10 రెట్లు పెద్దదిగా చూపిస్తుంది. పైగా ఇంట్రాఆపరేటివ్ నెర్వ్ మానిటరింగ్ (IONM) ద్వారా స్వర నరాలను నిరంతరం పర్యవేక్షిస్తూ శస్త్రచికిత్స చేస్తారు. కాబట్టి మాట మారే ప్రమాదం ఉండదు.'
  },
  {
    category: 'thyroid',
    q: 'సర్జరీ తర్వాత జీవితాంతం థైరాయిడ్ మాత్రలు వేసుకోవాలా?',
    a: 'సగం థైరాయిడ్ (హెమిథైరాయిడెక్టమీ) మాత్రమే తీసివేస్తే, మిగిలిన సగం సహజంగా హార్మోన్ ఉత్పత్తి చేస్తుంది కాబట్టి 70-80% మందికి మాత్రలు అవసరం ఉండదు. మొత్తం గ్రంధి తీసివేస్తే (టోటల్ థైరాయిడెక్టమీ) రోజుకు ఒక మాత్ర వేసుకోవాలి.'
  },
  {
    category: 'parathyroid',
    q: 'నీరు బాగా తాగినా కిడ్నీలో రాళ్లు మళ్లీ మళ్లీ ఎందుకు వస్తున్నాయి?',
    a: 'పారాథైరాయిడ్ గ్రంధిలో చిన్న గడ్డ (Adenoma) ఏర్పడి రక్తంలో క్యాల్షియం మోతాదును విపరీతంగా పెంచడం వల్ల ఇలా జరుగుతుంది. డాక్టర్ దినేష్ గోలి గారు ఆ గడ్డను శస్త్రచికిత్స ద్వారా తొలగించిన 24 గంటల్లో క్యాల్షియం సాధారణ స్థితికి వచ్చి రాళ్లు రావడం ఆగిపోతుంది.'
  },
  {
    category: 'insurance',
    q: 'అపోలో హెల్త్ సిటీలో నగదు రహిత ఇన్సూరెన్స్ వర్తిస్తుందా?',
    a: 'అవును. స్టార్ హెల్త్, కేర్ హెల్త్, హెచ్‌డీఎఫ్‌సీ ఎర్గో, ఐసీఐసీఐ లాంబార్డ్, మెడిబడ్డీ మరియు అన్ని ప్రభుత్వ/కార్పొరేట్ టీపీఏల ద్వారా 100% క్యాష్‌లెస్ సదుపాయం అందుబాటులో ఉంది.'
  }
];

interface InteractiveFAQProps {
  language?: 'en' | 'te';
}

export default function InteractiveFAQ({ language = 'en' }: InteractiveFAQProps) {
  const isTelugu = language === 'te';
  const faqList = isTelugu ? FAQS_TE : FAQS_EN;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filtered = faqList.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faqs" className="scroll-mt-28 lg:scroll-mt-32 py-20 lg:py-28 bg-white border-b border-gray-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
            {isTelugu ? 'సందేహాలు & సమాధానాలు' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            {isTelugu ? 'రోగుల సాధారణ ప్రశ్నలు & ఇన్సూరెన్స్ సమాచారం' : 'Patient Questions & Clinical Answers'}
          </h2>
          <p className="text-sm text-slate-600 mt-3 font-sans">
            {isTelugu 
              ? 'థైరాయిడ్ సర్జరీ, వాయిస్ సేఫ్టీ, స్కార్‌లెస్ పద్ధతులు మరియు ఆసుపత్రి అడ్మిషన్ల గురించి పారదర్శక సమాధానాలు.'
              : 'Clear, transparent answers to practical questions regarding thyroid surgery, voice recovery, scarless TOETVA, and hospital cashless claims.'}
          </p>

          {/* Search Input with Clear Button */}
          <div className="relative max-w-md mx-auto mt-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isTelugu ? 'శోధించండి e.g. scar, voice, insurance, recovery...' : 'Search e.g. scar, voice, insurance, stones...'}
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal font-sans shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all' ? 'bg-medical-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-medical-blue'
              }`}
            >
              {isTelugu ? 'అన్ని అంశాలు' : 'All Topics'}
            </button>
            <button
              onClick={() => setActiveCategory('toetva')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'toetva' ? 'bg-medical-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-medical-blue'
              }`}
            >
              Scarless TOETVA
            </button>
            <button
              onClick={() => setActiveCategory('thyroid')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'thyroid' ? 'bg-medical-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-medical-blue'
              }`}
            >
              {isTelugu ? 'థైరాయిడ్ & వాయిస్' : 'Thyroid & Voice'}
            </button>
            <button
              onClick={() => setActiveCategory('parathyroid')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'parathyroid' ? 'bg-medical-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-medical-blue'
              }`}
            >
              {isTelugu ? 'పారాథైరాయిడ్ & కిడ్నీ రాళ్లు' : 'Parathyroid & Stones'}
            </button>
            <button
              onClick={() => setActiveCategory('insurance')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'insurance' ? 'bg-medical-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:text-medical-blue'
              }`}
            >
              {isTelugu ? 'ఇన్సూరెన్స్ & హాస్పిటల్ స్టే' : 'Cashless Insurance'}
            </button>
          </div>

          <div className="text-[11px] font-bold text-slate-400 mt-4">
            {filtered.length} {isTelugu ? 'సమాధానాలు అందుబాటులో ఉన్నాయి' : 'clinical answers available'}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm font-sans bg-slate-50 rounded-3xl border border-slate-200">
              No matching questions found for "{searchQuery}". Connect directly with Dr. Dinesh Goli's team on WhatsApp.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    onClick={() => setExpandedIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-medical-blue">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-medical-teal transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-teal-50 border-teal-200' : ''
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-6 text-slate-600 text-xs sm:text-sm font-sans leading-relaxed border-t border-slate-100 pt-4"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
