import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, CheckCircle2, FileText, Building2, 
  Phone, ArrowRight, HelpCircle, BadgeCheck, 
  CreditCard, ExternalLink, Clock, Sparkles
} from 'lucide-react';

interface InsuranceGuideProps {
  onBookClick?: () => void;
  language?: 'en' | 'te';
}

export default function InsuranceGuide({ onBookClick, language = 'en' }: InsuranceGuideProps) {
  const [activeStep, setActiveStep] = useState(0);

  const isTelugu = language === 'te';

  const insurers = [
    { name: 'Star Health Insurance', tier: 'Direct Cashless', color: 'from-blue-600 to-indigo-700' },
    { name: 'Care Health (Religare)', tier: 'Direct Cashless', color: 'from-emerald-600 to-teal-700' },
    { name: 'HDFC ERGO', tier: 'Fast Track Pre-Auth', color: 'from-red-600 to-rose-700' },
    { name: 'ICICI Lombard', tier: 'Fast Track Pre-Auth', color: 'from-orange-600 to-amber-700' },
    { name: 'MediBuddy TPA', tier: 'Empaneled Network', color: 'from-cyan-600 to-blue-700' },
    { name: 'Bajaj Allianz', tier: 'Direct Cashless', color: 'from-sky-600 to-blue-800' },
    { name: 'Vidal Health TPA', tier: 'Empaneled Network', color: 'from-violet-600 to-purple-700' },
    { name: 'Paramount TPA', tier: 'Empaneled Network', color: 'from-teal-600 to-emerald-700' },
    { name: 'Public Sector (GIPSA)', tier: 'National / Oriental / United / New India', color: 'from-slate-700 to-slate-900' },
    { name: 'Aditya Birla Health', tier: 'Direct Cashless', color: 'from-rose-600 to-pink-700' },
    { name: 'Max Bupa (Niva Bupa)', tier: 'Direct Cashless', color: 'from-green-600 to-emerald-800' },
    { name: 'Tata AIG', tier: 'Fast Track Pre-Auth', color: 'from-blue-700 to-indigo-900' }
  ];

  const steps = [
    {
      num: '01',
      title: isTelugu ? 'డాక్టర్ సలహా & అడ్మిషన్ నోట్' : 'Consultation & Admission Requisition',
      timeline: isTelugu ? 'సర్జరీకి 3-5 రోజుల ముందు' : '3–5 Days Prior to Surgery',
      desc: isTelugu 
        ? 'డాక్టర్ దినేష్ గోలి గారు క్లినికల్ పరీక్ష అనంతరం సర్జరీ వివరాలు, డయాగ్నోసిస్ కోడ్స్ (ICD-10) మరియు అంచనా వ్యయంతో అడ్మిషన్ లెటర్ అందజేస్తారు.'
        : 'Following outpatient clinical evaluation, Dr. Dinesh Goli issues an admission recommendation note specifying surgical procedure codes, clinical diagnosis, and hospital cost estimate.',
      tip: isTelugu ? 'అల్ట్రాసౌండ్, ఎఫ్‌ఎన్‌ఏసి రిపోర్ట్‌లు సిద్ధంగా ఉంచుకోండి' : 'Keep all ultrasound & biopsy reports handy'
    },
    {
      num: '02',
      title: isTelugu ? 'ప్రీ-ఆథరైజేషన్ దరఖాస్తు' : 'Pre-Authorization Submission at TPA Desk',
      timeline: isTelugu ? 'సర్జరీకి 48-72 గంటల ముందు' : '48–72 Hours Prior',
      desc: isTelugu 
        ? 'అపోలో హెల్త్ సిటీ లేదా నెట్‌వర్క్ హాస్పిటల్ లోని ఇన్సూరెన్స్ డెస్క్ వద్ద మీ పాలసీ కార్డ్ మరియు డాక్యుమెంట్లను సమర్పించండి. డెస్క్ సిబ్బంది మీ టీపీఏకి ఆన్‌లైన్ దరఖాస్తు చేస్తారు.'
        : 'The hospital insurance/TPA desk at Apollo Health City uploads your policy card, ID proofs, and surgical requisition to your insurer portal for pre-authorization approval.',
      tip: isTelugu ? 'ఆధార్ కార్డ్ మరియు పాలసీ నంబర్ తప్పనిసరి' : 'Original Aadhar and active e-card required'
    },
    {
      num: '03',
      title: isTelugu ? 'ప్రాథమిక అనుమతి & అడ్మిషన్' : 'Initial Sanction & Cashless Admission',
      timeline: isTelugu ? 'అడ్మిషన్ రోజు' : 'Day of Admission',
      desc: isTelugu 
        ? 'టీపీఏ నుండి ప్రాథమిక అనుమతి (Initial Sanction) పత్రం అందుతుంది. ఆసుపత్రిలో చేరేటప్పుడు ఎటువంటి సర్జికల్ డిపాజిట్ చెల్లించవలసిన అవసరం లేకుండా అడ్మిషన్ జరుగుతుంది.'
        : 'The TPA grants an initial sanction letter. The patient is admitted smoothly with zero initial cash deposit towards authorized surgical expenses.',
      tip: isTelugu ? 'జీరో డిపాజిట్ నగదు రహిత సదుపాయం' : 'Zero surgical deposit on authorized claims'
    },
    {
      num: '04',
      title: isTelugu ? 'తుది బిల్లింగ్ & డిశ్చార్జ్' : 'Final Bill Settlement & Smooth Discharge',
      timeline: isTelugu ? 'డిశ్చార్జ్ రోజు' : 'Day of Discharge',
      desc: isTelugu 
        ? 'డిశ్చార్జ్ సమయంలో ఆసుపత్రి తుది బిల్లును టీపీఏకి సమర్పిస్తుంది. పాలసీ పరిధిలోని మొత్తం సొమ్మును ఇన్సూరెన్స్ చెల్లిస్తుంది; రోగి కేవలం కన్స్యూమబుల్స్ వంటి చిన్న నాన్-మెడికల్ ఖర్చులు మాత్రమే చెల్లిస్తారు.'
        : 'Upon surgery completion, final hospital billing is submitted to the TPA for closing sanction. The patient is discharged paying only non-medical consumables not covered by policy terms.',
      tip: isTelugu ? 'డిశ్చార్జ్ సమ్మరీ మరియు బిల్లుల కాపీ భద్రపరచుకోండి' : 'Collect complete discharge summary & bill'
    }
  ];

  const requiredDocs = [
    { name: isTelugu ? 'ఆధార్ కార్డ్ & పాన్ కార్డ్ (ఒరిజినల్ + జిరాక్స్)' : 'Patient\'s Government Photo ID (Aadhar Card & PAN Card)', req: true },
    { name: isTelugu ? 'యాక్టివ్ హెల్త్ ఇన్సూరెన్స్ కార్డు లేదా పాలసీ బాండ్' : 'Active Health Insurance Policy Card or Digital e-Card with Policy Number', req: true },
    { name: isTelugu ? 'డాక్టర్ దినేష్ గోలి గారి అడ్మిషన్ లెటర్ & ఓపీ స్లిప్' : 'Dr. Dinesh Goli\'s Consultation Prescription & Surgical Requisition Slip', req: true },
    { name: isTelugu ? 'అన్ని ల్యాబ్ పరీక్షలు, అల్ట్రాసౌండ్ మరియు బయాప్సీ రిపోర్టులు' : 'All relevant Diagnostic Records (Ultrasound Neck, FNAC Biopsy, Blood reports)', req: true },
    { name: isTelugu ? 'పాలసీదారుని బ్యాంక్ క్యాన్సిల్డ్ చెక్ (రీయింబర్స్‌మెంట్ కొరకు)' : 'Cancelled Bank Cheque of Policyholder (for claim reimbursement scenarios)', req: false },
    { name: isTelugu ? 'కార్పొరేట్ ఎంప్లాయ్ ఐడీ కార్డ్ (కార్పొరేట్ పాలసీలైతే)' : 'Corporate Employee ID Card (if covered under corporate group policy)', req: false }
  ];

  return (
    <section id="insurance" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>{isTelugu ? 'నగదు రహిత ఇన్సూరెన్స్ సేవలు' : '100% Cashless Support Available'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            {isTelugu ? 'హెల్త్ ఇన్సూరెన్స్ & టీపీఏ మార్గదర్శకాలు' : 'Health Insurance & Cashless TPA Support'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            {isTelugu 
              ? 'థైరాయిడ్, పారాథైరాయిడ్, అడ్రినల్ మరియు బ్రెస్ట్ సర్జరీలు దాదాపు అన్ని ప్రముఖ ఆరోగ్య బీమా పాలసీల ద్వారా కవర్ చేయబడతాయి. అపోలో హెల్త్ సిటీ, విశాఖపట్నం వద్ద పూర్తి నగదు రహిత సదుపాయం కలదు.'
              : 'Endocrine, Thyroid (including Scarless TOETVA), Parathyroid, Adrenal, and Oncoplastic Breast procedures are covered under major health insurance plans and corporate policies at Apollo Health City, Visakhapatnam.'}
          </p>
        </div>

        {/* 4-Step Cashless Roadmap */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-medical-blue">
                {isTelugu ? 'నగదు రహిత క్లెయిమ్ 4-దశల విధానం' : '4-Step Cashless Approval Journey'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                {isTelugu ? 'సులభమైన, పారదర్శకమైన అడ్మిషన్ ప్రక్రియ' : 'A transparent, stress-free process guided by our hospital desk'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <motion.div
                key={st.num}
                whileHover={{ y: -6 }}
                onClick={() => setActiveStep(i)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  activeStep === i 
                    ? 'bg-white border-medical-blue ring-2 ring-medical-blue/20 shadow-xl' 
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-bold text-medical-teal">
                      {st.num}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {st.timeline}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-lg text-medical-blue mb-2.5 leading-snug">
                    {st.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 size={13} className="flex-shrink-0" />
                  <span className="truncate">{st.tip}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Insurers & TPAs Grid */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-200 card-shadow mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-medical-teal block font-sans">
                {isTelugu ? 'ఆమోదించబడిన నెట్‌వర్క్' : 'Empaneled Partners'}
              </span>
              <h3 className="font-serif font-bold text-2xl text-medical-blue">
                {isTelugu ? 'ప్రముఖ ఇన్సూరెన్స్ కంపెనీలు & టీపీఏలు' : 'Major Insurers & TPAs Accepted'}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <Building2 size={14} className="text-medical-blue" />
              <span>Apollo Health City & Vizag Surgical Centers</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {insurers.map((ins, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${ins.color}`} />
                  <span className="text-xs font-bold text-slate-800 font-sans group-hover:text-medical-blue transition-colors">
                    {ins.name}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight">
                  {ins.tier}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed font-sans flex items-start gap-3">
            <Sparkles size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>{isTelugu ? 'ప్రభుత్వ & కార్పొరేట్ పథకాలు:' : 'Government & Corporate Health Schemes:'}</strong>{' '}
              {isTelugu 
                ? 'ఉద్యోగుల హెల్త్ స్కీమ్ (EHS), సీజీహెచ్ఎస్ మరియు ఇతర ప్రభుత్వ కార్పొరేట్ ప్యానెల్ రోగులు ఆసుపత్రి అడ్మిషన్ నిబంధనల ప్రకారం క్లెయిమ్ చేసుకోవచ్చు. వివరాలకు మా డెస్క్‌ను సంప్రదించండి.'
                : 'Patients under state employee health schemes (EHS), CGHS, and corporate health tie-ups can avail benefits as per hospital empanelment regulations at Apollo Health City.'}
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-medical-teal block font-sans">
              {isTelugu ? 'డాక్యుమెంట్ చెక్‌లిస్ట్' : 'Preparation Checklist'}
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-medical-blue">
              {isTelugu ? 'నగదు రహిత క్లెయిమ్‌కు కావలసిన పత్రాలు' : 'Documents Required for Cashless Admission'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {isTelugu 
                ? 'ఆసుపత్రికి వచ్చే ముందు ఈ క్రింది పత్రాల ఒరిజినల్స్ మరియు 2 సెట్ల జిరాక్స్ ప్రతులను సిద్ధం చేసుకోండి. దీనివల్ల అనుమతి ప్రక్రియ చాలా వేగవంతమవుతుంది.'
                : 'Bring these original documents along with 2 sets of photocopies on admission day. Having your reports and insurance card ready ensures immediate processing by the TPA desk.'}
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/916300550392?text=Hello%20Dr.%20Dinesh%20Goli%2C%20I%20have%20an%20insurance%20query%20regarding%20my%20planned%20surgery..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <span>{isTelugu ? 'ఇన్సూరెన్స్ డెస్క్‌తో వాట్సాప్ చేయండి' : 'WhatsApp Insurance Coordinator'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {requiredDocs.map((doc, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  doc.req ? 'bg-medical-blue text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <FileText size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 font-sans">
                      {doc.name}
                    </p>
                    {doc.req && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold uppercase flex-shrink-0">
                        {isTelugu ? 'తప్పనిసరి' : 'Required'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
