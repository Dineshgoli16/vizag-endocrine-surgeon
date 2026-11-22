import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, Pill, AlertCircle, CheckCircle2, 
  Printer, Send, Sparkles, HeartPulse, ShieldAlert,
  ArrowRight, Info, Calendar
} from 'lucide-react';

interface MedicationTimetableProps {
  language?: 'en' | 'te';
}

export default function MedicationTimetable({ language = 'en' }: MedicationTimetableProps) {
  const isTelugu = language === 'te';

  const [wakeTime, setWakeTime] = useState('06:30');
  const [surgeryType, setSurgeryType] = useState<'total' | 'hemi' | 'para'>('total');
  const [takesCalcitriol, setTakesCalcitriol] = useState(true);
  const [takesPantoprazole, setTakesPantoprazole] = useState(true);

  // Helper to add minutes to HH:MM format
  const addMinutes = (timeStr: string, minutesToAdd: number): string => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  // Compute schedules based on wake time
  // Thyroxine: on waking
  // Breakfast: wakeTime + 45-60 min
  // Lunch: wakeTime + 7 hours (approx 1:30 PM)
  // Calcium Dose 1: wakeTime + 7.5 hours (at least 4 hours after Thyroxine)
  // Dinner: wakeTime + 14 hours (approx 8:30 PM)
  // Calcium Dose 2: wakeTime + 14.5 hours (approx 9:00 PM)

  const scheduleItems = [
    {
      time: addMinutes(wakeTime, 0),
      med: isTelugu ? 'లెవోథైరాక్సిన్ (Thyroxine)' : 'Levothyroxine (Thyroxine)',
      dosage: surgeryType === 'total' ? '100 - 150 mcg (As prescribed)' : '50 - 75 mcg (As prescribed)',
      instruction: isTelugu 
        ? 'ఉదయం లేవగానే పరగడుపున పూర్తి గ్లాసు మంచినీటితో మాత్రమే మింగాలి. 45-60 నిమిషాల వరకు టీ, కాఫీ లేదా ఎటువంటి ఆహారం తీసుకోరాదు.'
        : 'Take immediately upon waking on an empty stomach with a full glass of plain water. Do NOT consume tea, coffee, milk, or food for 45–60 minutes.',
      tag: isTelugu ? 'పరగడుపున' : 'Empty Stomach',
      tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: Pill
    },
    ...(takesPantoprazole ? [{
      time: addMinutes(wakeTime, 45),
      med: isTelugu ? 'పాంటోప్రజోల్ (Pantoprazole 40mg)' : 'Pantoprazole 40mg (Antacid)',
      dosage: '1 Tablet',
      instruction: isTelugu 
        ? 'అల్సర్లు, ఎసిడిటీ రాకుండా అల్పాహారానికి 15 నిమిషాల ముందు వేసుకోవాలి.'
        : 'Take 15 minutes before breakfast to prevent acidity and surgical stress gastritis.',
      tag: isTelugu ? 'టిఫిన్ ముందు' : 'Pre-Breakfast',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Pill
    }] : []),
    {
      time: addMinutes(wakeTime, 60),
      med: isTelugu ? 'అల్పాహారం (Breakfast)' : 'Healthy Breakfast',
      dosage: isTelugu ? 'తేలికపాటి ఆహారం' : 'Soft Bland Diet',
      instruction: isTelugu 
        ? 'ఇడ్లీ, దోశ, పాలు లేదా గుడ్డు వంటి బలవర్ధకమైన ఆహారం తీసుకోవచ్చు.'
        : 'Enjoy a nutritious, balanced meal. If you had Scarless TOETVA, rinse your mouth with warm saline or mouthwash immediately after eating.',
      tag: isTelugu ? 'భోజనం' : 'Meal Time',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: HeartPulse
    },
    {
      time: addMinutes(wakeTime, 420), // 7 hrs later (approx 1:30 PM)
      med: isTelugu ? 'మధ్యాహ్న భోజనం & క్యాల్షియం మోతాదు 1' : 'Lunch + Calcium Carbonate (Dose 1)',
      dosage: '500mg / 1000mg + Calcitriol 0.25mcg',
      instruction: isTelugu 
        ? 'మధ్యాహ్న భోజనం తర్వాత మొదటి క్యాల్షియం మాత్ర వేసుకోవాలి. (థైరాక్సిన్ వేసుకున్న సమయానికి దీనికి మధ్య కనీసం 4 గంటల విరామం ఉంటుంది).'
        : 'Take first Calcium tablet immediately after lunch. This provides the mandatory 4+ hour gap required after morning Thyroxine so both absorb fully.',
      tag: isTelugu ? 'భోజనం తర్వాత' : '4+ Hrs Post-Thyroxine',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Pill
    },
    ...(takesCalcitriol ? [{
      time: addMinutes(wakeTime, 450),
      med: isTelugu ? 'కాల్సిట్రియోల్ (Active Vitamin D3)' : 'Calcitriol 0.25 mcg (Active Vitamin D3)',
      dosage: '1 Capsule',
      instruction: isTelugu 
        ? 'పారాథైరాయిడ్ గ్రంధులు సాధారణ స్థితికి వచ్చేవరకు క్యాల్షియం రక్తంలో సులభంగా చేరడానికి ఇది తోడ్పడుతుంది.'
        : 'Enhances intestinal absorption of calcium while parathyroid glands regain baseline hormone secretion.',
      tag: isTelugu ? 'విటమిన్ డి' : 'Bioactive D3',
      tagColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: Sparkles
    }] : []),
    {
      time: addMinutes(wakeTime, 870), // 14.5 hrs later (approx 9:00 PM)
      med: isTelugu ? 'రాత్రి భోజనం & క్యాల్షియం మోతాదు 2' : 'Dinner + Calcium Carbonate (Dose 2)',
      dosage: '500mg / 1000mg',
      instruction: isTelugu 
        ? 'రాత్రి భోజనం ముగిసిన తర్వాత రెండో క్యాల్షియం మాత్ర వేసుకోవాలి. రాత్రిపూట రక్తంలో క్యాల్షియం తగ్గి తిమ్మిర్లు రాకుండా ఇది రక్షిస్తుంది.'
        : 'Take second Calcium tablet after dinner. This maintains steady nocturnal serum calcium levels and prevents midnight finger numbness or muscle cramps.',
      tag: isTelugu ? 'రాత్రి పూట' : 'Bedtime Stabilization',
      tagColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Pill
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    let msg = `*Dr. Dinesh Goli - Personalized Post-Op Medication Timetable*
`;
    msg += `Procedure: ${surgeryType === 'total' ? 'Total Thyroidectomy' : surgeryType === 'hemi' ? 'Hemithyroidectomy' : 'Parathyroidectomy'}
`;
    msg += `Waking Time: ${wakeTime}

`;
    msg += `*DAILY TIMETABLE:*
`;
    
    scheduleItems.forEach((item) => {
      msg += `⏰ *${item.time}*: ${item.med} (${item.dosage})
👉 ${item.instruction}

`;
    });

    msg += `⚠️ *GOLDEN SAFETY RULE:* Never take Calcium and Thyroxine together. Maintain minimum 4 hours gap.
`;
    msg += `📞 Emergency Helpline: +91 9133685222 / +91 6300550392
Vizag Endocrine Surgery Clinic`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="medication-tracker" className="py-20 lg:py-28 bg-slate-50 border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-medical-teal text-xs font-bold uppercase tracking-wider mb-4">
            <Clock size={14} />
            <span>{isTelugu ? 'ఔషధ సమయ నిర్వాహకం' : 'Smart Medication Safety Tool'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            {isTelugu ? 'పోస్ట్-ఆపరేటివ్ క్యాల్షియం & థైరాక్సిన్ టైమ్‌టేబుల్' : 'Post-Op Calcium & Medication Timetable'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            {isTelugu 
              ? 'థైరాక్సిన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 4 గంటల విరామం ఉండాలి. మీ ఉదయం నిద్రలేచే సమయాన్ని నమోదు చేయండి; మీ వ్యక్తిగత సమయ పట్టిక స్వయంచాలకంగా లెక్కించబడుతుంది.'
              : 'Levothyroxine and Calcium must NEVER be swallowed together because calcium blocks thyroxine absorption. Enter your wake-up time below to generate a safe, conflict-free daily timetable.'}
          </p>
        </div>

        {/* Golden Safety Banner */}
        <div className="mb-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-sm flex items-start gap-3.5">
          <ShieldAlert size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed font-sans">
            <strong className="font-bold text-amber-950">
              {isTelugu ? 'వైద్యపరమైన గోల్డెన్ రూల్ (4-గంటల నిబంధన):' : 'Golden Rule of Endocrine Medication (4-Hour Rule):'}
            </strong>{' '}
            {isTelugu 
              ? 'థైరాయిడ్ మాత్ర (Levothyroxine) మరియు క్యాల్షియం మాత్రలను ఒకేసారి ఎప్పుడూ తీసుకోకూడదు. క్యాల్షియం వల్ల థైరాయిడ్ మందు శరీరానికి చేరదు. కనీసం 4 గంటల విరామం తప్పనిసరి.'
              : 'Calcium binds Levothyroxine in the stomach and stops your body from absorbing it. Always maintain at least a 4-hour gap between your morning Thyroxine and your afternoon Calcium supplement.'}
          </div>
        </div>

        {/* Interactive Controls Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg mb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
            
            {/* Wake Up Time Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-sans">
                {isTelugu ? 'మీరు నిద్రలేచే సమయం' : 'Your Waking Time'}
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal"
                />
              </div>
            </div>

            {/* Surgery Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-sans">
                {isTelugu ? 'సర్జరీ రకం' : 'Surgery Performed'}
              </label>
              <select
                value={surgeryType}
                onChange={(e) => setSurgeryType(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal"
              >
                <option value="total">{isTelugu ? 'టోటల్ థైరాయిడెక్టమీ' : 'Total Thyroidectomy'}</option>
                <option value="hemi">{isTelugu ? 'హెమిథైరాయిడెక్టమీ' : 'Hemithyroidectomy'}</option>
                <option value="para">{isTelugu ? 'పారాథైరాయిడ్ సర్జరీ' : 'Parathyroidectomy'}</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={takesCalcitriol}
                  onChange={(e) => setTakesCalcitriol(e.target.checked)}
                  className="w-4 h-4 rounded text-medical-teal focus:ring-medical-teal"
                />
                <span>{isTelugu ? 'విటమిన్ D3 / Calcitriol' : 'Active Calcitriol'}</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={takesPantoprazole}
                  onChange={(e) => setTakesPantoprazole(e.target.checked)}
                  className="w-4 h-4 rounded text-medical-teal focus:ring-medical-teal"
                />
                <span>{isTelugu ? 'యాంటాసిడ్ (Pantoprazole)' : 'Antacid (Pantocid)'}</span>
              </label>
            </div>

          </div>
        </div>

        {/* Generated Schedule Timeline */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print-area">
          
          {/* Printable Header (Visible on print & web) */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-medical-blue to-medical-blue-dark text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-medical-gold block mb-1">
                Dr. Dinesh Goli • MCh Endocrine Surgery (MMC)
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl">
                {isTelugu ? 'రోజువారీ ఔషధ సమయ పట్టిక' : 'Conflict-Free Daily Medication Schedule'}
              </h3>
              <p className="text-xs text-white/80 font-sans mt-0.5">
                Venkateshwara Vascular Foundation & Apollo Health City, Visakhapatnam
              </p>
            </div>

            <div className="flex items-center gap-2.5 no-print">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all cursor-pointer shadow-sm"
              >
                <Printer size={15} />
                <span>{isTelugu ? 'ప్రింట్ / PDF' : 'Print / PDF'}</span>
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Send size={15} />
                <span>{isTelugu ? 'వాట్సాప్ చేసుకోండి' : 'WhatsApp Me'}</span>
              </button>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="p-6 sm:p-8 divide-y divide-slate-100 space-y-5">
            {scheduleItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="pt-5 first:pt-0 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="sm:w-32 flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-medical-blue font-bold text-sm tracking-tight shadow-inner">
                      <Clock size={14} className="text-medical-teal" />
                      {item.time}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-medical-blue">
                        {item.med}
                      </h4>
                      <span className="text-xs font-semibold text-slate-500">
                        • {item.dosage}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pt-0.5">
                      {item.instruction}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500 font-sans">
            <span>
              <strong>Note:</strong> Dosages should be confirmed with Dr. Dinesh Goli based on your post-op Serum Calcium and PTH reports.
            </span>
            <span className="font-bold text-medical-blue">
              Direct Helpline: +91 9133685222
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
