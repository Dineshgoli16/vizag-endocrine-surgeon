import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award, ShieldCheck, Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  procedure: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sravani K.',
    location: 'Maharanipeta, Visakhapatnam',
    procedure: 'Scarless TOETVA Thyroidectomy',
    quote: 'I was very anxious about having a big neck scar at age 26. Dr. Dinesh Goli suggested Scarless TOETVA through the lip. Today, nobody can even tell I had thyroid surgery! My voice was perfectly normal right from day one.',
    rating: 5
  },
  {
    name: 'Ramesh Varma',
    location: 'Arilova, Visakhapatnam',
    procedure: 'Focused Parathyroid Surgery (MIP)',
    quote: 'For 3 years I suffered from repeated kidney stones and severe body fatigue. My calcium was 11.2. Dr. Dinesh accurately localized the parathyroid adenoma on scan and removed it through a tiny 2 cm cut. My stones have never returned and my energy is back.',
    rating: 5
  },
  {
    name: 'Padmavathi M.',
    location: 'Gajuwaka, Visakhapatnam',
    procedure: 'Oncoplastic Breast Conservation Surgery',
    quote: 'When diagnosed with an early breast lump, other doctors suggested a complete mastectomy. Dr. Dinesh Goli explained breast conservation with oncoplastic remodeling. He removed the entire tumor with clear margins and kept my breast symmetry intact. His reassurance gave our whole family immense strength.',
    rating: 5
  },
  {
    name: 'K. Satyanarayana',
    location: 'Srikakulam (Referred to Vizag)',
    procedure: 'Total Thyroidectomy for Goiter',
    quote: 'I had a very large multinodular thyroid causing breathing difficulty when lying down. Dr. Dinesh used the nerve monitoring machine to protect my vocal cords during the entire surgery. The care at Venkateshwara Vascular Foundation and Apollo was exemplary.',
    rating: 5
  }
];

export default function PatientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex(i => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  const t = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="scroll-mt-28 lg:scroll-mt-32 py-20 lg:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
            Clinical Trust & Patient Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
            Patient Stories & Outcomes
          </h2>
          <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
            Real feedback from patients across Visakhapatnam, Coastal Andhra, and Odisha treated with precision endocrine and breast surgical care.
          </p>

          {/* Trust Stat Chips */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-medical-blue">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span>4.9 / 5 Patient Satisfaction</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-medical-blue">
              <ShieldCheck size={14} className="text-medical-teal" />
              <span>Intraoperative Nerve Safety Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-medical-blue">
              <Award size={14} className="text-medical-gold" />
              <span>MCh Specialist Care</span>
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 lg:p-16 card-shadow relative">
          <Quote className="absolute top-6 right-8 text-medical-teal/15 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Stars */}
            <div className="flex gap-1 text-amber-500">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-500" />
              ))}
            </div>

            <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-medical-blue leading-relaxed">
              "{t.quote}"
            </p>

            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base text-medical-blue">{t.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{t.location}</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-teal-100 text-medical-teal text-[11px] font-bold uppercase tracking-wider">
                  {t.procedure}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-sm cursor-pointer"
                  aria-label="Previous story"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xs text-slate-400 font-bold px-2">
                  {currentIndex + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-sm cursor-pointer"
                  aria-label="Next story"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
