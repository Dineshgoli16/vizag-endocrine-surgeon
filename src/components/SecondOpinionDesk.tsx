import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, ChevronRight, 
  MessageSquare, Phone, Award, Sparkles, Upload, 
  FileCheck, X
} from 'lucide-react';

interface SecondOpinionDeskProps {
  onBookClick: () => void;
  language?: 'en' | 'te';
}

export default function SecondOpinionDesk({ onBookClick, language = 'en' }: SecondOpinionDeskProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isTelugu = language === 'te';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const openWhatsAppReport = () => {
    let msg = `Hello Dr. Dinesh Goli,

I have an existing Ultrasound / FNAC / Biopsy report and would like to request an expert second opinion regarding my surgical options.`;
    if (selectedFile) {
      msg += `

I have attached my report file: *${selectedFile.name}* (${(selectedFile.size / 1024 / 1024).toFixed(1)} MB).`;
    }
    msg += `

Could you please review my case and advise on Scarless TOETVA / Organ-Preserving treatment?`;

    const text = encodeURIComponent(msg);
    window.open(`https://wa.me/916300550392?text=${text}`, '_blank');
  };

  return (
    <section id="second-opinion" className="py-20 lg:py-28 bg-gradient-to-br from-medical-blue to-medical-blue-dark text-white relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-medical-teal/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-medical-gold text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 border border-white/15">
              <Sparkles size={14} /> {isTelugu ? 'నిపుణుల రెండవ అభిప్రాయం' : 'Expert Clinical Review'}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {isTelugu ? (
                <>
                  అల్ట్రాసౌండ్ లేదా బయాప్సీ రిపోర్ట్ ఉందా? <br className="hidden sm:inline" />
                  <span className="text-medical-gold">డాక్టర్ దినేష్ గోలి గారి సెకండ్ ఒపీనియన్ పొందండి.</span>
                </>
              ) : (
                <>
                  Have an Existing Scan or Biopsy Report? <br className="hidden sm:inline" />
                  <span className="text-medical-gold">Get an Expert Second Opinion.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-xl">
              {isTelugu 
                ? 'మెడపై పెద్ద కోత పెట్టే ఓపెన్ సర్జరీకి వెళ్లే ముందు, డాక్టర్ దినేష్ గోలి (M.Ch ఎండోక్రైన్ సర్జన్) గారిని సంప్రదించండి. అనేక సందర్భాలలో అవయవాన్ని కాపాడుతూ, మెడపై ఎటువంటి మచ్చ లేకుండా స్కార్‌లెస్ TOETVA పద్ధతి ద్వారా శస్త్రచికిత్స చేయవచ్చు.'
                : 'Before committing to an irreversible open neck incision or complete gland removal, consult Dr. Dinesh Goli (MCh Endocrine Surgery). Many patients qualify for cosmetic Scarless TOETVA or Breast Conservation, avoiding large scars and unnecessary organ removal.'}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-medical-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                    {isTelugu ? 'అవయవ సంరక్షణ' : 'Avoid Over-Treatment'}
                  </h4>
                  <p className="text-xs text-white/70 mt-1">
                    {isTelugu ? 'హెమిథైరాయిడెక్టమీ ద్వారా సగం థైరాయిడ్ కాపాడటం.' : 'Determine if hemithyroidectomy can save half your natural gland.'}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-medical-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                    {isTelugu ? 'స్కార్‌లెస్ TOETVA సాధ్యత' : 'Scarless Feasibility'}
                  </h4>
                  <p className="text-xs text-white/70 mt-1">
                    {isTelugu ? 'మెడపై సున్నా మచ్చతో మీ గడ్డను తీయవచ్చో లేదో నిర్ధారించుకోండి.' : 'Confirm if your nodule can be removed with zero neck scars via TOETVA.'}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-medical-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                    {isTelugu ? 'పాథాలజీ పునఃపరిశీలన' : 'Pathology Re-evaluation'}
                  </h4>
                  <p className="text-xs text-white/70 mt-1">
                    {isTelugu ? 'బెథెస్డా III/IV మరియు టిరాడ్స్ స్కోర్ల కచ్చితమైన పోలిక.' : 'Correlation of Bethesda III/IV cytology with advanced ultrasound findings.'}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-medical-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                    {isTelugu ? 'రొమ్ము ఆంకోప్లాస్టిక్ పద్ధతులు' : 'Breast Sparing Options'}
                  </h4>
                  <p className="text-xs text-white/70 mt-1">
                    {isTelugu ? 'మొత్తం రొమ్మును తొలగించకుండా కణితిని మాత్రమే తొలగించడం.' : 'Explore oncoplastic remodeling instead of radical breast amputation.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Box & File Attachment */}
          <div className="lg:col-span-5 bg-white text-medical-blue-dark p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 border-4 border-medical-gold/30">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-medical-teal">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-medical-blue">
                  {isTelugu ? 'రిపోర్ట్ సమర్పణ డెస్క్' : 'Report Submission Desk'}
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  {isTelugu ? 'పరిశీలన కోసం మీ రిపోర్ట్‌ను అప్‌లోడ్ చేయండి' : 'Attach your report for quick clinical triage'}
                </p>
              </div>
            </div>

            {/* Interactive File Picker Box */}
            <div className="border-2 border-dashed border-slate-300 hover:border-medical-teal rounded-2xl p-5 text-center transition-all bg-slate-50/70">
              {selectedFile ? (
                <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-xl text-left">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileCheck size={22} className="text-medical-teal flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-medical-blue truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for WhatsApp
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload size={24} className="mx-auto text-medical-teal mb-2" />
                  <span className="text-xs font-bold text-medical-blue block">
                    {isTelugu ? 'రిపోర్ట్ ఫైల్ ఎంచుకోండి (PDF లేదా ఫోటో)' : 'Select Ultrasound or Biopsy File (PDF/Image)'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Tap to browse documents on phone or computer
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {isTelugu 
                ? 'మీరు మీ అల్ట్రాసౌండ్, ఎఫ్‌ఎన్‌ఏసి బయాప్సీ లేదా మమోగ్రామ్ రిపోర్టులను వాట్సాప్ ద్వారా నేరుగా పంపి డాక్టర్ దినేష్ గోలి గారి ప్రాథమిక సలహా పొందవచ్చు.'
                : 'Share your diagnostic reports directly on WhatsApp for preliminary clinical assessment before visiting our outpatient clinics in Maharanipeta or Apollo Health City.'}
            </p>

            <div className="space-y-3 pt-1">
              <button
                onClick={openWhatsAppReport}
                className="w-full py-4 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 68.9 27.1 106.1 27.1h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                <span>{selectedFile ? (isTelugu ? 'రిపోర్ట్‌ను వాట్సాప్‌లో పంపండి' : 'Send Attached Report via WhatsApp') : (isTelugu ? 'వాట్సాప్‌లో సంప్రదించండి' : 'Share Reports on WhatsApp')}</span>
              </button>

              <button
                onClick={onBookClick}
                className="w-full py-4 px-6 rounded-xl bg-medical-blue hover:bg-medical-blue-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>{isTelugu ? 'క్లినిక్‌లో అపాయింట్‌మెంట్ బుక్ చేయండి' : 'Schedule In-Person Consultation'}</span> <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
