import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, CheckCircle2, ShieldCheck, ChevronRight, 
  Eye, Video, Activity, Zap, Award, ArrowRight
} from 'lucide-react';

interface ToetvaVisualizerProps {
  onBookClick?: () => void;
  language?: 'en' | 'te';
}

export default function ToetvaVisualizer({ onBookClick, language = 'en' }: ToetvaVisualizerProps) {
  const [activeStep, setActiveStep] = useState(0);

  const isTelugu = language === 'te';

  const steps = [
    {
      num: '01',
      title: isTelugu ? 'నోటి లోపల చిన్న రంధ్రాలు (Vestibular Incisions)' : 'Submucosal Vestibular Portals',
      subtitle: isTelugu ? 'మెడపై ఎటువంటి కోత ఉండదు' : 'Zero Cut on Neck Skin',
      desc: isTelugu 
        ? 'కింది పెదవి లోపలి భాగంలో (Oral Vestibule) 3 సూక్ష్మ రంధ్రాలు చేస్తారు (ఒకటి 10mm మరియు రెండు 5mm). ఈ మార్గం ద్వారా ఎండోస్కోపిక్ కెమెరా మరియు సున్నితమైన పరికరాలు ప్రవేశపెడతారు.'
        : 'Three miniature punctures (one 10mm central optical port and two 5mm lateral instrument ports) are placed inside the lower oral vestibule behind the lip. Neck skin remains 100% untouched.',
      badge: isTelugu ? 'మచ్చలేని ప్రవేశం' : 'Scarless Entry',
      icon: Eye,
      callout: isTelugu ? 'నోటి శ్లేష్మం 48-72 గంటలలో సహజంగా మానుతుంది' : 'Oral mucosa heals rapidly within 48–72 hours without visible scarring'
    },
    {
      num: '02',
      title: isTelugu ? '4K అల్ట్రా-హెచ్‌డీ ఎండోస్కోపిక్ వర్కింగ్ స్పేస్' : '4K Ultra-HD Endoscopic Magnification',
      subtitle: isTelugu ? '10 రెట్లు అధిక మాగ్నిఫికేషన్' : '10x Magnified Surgical Field',
      desc: isTelugu 
        ? 'కార్బన్ డయాక్సైడ్ (CO2) సహాయంతో గొంతు వద్ద స్పష్టమైన వర్కింగ్ స్పేస్ సృష్టిస్తారు. 4K కెమెరా ద్వారా థైరాయిడ్ గ్రంధి, రక్తనాళాలు మరియు సూక్ష్మ నరాలు 10 రెట్లు పెద్దవిగా స్పష్టంగా కనిపిస్తాయి.'
        : 'Gentle low-pressure CO2 insufflation maintains an illuminated surgical pocket under the strap muscles. The 4K telescope offers 10x optical magnification, giving unprecedented clarity of critical vascular and nerve planes.',
      badge: isTelugu ? 'అత్యాధునిక విజన్' : '4K Optical Clarity',
      icon: Video,
      callout: isTelugu ? 'రక్తస్రావం అత్యల్పం & కణజాలం సురక్షితం' : 'Minimal blood loss with micro-bipolar energy devices'
    },
    {
      num: '03',
      title: isTelugu ? 'స్వర నరాల సంరక్షణ (IONM Nerve & Parathyroid Sparing)' : 'Precision IONM Nerve & Parathyroid Sparing',
      subtitle: isTelugu ? 'వాయిస్ కోల్పోకుండా పూర్తి రక్షణ' : 'Protecting Voice & Natural Calcium',
      desc: isTelugu 
        ? 'ఇంట్రాఆపరేటివ్ నెర్వ్ మానిటరింగ్ (IONM) ప్రోబ్ ద్వారా స్వరపేటికకు వెళ్ళే రికరెంట్ లారింజియల్ నెర్వ్ (RLN) ను నిరంతరం పరీక్షిస్తూ కాపాడుతారు. అదేవిధంగా పారాథైరాయిడ్ గ్రంధుల రక్తప్రసరణ చెడకుండా జాగ్రత్త పడతారు.'
        : 'Using Intraoperative Nerve Monitoring (IONM), the delicate Recurrent Laryngeal Nerve (RLN) is mapped and safeguarded in real time. Superior & inferior parathyroid glands are preserved to maintain natural baseline calcium.',
      badge: isTelugu ? '100% నరాల భద్రత' : 'Continuous IONM',
      icon: Zap,
      callout: isTelugu ? 'స్వరం మారే ప్రమాదం అస్సలు ఉండదు' : 'Safeguards singing, shouting, and high-pitch vocal cords'
    },
    {
      num: '04',
      title: isTelugu ? 'ఎండోబ్యాగ్ ద్వారా తొలగింపు & వేగవంతమైన రికవరీ' : 'Endobag Retrieval & Zero Neck Scar Recovery',
      subtitle: isTelugu ? 'మెడపై సున్నా మచ్చ - 24 గంటల్లో డిశ్చార్జ్' : 'Zero Neck Scar & 24h Discharge',
      desc: isTelugu 
        ? 'తొలగించిన థైరాయిడ్ భాగాన్ని సురక్షితమైన ఎండోబ్యాగ్‌లో పెట్టి నోటి ద్వారానే బయటకు తీస్తారు. రోగి మెడపై ఎటువంటి ప్లాస్టర్ లేదా కుట్లు ఉండవు. 24-48 గంటల్లో సాధారణ ఆహారం తీసుకుంటూ డిశ్చార్జ్ కావచ్చు.'
        : 'The excised thyroid lobe or gland is enclosed in a sterile specimen retrieval Endobag and delivered through the oral port. No neck dressing or visible collar stitches exist. Patients resume oral soft diet the same evening and are discharged in 24–48 hours.',
      badge: isTelugu ? 'పూర్తి సౌందర్యం' : 'Aesthetic Perfection',
      icon: Award,
      callout: isTelugu ? 'మెడపై ఏ కాలంలోనూ మచ్చ కనిపించదు' : 'Leaves 0 cm scar on the neck for lifetime cosmetic confidence'
    }
  ];

  return (
    <section id="toetva-guide" className="scroll-mt-28 lg:scroll-mt-32 py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-gold/15 border border-medical-gold/30 text-medical-blue text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-medical-gold" />
            <span>{isTelugu ? 'అత్యాధునిక పద్ధతి' : 'Pioneering Surgical Breakthrough'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            {isTelugu ? 'స్కార్‌లెస్ TOETVA థైరాయిడ్ సర్జరీ ఎలా జరుగుతుంది?' : 'How Scarless TOETVA Works: Step-by-Step'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            {isTelugu 
              ? 'మెడపై ఎటువంటి కోత లేకుండా, కింది పెదవి లోపలి నుండి ఎండోస్కోపిక్ కెమెరా సహాయంతో థైరాయిడ్ సర్జరీ చేసే సరికొత్త వైద్య విధానం. డాక్టర్ దినేష్ గోలి గారి విశేష అనుభవం.'
              : 'Transoral Endoscopic Thyroidectomy Vestibular Approach (TOETVA) removes thyroid nodules and tumors through the inside of the lower lip, completely avoiding the traditional 6–8 cm neck scar.'}
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 max-w-5xl mx-auto">
          {steps.map((st, idx) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeStep === idx 
                  ? 'bg-medical-blue text-white border-medical-blue shadow-lg scale-102' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xl font-serif font-bold ${activeStep === idx ? 'text-medical-gold' : 'text-medical-teal'}`}>
                  {st.num}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  activeStep === idx ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {st.badge}
                </span>
              </div>
              <p className={`text-xs font-bold leading-snug line-clamp-2 ${activeStep === idx ? 'text-white' : 'text-medical-blue'}`}>
                {st.title}
              </p>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-50 to-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 shadow-xl mb-16 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-medical-teal text-xs font-bold uppercase tracking-wider">
                <span>Phase {steps[activeStep].num} of 04</span>
                <span>•</span>
                <span>{steps[activeStep].subtitle}</span>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-medical-blue">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {steps[activeStep].desc}
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                <span>{steps[activeStep].callout}</span>
              </div>
            </div>

            {/* Right Visual Badge / Illustration Representation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-medical-blue text-white shadow-xl text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-medical-gold mb-4 shadow-inner">
                {React.createElement(steps[activeStep].icon, { size: 40 })}
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-widest text-medical-gold mb-1">
                Visual Principle
              </span>
              <h4 className="font-serif font-bold text-xl text-white mb-2">
                {steps[activeStep].badge}
              </h4>
              <p className="text-xs text-white/80 font-sans max-w-xs leading-relaxed">
                Zero skin cuts on the neck. All instrument trajectories navigate safely through natural anatomical fascial planes under direct magnification.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-medical-gold">
                <span>Dr. Dinesh Goli • Pioneer in Vizag</span>
              </div>
            </div>

          </div>
        </div>

        {/* TOETVA vs Open Surgery Comparison Matrix */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg">
          <h3 className="font-serif font-bold text-2xl text-medical-blue mb-6 text-center">
            {isTelugu ? 'సంప్రదాయ ఓపెన్ సర్జరీ వర్సెస్ స్కార్‌లెస్ TOETVA' : 'Conventional Open Neck Surgery vs. Scarless TOETVA'}
          </h3>

          <div className="grid md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Metric</span>
              <p className="font-bold text-slate-700">Neck Scar</p>
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-1">
                <p className="text-slate-500 font-sans">Open: 6–8 cm visible cut</p>
                <p className="font-bold text-emerald-700">TOETVA: 0 cm (Zero neck scar)</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Metric</span>
              <p className="font-bold text-slate-700">Vocal Cord & Nerve Safety</p>
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-1">
                <p className="text-slate-500 font-sans">Open: Direct vision</p>
                <p className="font-bold text-emerald-700">TOETVA: 10x 4K Vision + IONM</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Metric</span>
              <p className="font-bold text-slate-700">Social Recovery</p>
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-1">
                <p className="text-slate-500 font-sans">Open: 2–3 weeks concealment</p>
                <p className="font-bold text-emerald-700">TOETVA: 5–7 days (No neck dressing)</p>
              </div>
            </div>
          </div>

          {onBookClick && (
            <div className="mt-8 text-center">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-medical-blue text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-medical-blue-dark transition-all cursor-pointer"
              >
                <span>{isTelugu ? 'స్కార్‌లెస్ సర్జరీకి మీ అనుకూలతను తనిఖీ చేయండి' : 'Check Eligibility for Scarless TOETVA'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
