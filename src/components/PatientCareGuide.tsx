import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, AlertTriangle, Clock, Calendar, 
  FileText, ShieldCheck, HeartPulse, Sparkles, 
  Phone, ChevronRight, Activity, Droplets, Utensils, 
  HelpCircle, Stethoscope, Pill
} from 'lucide-react';

interface PatientCareGuideProps {
  onBookClick?: () => void;
  language?: 'en' | 'te';
}

export default function PatientCareGuide({ onBookClick, language = 'en' }: PatientCareGuideProps) {
  const [activeTab, setActiveTab] = useState<'pre' | 'post' | 'emergency'>('pre');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isTelugu = language === 'te';

  const preOpSteps = [
    {
      id: 'pre-1',
      title: isTelugu ? 'ఉపవాసం (Fasting - NPO)' : 'Fasting Protocol (NPO Guidelines)',
      timing: isTelugu ? 'సర్జరీకి 8 గంటల ముందు' : '6–8 Hours Before Surgery',
      desc: isTelugu 
        ? 'సర్జరీకి ముందు కనీసం 8 గంటల పాటు ఎటువంటి ఆహారం లేదా పాలు తీసుకోరాదు. సర్జరీ సమయానికి 2 గంటల ముందు వరకు మాత్రమే కొద్దిగా మంచినీరు త్రాగవచ్చు.'
        : 'Do not eat any solid food or milk for 8 hours prior to scheduled surgery. Small sips of clear water are permitted up to 2 hours before reporting to the hospital.',
      tag: isTelugu ? 'అత్యవసరం' : 'Mandatory'
    },
    {
      id: 'pre-2',
      title: isTelugu ? 'రక్తం పలుచబడే మందుల విరామం' : 'Blood Thinners & Anticoagulant Pause',
      timing: isTelugu ? '5-7 రోజుల ముందు' : '5–7 Days Prior (Under Advice)',
      desc: isTelugu 
        ? 'Aspirin, Clopidogrel, Ecosprin లేదా రక్తం పలుచబడే ఇతర మందులు వాడుతున్నట్లయితే డాక్టర్ గారి సలహా మేరకు 5-7 రోజుల ముందు తాత్కాలికంగా ఆపాలి.'
        : 'Medications like Aspirin, Clopidogrel (Ecosprin), or other anticoagulants must be temporarily stopped 5–7 days before surgery strictly upon Dr. Dinesh Goli\'s evaluation.',
      tag: isTelugu ? 'జాగ్రత్త' : 'Crucial'
    },
    {
      id: 'pre-3',
      title: isTelugu ? 'ప్రాథమిక పరీక్షల నివేదికలు' : 'Pre-Surgical Lab Work & Investigations',
      timing: isTelugu ? '2-3 రోజుల ముందు' : '2–3 Days Prior',
      desc: isTelugu 
        ? 'Complete Blood Picture (CBC), TSH & FT4, Serum Calcium, Serum PTH, ECG, Chest X-Ray మరియు అల్ట్రాసౌండ్/బయాప్సీ రిపోర్టుల ఒరిజినల్ ఫైల్‌ను సిద్ధం చేసుకోండి.'
        : 'Ensure recent Complete Blood Picture (CBC), Thyroid Profile (TSH, FT4), Serum Calcium, Serum PTH, ECG, Chest X-Ray, and your original Neck Ultrasound & FNAC Biopsy slides/blocks are ready.',
      tag: isTelugu ? 'డాక్యుమెంట్స్' : 'Lab Checklist'
    },
    {
      id: 'pre-4',
      title: isTelugu ? 'అడ్మిషన్ & హాస్పిటల్ బ్యాగ్' : 'Hospital Reporting & Essentials',
      timing: isTelugu ? 'సర్జరీ ఉదయం / అంతకుముందు రోజు' : 'Morning of Surgery / Day Prior',
      desc: isTelugu 
        ? 'ఆధార్ కార్డ్, హెల్త్ ఇన్సూరెన్స్ ఇ-కార్డ్, డాక్టర్ గారి ఓపీ ప్రిస్క్రిప్షన్ వెంట తీసుకురండి. మెడ చుట్టూ ఉండే ఆభరణాలు మరియు మేకప్ తొలగించాలి.'
        : 'Carry original Aadhar ID, Health Insurance TPA card, and Dr. Dinesh Goli\'s OPD slip. Wear loose comfortable clothing and leave neck jewellery, chains, and makeup at home.',
      tag: isTelugu ? 'చెక్లిస్ట్' : 'Checklist'
    }
  ];

  const postOpSteps = [
    {
      id: 'post-1',
      title: isTelugu ? 'ఆహార క్రమం (Diet Progression)' : 'Dietary Progression',
      badge: isTelugu ? 'డే 1 నుండి' : 'Day 1 Onwards',
      desc: isTelugu 
        ? 'మొదట కొద్దికొద్దిగా మంచినీరు, కొబ్బరినీరు లేదా జ్యూస్ తీసుకోవాలి. తరువాత మెత్తని ఇడ్లీ, పెరుగు అన్నం లేదా కిచిడీ తీసుకోవచ్చు. కారంగా ఉండేవి మరియు వేడివేడిగా ఉండే ఆహారం కొన్ని రోజులు నివారించండి.'
        : 'Start with clear liquids (water, tender coconut water) once approved by the medical team. Progress to soft, bland meals (soft idli, curd rice, khichdi). Avoid extremely hot, spicy, or crunchy foods for the first week.',
      icon: Utensils
    },
    {
      id: 'post-2',
      title: isTelugu ? 'స్కార్‌లెస్ TOETVA నోటి పరిశుభ్రత' : 'Scarless TOETVA Oral Hygiene (Zero Neck Scar Care)',
      badge: isTelugu ? 'TOETVA స్పెషల్' : 'Scarless Specific',
      desc: isTelugu 
        ? 'నోటి లోపల చిన్న కుట్లు ఉంటాయి. భోజనం చేసిన ప్రతిసారీ గోరువెచ్చని ఉప్పునీరు లేదా క్లోర్‌హెక్సిడిన్ మౌత్‌వాష్‌తో శుభ్రం చేసుకోవాలి. మొదటి 5 రోజులు కింది పెదవి దగ్గర సున్నితంగా బ్రష్ చేసుకోవాలి.'
        : 'For scarless surgery inside the lower lip, rinse mouth thoroughly with warm saline or prescribed Chlorhexidine oral rinse 4–5 times a day after every meal. Use a soft pediatric toothbrush gently around lower lip.',
      icon: Droplets
    },
    {
      id: 'post-3',
      title: isTelugu ? 'క్యాల్షియం మాత్రల సమయపాలన' : 'Calcium & Vitamin D3 Schedule',
      badge: isTelugu ? 'ముఖ్యమైనది' : 'Vital Schedule',
      desc: isTelugu 
        ? 'థైరాయిడ్ సర్జరీ తర్వాత డాక్టర్ సూచించిన క్యాల్షియం మరియు విటమిన్ డి మాత్రలను క్రమం తప్పకుండా వేసుకోవాలి. పెదవుల చుట్టూ లేదా చేతి వేళ్ళలో తిమ్మిర్లు అనిపిస్తే వెంటనే తెలియజేయాలి.'
        : 'Take prescribed Calcium Carbonate and active Vitamin D3 (Calcitriol) tablets on exact schedule. This stabilizes blood calcium levels while the delicate parathyroid glands recover full function.',
      icon: Pill
    },
    {
      id: 'post-4',
      title: isTelugu ? 'మెడ వ్యాయామాలు & విశ్రాంతి' : 'Gentle Neck Mobility & Rest',
      badge: isTelugu ? '48 గంటల తర్వాత' : '48h After Surgery',
      desc: isTelugu 
        ? 'సర్జరీ తర్వాత 48 గంటల వరకు విశ్రాంతి తీసుకోండి. ఆ తర్వాత నెమ్మదిగా తల అటూ ఇటూ తిప్పడం, భుజాలు కదపడం వంటి తేలికపాటి వ్యాయామాలు చేయవచ్చు. బరువైన పనులు 2 వారాలు చేయరాదు.'
        : 'Keep head slightly elevated on 1–2 pillows. After 48 hours, begin slow, gentle side-to-side neck turns and shoulder rolls to prevent stiffness. Avoid heavy lifting (>5 kg) and strenuous workouts for 2 weeks.',
      icon: Activity
    }
  ];

  const emergencyAlerts = [
    {
      title: isTelugu ? 'పెదవులు లేదా వేళ్ళలో సూదులు గుచ్చినట్లు తిమ్మిరి (Hypocalcemia)' : 'Perioral or Finger Numbness & Tingling',
      action: isTelugu ? 'వెంటనే క్యాల్షియం మాత్రలు వేసుకుని మా హెల్ప్‌లైన్‌కు కాల్ చేయండి' : 'Take prescribed emergency chewable calcium immediately and call our helpline.'
    },
    {
      title: isTelugu ? 'శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా శ్వాస శబ్దం (Stridor)' : 'Breathing Difficulty or Stridor',
      action: isTelugu ? 'తక్షణమే అపోలో హెల్త్ సిటీ ఎమర్జెన్సీ లేదా మా అత్యవసర నంబర్‌ను సంప్రదించండి' : 'Report immediately to Apollo Health City Emergency or contact Dr. Dinesh Goli desk.'
    },
    {
      title: isTelugu ? 'మెడ వద్ద హఠాత్తుగా వాపు లేదా రక్తస్రావం' : 'Sudden Rapid Neck Swelling or Bleeding',
      action: isTelugu ? 'మెడపై ఒత్తిడి పడకుండా చూసుకుని వెంటనే ఆసుపత్రికి బయలుదేరండి' : 'Do not apply heavy pressure; report to the emergency ward immediately for evaluation.'
    },
    {
      title: isTelugu ? 'తీవ్రమైన జ్వరం లేదా గాయం వద్ద ఎరుపుదనం' : 'Persistent High Fever (>101°F) or Wound Redness',
      action: isTelugu ? 'ఇన్ఫెక్షన్ రాకుండా యాంటీబయాటిక్ సమీక్ష కోసం మాకు వాట్సాప్ చేయండి' : 'Share photo on WhatsApp (+91 6300550392) for swift antibiotic review.'
    }
  ];

  return (
    <section id="care-guide" className="scroll-mt-28 lg:scroll-mt-32 py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical-teal/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-gold/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-medical-teal/20 text-medical-teal text-xs font-bold uppercase tracking-wider mb-4">
            <HeartPulse size={14} />
            <span>{isTelugu ? 'రోగి సంరక్షణ గైడ్' : 'Clinical Care Roadmap'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            {isTelugu ? 'సర్జరీకి ముందు & తర్వాత సంరక్షణ మార్గదర్శకాలు' : 'Pre-Op & Post-Op Patient Care Guide'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            {isTelugu 
              ? 'మీ శస్త్రచికిత్స వేగంగా, సురక్షితంగా మరియు నొప్పి లేకుండా పూర్తి కావడానికి డాక్టర్ దినేష్ గోలి గారి ప్రత్యేక సూచనలు.'
              : 'Clear, step-by-step clinical instructions designed by Dr. Dinesh Goli to ensure a seamless hospital experience, smooth healing, and rapid scar-free recovery.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 border border-slate-200 shadow-inner max-w-xl w-full">
            <button
              onClick={() => setActiveTab('pre')}
              className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'pre'
                  ? 'bg-medical-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-medical-blue'
              }`}
            >
              <Calendar size={16} />
              <span>{isTelugu ? 'సర్జరీకి ముందు (Pre-Op)' : 'Pre-Op Instructions'}</span>
            </button>
            <button
              onClick={() => setActiveTab('post')}
              className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'post'
                  ? 'bg-medical-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-medical-blue'
              }`}
            >
              <Activity size={16} />
              <span>{isTelugu ? 'సర్జరీ తర్వాత (Post-Op)' : 'Post-Op Home Care'}</span>
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'emergency'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <AlertTriangle size={16} />
              <span>{isTelugu ? 'హెచ్చరికలు (Warning Signs)' : 'Warning Signs'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'pre' && (
            <motion.div
              key="pre"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-5xl mx-auto"
            >
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                <ShieldCheck size={22} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-sans">
                  <strong>{isTelugu ? 'రోగి గమనిక:' : 'Interactive Patient Checklist:'}</strong>{' '}
                  {isTelugu 
                    ? 'మీరు పూర్తి చేసిన ప్రతి అంశంపై టిక్ చేయండి. సందేహాలు ఉంటే మా క్లినికల్ కోఆర్డినేటర్‌ను సంప్రదించండి.'
                    : 'Tap on each item as you prepare for your procedure. You can check off completed tasks to ensure nothing is missed on surgery day.'}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {preOpSteps.map((step) => {
                  const isChecked = !!checkedItems[step.id];
                  return (
                    <div
                      key={step.id}
                      onClick={() => toggleCheck(step.id)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer select-none card-shadow ${
                        isChecked 
                          ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-500/20' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                          }`}>
                            {isChecked && <CheckCircle2 size={16} />}
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-medical-teal font-sans">
                            {step.timing}
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          step.tag === 'Mandatory' || step.tag === 'అత్యవసరం'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {step.tag}
                        </span>
                      </div>

                      <h3 className={`font-serif font-bold text-lg mb-2 ${
                        isChecked ? 'line-through text-slate-500' : 'text-medical-blue'
                      }`}>
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'post' && (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-5">
                {postOpSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={step.id} 
                      className="p-6 rounded-3xl bg-white border border-slate-200 card-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-medical-teal flex items-center justify-center">
                            <Icon size={22} />
                          </div>
                          <span className="px-3 py-1 rounded-full bg-medical-blue/10 text-medical-blue text-[10px] font-extrabold uppercase tracking-wider">
                            {step.badge}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-lg text-medical-blue mb-2.5">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-medical-teal">
                        <CheckCircle2 size={14} />
                        <span>{isTelugu ? 'వైద్యపరంగా ఆమోదించబడింది' : 'Clinically Monitored Protocol'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'emergency' && (
            <motion.div
              key="emergency"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-200">
                <div className="flex items-center gap-3 mb-3 text-rose-800">
                  <AlertTriangle size={24} className="flex-shrink-0" />
                  <h3 className="font-serif font-bold text-xl">
                    {isTelugu ? 'ఎమర్జెన్సీ రెడ్ ఫ్లాగ్ లక్షణాలు' : 'Post-Surgical Emergency Red Flags'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans mb-6">
                  {isTelugu 
                    ? 'కింది లక్షణాలలో ఏ ఒక్కటి కనిపించినా ఆలస్యం చేయకుండా వెంటనే మా అత్యవసర డెస్క్‌ను సంప్రదించండి.'
                    : 'Endocrine surgeries are exceptionally safe, but if you or your family notice any of the following symptoms, take action immediately.'}
                </p>

                <div className="space-y-3.5">
                  {emergencyAlerts.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm">
                      <h4 className="text-sm font-bold text-rose-700 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-700 mt-1.5 ml-7 font-sans">
                        👉 <strong>{isTelugu ? 'చేయవలసిన చర్య:' : 'Action Required:'}</strong> {item.action}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-rose-900 font-sans text-center sm:text-left">
                    <span className="font-bold">{isTelugu ? '24/7 అత్యవసర సంప్రదింపు:' : 'Direct Emergency Contact:'}</span> Apollo Health City & Maharanipeta Helpdesk
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="tel:+919133685222"
                      className="px-5 py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                    >
                      <Phone size={14} />
                      <span>+91 9133685222</span>
                    </a>
                    <a
                      href="https://wa.me/916300550392?text=EMERGENCY%20POST-OP%20QUERY%3A%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                    >
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Booking Trigger */}
        {onBookClick && (
          <div className="mt-12 text-center">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-medical-blue text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-medical-blue-dark transition-all cursor-pointer"
            >
              <span>{isTelugu ? 'ముందస్తు సంప్రదింపు బుక్ చేయండి' : 'Schedule Pre-Surgical Consultation'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
