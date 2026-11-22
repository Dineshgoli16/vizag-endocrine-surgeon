import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Award, FileText, CheckCircle2, 
  ExternalLink, Sparkles, Building2, ShieldCheck, 
  GraduationCap, Stethoscope, Users, ChevronRight
} from 'lucide-react';

interface ResearchPedigreeProps {
  onBookClick?: () => void;
  language?: 'en' | 'te';
}

export default function ResearchPedigree({ onBookClick, language = 'en' }: ResearchPedigreeProps) {
  const [selectedCase, setSelectedCase] = useState(0);

  const isTelugu = language === 'te';

  const publications = [
    {
      title: isTelugu ? 'స్కార్‌లెస్ TOETVA థైరాయిడెక్టమీ: సర్జికల్ ఫలితాలు & నరాల భద్రత' : 'Transoral Endoscopic Thyroidectomy (TOETVA): Surgical Safety & RLN Voice Outcomes',
      forum: 'Indian Association of Endocrine Surgeons (IAES)',
      summary: isTelugu 
        ? 'కింది పెదవి ద్వారా చేసే థైరాయిడ్ సర్జరీలో స్వర నరాల (RLN) భద్రత మరియు సున్నా మెడ మచ్చతో రోగుల వేగవంతమైన రికవరీ పై పరిశోధన పత్రం.'
        : 'Clinical review of vestibular endoscopic approaches, continuous Intraoperative Nerve Monitoring (IONM), and 0% permanent hypoparathyroidism in benign and early malignant thyroid nodules.',
      tag: 'Scarless TOETVA'
    },
    {
      title: isTelugu ? 'ప్రాథమిక హైపర్‌పారాథైరాయిడిజంలో మినిమల్లీ ఇన్వాసివ్ సర్జరీ (MIP)' : 'Minimally Invasive Parathyroidectomy (MIP) with Sestamibi SPECT Localization',
      forum: 'Endocrine Surgery Clinical Series',
      summary: isTelugu 
        ? 'కిడ్నీలో రాళ్లు మరియు అధిక క్యాల్షియం ఉన్న రోగులలో చిన్న కోతతో పారాథైరాయిడ్ ఎడినోమాను సురక్షితంగా తొలగించడం.'
        : 'Targeted single-gland exploration for hyperparathyroidism using preoperative 4D-CT/Sestamibi SPECT and intraoperative PTH confirmation, curing recurrent kidney stones.',
      tag: 'Parathyroid Adenoma'
    },
    {
      title: isTelugu ? 'రొమ్ము క్యాన్సర్‌లో ఆంకోప్లాస్టిక్ బ్రెస్ట్ కన్జర్వేషన్ (OBCS)' : 'Oncoplastic Breast Conservation Surgery: Combining Oncological Clearance & Cosmesis',
      forum: 'Breast Oncology & Reconstructive Surgery',
      summary: isTelugu 
        ? 'రొమ్ము తీసివేయకుండా, కణితిని తొలగించి సహజ ఆకారాన్ని కాపాడే ఆంకోప్లాస్టిక్ పద్ధతులు.'
        : 'Volume displacement and local flap remodeling allowing generous negative margins while preserving natural aesthetic breast symmetry in early breast malignancies.',
      tag: 'Oncoplastic Breast'
    },
    {
      title: isTelugu ? 'ఛాతీ లోపలికి విస్తరించిన భారీ థైరాయిడ్ (Giant Retrosternal Goiter)' : 'Transcervical Delivery of Giant Retrosternal Goiters without Full Sternotomy',
      forum: 'Advanced Endocrine Surgical Case Review',
      summary: isTelugu 
        ? 'ఛాతీ ఎముకను కోయకుండా కేవలం మెడ భాగం నుంచే భారీ థైరాయిడ్ గడ్డను సురక్షితంగా బయటకు తీసే ప్రత్యేక నైపుణ్యం.'
        : 'Safe cervical mobilization of large mediastinal goiters compressing the trachea, sparing great vessel integrity and preserving vocal cord functionality without sternotomy.',
      tag: 'Complex Thyroid'
    }
  ];

  const credentialsList = [
    {
      degree: 'M.Ch Endocrine Surgery',
      institution: 'Madras Medical College (MMC), Chennai',
      detail: isTelugu ? 'భారతదేశంలోనే అత్యంత ప్రతిష్టాత్మకమైన సూపర్ స్పెషాలిటీ డిగ్రీ' : 'Premier superspecialty training at South Asia\'s historic endocrine surgical unit'
    },
    {
      degree: 'DNB General Surgery',
      institution: 'National Board of Examinations (NBE), New Delhi',
      detail: isTelugu ? 'జాతీయ స్థాయి గుర్తింపు పొందిన సర్జికల్ శిక్షణ' : 'Rigorous board certification across complex operative general surgery'
    },
    {
      degree: 'MBBS Medical Graduation',
      institution: 'Premier Medical University',
      detail: isTelugu ? 'ప్రాథమిక వైద్య విద్య మరియు క్లినికల్ పునాది' : 'Comprehensive clinical foundation and clinical diagnostic training'
    },
    {
      degree: 'Life Member - IAES & ASI',
      institution: 'Indian Assoc. of Endocrine Surgeons & Assoc. of Surgeons of India',
      detail: isTelugu ? 'జాతీయ మరియు అంతర్జాతీయ సర్జికల్ వేదికలలో క్రియాశీలక సభ్యత్వం' : 'Continuous academic engagement and modern clinical guidelines contributor'
    }
  ];

  return (
    <section id="research" className="py-20 lg:py-28 bg-slate-bg border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-medical-teal text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap size={15} />
            <span>{isTelugu ? 'అకడమిక్ & పరిశోధనా నైపుణ్యం' : 'Academic Pedigree & Surgical Research'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            {isTelugu ? 'డాక్టర్ దినేష్ గోలి గారి అకడమిక్ నేపథ్యం' : 'MCh Pedigree & Clinical Case Milestones'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            {isTelugu 
              ? 'మద్రాస్ మెడికల్ కాలేజ్ (MMC) నుండి ఎం.సి.హెచ్ ఎండోక్రైన్ సర్జరీ డిగ్రీ సాధించిన విశేష అనుభవజ్ఞులు. సంక్లిష్టమైన థైరాయిడ్, పారాథైరాయిడ్ మరియు బ్రెస్ట్ సర్జరీలలో అత్యాధునిక పరిశోధన మరియు క్లినికల్ నైపుణ్యం.'
              : 'Superspecialty surgical pedigree from the historic Department of Endocrine Surgery at Madras Medical College (MMC), Chennai. Dedicated to evidence-based outcomes, nerve monitoring safety, and scarless techniques.'}
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {credentialsList.map((cred, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-medical-teal flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="font-serif font-bold text-lg text-medical-blue mb-1">
                  {cred.degree}
                </h3>
                <p className="text-xs font-bold text-medical-teal uppercase tracking-wider mb-2 font-sans">
                  {cred.institution}
                </p>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {cred.detail}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <CheckCircle2 size={12} className="text-medical-teal" />
                <span>Verified Superspecialty</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key Surgical Research & Case Series */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-medical-teal block font-sans">
                {isTelugu ? 'పరిశోధనా ముఖ్యాంశాలు' : 'Clinical Focus Areas'}
              </span>
              <h3 className="font-serif font-bold text-2xl text-medical-blue">
                {isTelugu ? 'కీలక సర్జికల్ కేస్ స్టడీస్ & కాన్ఫరెన్స్ పేపర్స్' : 'Surgical Case Series & Presentations'}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <Building2 size={14} className="text-medical-blue" />
              <span>Madras Medical College Alumni</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {publications.map((pub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-medical-blue/10 text-medical-blue text-[10px] font-extrabold uppercase tracking-wider">
                      {pub.tag}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 font-sans">
                      {pub.forum}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-medical-blue mb-2 leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {pub.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-medical-teal flex items-center gap-1">
                    <ShieldCheck size={14} /> Dr. Dinesh Goli MCh Series
                  </span>
                  {onBookClick && (
                    <button
                      onClick={onBookClick}
                      className="text-medical-blue hover:text-medical-teal font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Consult</span> <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
