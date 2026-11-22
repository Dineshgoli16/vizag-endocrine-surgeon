/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MapPin, ExternalLink, Award, BookOpen, 
  Stethoscope, Users, ChevronRight, Mail, Clock, Activity, 
  MessageCircle, Send, Bot, Loader2, AlertCircle, ShieldCheck,
  CheckCircle2, Star, Sparkles, HeartHandshake, ArrowUpRight,
  Calendar, FileText, HelpCircle, Layers, Shield
} from 'lucide-react';
import OpenAI from 'openai';
import Gallery from './Gallery';
import ScarlessComparison from './components/ScarlessComparison';
import SymptomChecker from './components/SymptomChecker';
import PatientGuideModal from './components/PatientGuideModal';
import PatientTestimonials from './components/PatientTestimonials';
import AnatomyExplorer from './components/AnatomyExplorer';
import ThyroidRiskCalculator from './components/ThyroidRiskCalculator';
import InteractiveFAQ from './components/InteractiveFAQ';
import SecondOpinionDesk from './components/SecondOpinionDesk';

const SYSTEM_PROMPT = `You are Dr. Dinesh Goli's AI Clinical Assistant for an advanced Endocrine & Breast Surgery practice in Visakhapatnam (Vizag), Andhra Pradesh, India.
Dr. Dinesh Goli's Credentials:
- MBBS, DNB (General Surgery)
- M.Ch Endocrine Surgery (Madras Medical College - MMC)
- Advanced expertise in Thyroid, Parathyroid, Adrenal, and Oncoplastic Breast Surgery.
- Special pioneer in Scarless TOETVA (Transoral Endoscopic Thyroidectomy Vestibular Approach) leaving zero neck scars.

CLINIC LOCATIONS IN VISAKHAPATNAM (VIZAG):
1. Consultation Clinic: Venkateshwara Vascular Foundation, 14-1-128, 1st Floor, Noworji Road, Maharanipeta, Visakhapatnam - 530002.
   - Timings: 5:00 PM – 7:00 PM (Monday - Saturday)
2. Hospital Consultations: Apollo Health City, Health City, Arilova, Visakhapatnam - 530040.
   - Timings: 1:00 PM – 4:00 PM (Monday - Friday)

CONTACT DETAILS:
- Phone / Appointments: +91 9133685222
- WhatsApp Support: +91 6300550392
- Email: Dinesh.goli@gmail.com

RULES:
1. Always be professional, empathetic, and reassuring.
2. Explain conditions clearly in simple English and occasionally in conversational Telugu for patients from Vizag, Coastal Andhra, and Odisha (e.g., "నమస్కారం, Dr. Dinesh Goli clinic కి స్వాగతం").
3. Do not make definitive personal diagnoses; recommend booking a clinical consultation.
4. Keep answers concise (under 180 words) with clear bullet points.
5. In emergencies or severe neck pain/breathing trouble, advise calling +91 9133685222 immediately.`;

const INITIAL_MESSAGES = [
  { 
    role: 'bot' as const, 
    content: "Namaskaram & Welcome! I am Dr. Dinesh Goli's AI Assistant.\n\nI can help you with:\n• Scarless TOETVA Thyroid Surgery (Zero Neck Scar)\n• Second opinion on Ultrasound & FNAC Biopsy reports\n• Thyroid swellings, nodules & cancer care\n• Parathyroid adenoma, high calcium & recurrent kidney stones\n• Breast lumps, mammograms & oncoplastic surgery\n• OPD timings in Maharanipeta & Apollo Health City\n\nHow may I help you today?" 
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', content: string}[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [useLocalFallback, setUseLocalFallback] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const conversationHistory = useRef<{role: 'user' | 'model', content: string}[]>([]);

  // Modals & Guided Experience
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  // Appointment Form & Status
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    city: 'Venkateshwara Vascular Foundation (Maharanipeta, 5–7 PM)', 
    specialty: 'Thyroid / Parathyroid' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    name: string;
    phone: string;
    city: string;
    specialty: string;
  } | null>(null);

  const [announcement, setAnnouncement] = useState('Now accepting consultation bookings at Venkateshwara Vascular Foundation (Maharanipeta, 5–7 PM) & Apollo Health City (Arilova, 1–4 PM)');

  useEffect(() => {
    fetch('/api/announcement')
      .then(res => res.json())
      .then(data => {
        if (data.text) setAnnouncement(data.text);
      })
      .catch(() => {});
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return alert('Please enter both your name and phone number.');
    }
    
    setIsSubmitting(true);
    setBookingSuccess(false);

    const bookingPayload = { ...formData };
    setSubmittedBooking(bookingPayload);

    // 1. Dispatch directly to Dr. Dinesh Goli's email via FormSubmit (works on static GitHub Pages)
    try {
      await fetch('https://formsubmit.co/ajax/Dinesh.goli@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Patient Appointment: ${bookingPayload.name} (${bookingPayload.specialty})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: 'Dinesh.goli@gmail.com',
          'Patient Name': bookingPayload.name,
          'Mobile Phone': bookingPayload.phone,
          'Consultation Location': bookingPayload.city,
          'Specialty': bookingPayload.specialty,
          'Booking Platform': 'vizagendosurgeon.com',
          'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });
    } catch (err) {
      console.warn('FormSubmit email dispatch error:', err);
    }

    // 2. Dispatch to local/backend Express API if available
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
    } catch {
      // Ignored on static GitHub Pages
    }

    setBookingSuccess(true);
    setFormData({
      name: '',
      phone: '',
      city: 'Venkateshwara Vascular Foundation (Maharanipeta, 5–7 PM)',
      specialty: 'Thyroid / Parathyroid'
    });
    setIsSubmitting(false);
  };

  const openWhatsAppBooking = () => {
    const target = submittedBooking || formData;
    const text = encodeURIComponent(
      `Hello Dr. Dinesh Goli's team,\n\nI would like to book a consultation:\nName: ${target.name || 'Patient'}\nPhone: ${target.phone || 'N/A'}\nLocation: ${target.city}\nSpecialty: ${target.specialty}`
    );
    window.open(`https://wa.me/916300550392?text=${text}`, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    elem?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const getLocalFallback = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('scarless') || input.includes('toetva') || input.includes('scar')) {
      return `Scarless TOETVA (Transoral Endoscopic Thyroidectomy):\n\n• Zero visible cuts on the neck\n• Done through tiny punctures inside the lower lip\n• 4K magnified vision protects vocal cord nerves\n• Rapid recovery and discharge in 24-48 hrs\n\nConsult Dr. Dinesh Goli: 📞 9133685222`;
    }

    if (input.includes('book') || input.includes('appointment') || input.includes('schedule') || input.includes('timing')) {
      return `Consultation Clinics in Vizag:\n\n📍 1. Venkateshwara Vascular Foundation\n14-1-128, Noworji Road, Maharanipeta\n⏰ 5:00 PM – 7:00 PM (Mon-Sat)\n\n📍 2. Apollo Health City\nArilova, Visakhapatnam\n⏰ 1:00 PM – 4:00 PM (Mon-Fri)\n\n📞 Direct Desk: 9133685222\n💬 WhatsApp: 6300550392\n✉️ Email: Dinesh.goli@gmail.com`;
    }
    
    if (input.includes('thyroid')) {
      return `Thyroid Surgical Services by Dr. Dinesh Goli:\n\n• Thyroid Nodules & Goiter evaluation\n• Ultrasound TIRADS & FNAC testing\n• Total & Hemithyroidectomy\n• Intraoperative Nerve Monitoring (IONM) for vocal cord safety\n• Scarless TOETVA (Zero Neck Scar)\n\nBook: 9133685222`;
    }
    
    if (input.includes('parathyroid') || input.includes('pth') || input.includes('calcium') || input.includes('stone')) {
      return `Parathyroid & High Calcium:\n\n• Primary Hyperparathyroidism treatment\n• Sestamibi / 4D-CT targeted scan\n• Focused Minimally Invasive Parathyroidectomy\n• Permanent cure for recurrent kidney stones\n\nConsult: 9133685222`;
    }
    
    if (input.includes('adrenal')) {
      return `Adrenal Surgery:\n\n• Laparoscopic Adrenalectomy (tiny keyhole cuts)\n• Pheochromocytoma & Cushing's\n• Adrenal incidentalomas\n\nBook: 9133685222`;
    }
    
    if (input.includes('breast') || input.includes('lump') || input.includes('cancer')) {
      return `Breast Surgery & Oncoplasty:\n\n• Triple assessment of breast lumps\n• Breast Conservation Surgery (BCS)\n• Oncoplastic reshaping (saving breast appearance)\n• Sentinel Lymph Node Biopsy (prevents arm swelling)\n\nBook: 9133685222`;
    }
    
    return `Namaskaram! I can assist you with:\n🦋 Thyroid & Scarless TOETVA\n⚡ Parathyroid & High Calcium\n⬡ Adrenal Keyhole Surgery\n🌸 Breast Care & Oncoplasty\n📅 Appointment Booking\n\n📞 Call: 9133685222 | 💬 WhatsApp: 6300550392 | ✉️ Dinesh.goli@gmail.com`;
  };

  const callAIAPI = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_MINIMAX_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      setUseLocalFallback(true);
      return getLocalFallback(userMessage);
    }

    try {
      const openai = new OpenAI({
        baseURL: window.location.origin + '/api/opencode',
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      conversationHistory.current.push({ role: 'user', content: userMessage });
      
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory.current.map(msg => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      const completion = await openai.chat.completions.create({
        model: 'minimax-m2.5-free',
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 450,
      });

      const response = completion.choices[0].message.content || '';
      conversationHistory.current.push({ role: 'model', content: response });
      return response;
    } catch {
      setApiError(true);
      return getLocalFallback(userMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMsg = inputMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await callAIAPI(userMsg);
      setChatMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'bot', content: getLocalFallback(userMsg) }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-bg selection:bg-medical-teal selection:text-white flex flex-col font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 flex flex-col ${
          scrolled ? 'glass-morphism shadow-md' : 'bg-transparent'
        }`}
      >
        {/* Top Ticker */}
        <AnimatePresence>
          {announcement && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-medical-blue text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 border-b border-medical-gold/30"
            >
              <span className="w-2 h-2 rounded-full bg-medical-gold animate-pulse"></span>
              <span>{announcement}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center w-full transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
          {/* Logo & Doctor Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-medical-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-medical-blue/20 overflow-hidden relative border-2 border-medical-gold/40 group">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover relative z-10" 
                onError={(e) => { 
                  e.currentTarget.style.display = 'none'; 
                  e.currentTarget.nextElementSibling?.classList.remove('hidden'); 
                }} 
              />
              <Activity size={24} className="relative z-10 text-medical-gold hidden" />
            </div>
            <div className="leading-tight">
              <h1 className="font-serif font-bold text-lg sm:text-xl text-medical-blue tracking-tight">
                Dr. Dinesh Goli
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-medical-teal font-extrabold">
                MCh Endocrine & Breast Surgeon
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-600">
            <button onClick={() => scrollToSection('specialties')} className="hover:text-medical-teal transition-colors cursor-pointer">Specialties</button>
            <button onClick={() => scrollToSection('scarless')} className="hover:text-medical-teal text-medical-teal transition-colors flex items-center gap-1 cursor-pointer">
              <Sparkles size={13} className="text-medical-gold" /> Scarless TOETVA
            </button>
            <button onClick={() => scrollToSection('anatomy')} className="hover:text-medical-teal transition-colors cursor-pointer">Anatomy</button>
            <button onClick={() => scrollToSection('calculator')} className="hover:text-medical-teal transition-colors cursor-pointer">Risk Tool</button>
            <button onClick={() => scrollToSection('second-opinion')} className="hover:text-medical-teal text-medical-gold transition-colors cursor-pointer">2nd Opinion</button>
            <button onClick={() => scrollToSection('faqs')} className="hover:text-medical-teal transition-colors cursor-pointer">FAQs</button>
            <button onClick={() => scrollToSection('locations')} className="hover:text-medical-teal transition-colors cursor-pointer">Clinics</button>
            
            <a href="tel:+919133685222" className="text-red-700 font-extrabold border border-red-200 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5">
              <Phone size={12} /> 9133685222
            </a>
            
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-medical-blue text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-medical-blue/20 hover:bg-medical-blue-dark transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-medical-blue p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white pt-28 px-6 lg:hidden flex flex-col justify-between pb-8 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col gap-3.5">
              <button onClick={() => scrollToSection('specialties')} className="text-left font-serif font-bold text-lg text-medical-blue border-b border-gray-100 py-2 flex justify-between items-center">
                Specialties <ChevronRight size={18} className="text-medical-teal" />
              </button>
              <button onClick={() => scrollToSection('scarless')} className="text-left font-serif font-bold text-lg text-medical-teal border-b border-gray-100 py-2 flex justify-between items-center">
                Scarless TOETVA (Zero Neck Scar) <Sparkles size={18} className="text-medical-gold" />
              </button>
              <button onClick={() => scrollToSection('anatomy')} className="text-left font-serif font-bold text-lg text-medical-blue border-b border-gray-100 py-2 flex justify-between items-center">
                Interactive Neck Anatomy <Layers size={18} className="text-medical-teal" />
              </button>
              <button onClick={() => scrollToSection('calculator')} className="text-left font-serif font-bold text-lg text-medical-blue border-b border-gray-100 py-2 flex justify-between items-center">
                Thyroid TIRADS & Biopsy Calculator <Stethoscope size={18} className="text-medical-teal" />
              </button>
              <button onClick={() => scrollToSection('second-opinion')} className="text-left font-serif font-bold text-lg text-medical-gold border-b border-gray-100 py-2 flex justify-between items-center">
                Second Opinion on Reports <FileText size={18} className="text-medical-gold" />
              </button>
              <button onClick={() => scrollToSection('faqs')} className="text-left font-serif font-bold text-lg text-medical-blue border-b border-gray-100 py-2 flex justify-between items-center">
                FAQs & Insurance Info <HelpCircle size={18} className="text-medical-teal" />
              </button>
              <button onClick={() => scrollToSection('locations')} className="text-left font-serif font-bold text-lg text-medical-blue border-b border-gray-100 py-2 flex justify-between items-center">
                Vizag Clinics & Timings <ChevronRight size={18} className="text-medical-teal" />
              </button>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100">
              <a href="tel:+919133685222" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-50 text-red-700 font-bold text-sm border border-red-200">
                <Phone size={16} /> Emergency Helpline: 9133685222
              </a>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="w-full py-4 rounded-xl bg-medical-blue text-white font-bold text-sm shadow-xl shadow-medical-blue/20"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-white border-b border-gray-100">
          <div className="absolute top-0 right-0 w-2/5 h-full bg-slate-50 -z-0 hidden lg:block"></div>
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-medical-teal/5 rounded-full blur-3xl -z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 py-4 lg:py-8 lg:pr-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-medical-teal text-xs font-bold uppercase tracking-wider mb-6">
                <Award size={14} className="text-medical-gold" />
                <span>MCh Endocrine Surgery • Madras Medical College</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-medical-blue leading-[1.12] mb-6 tracking-tight">
                Precision Surgery for <br />
                <span className="text-medical-teal">Thyroid, Parathyroid</span> <br />
                & Breast Conditions.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed font-sans border-l-4 border-medical-gold pl-4 sm:pl-5">
                Specialized in minimally invasive thyroidectomy, **Scarless TOETVA** (Zero Neck Scar), and oncoplastic breast conservation with advanced nerve-sparing safety in Visakhapatnam.
              </p>

              {/* Animated Credibility Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="block font-serif font-bold text-2xl text-medical-blue">14+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Years Experience</span>
                </div>
                <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="block font-serif font-bold text-2xl text-medical-teal">5,000+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Patients Evaluated</span>
                </div>
                <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="block font-serif font-bold text-2xl text-medical-gold">100%</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">IONM Protocol</span>
                </div>
                <div className="p-3 sm:p-4 bg-medical-blue text-white rounded-2xl text-center shadow-md">
                  <span className="block font-serif font-bold text-2xl text-medical-gold">0 cm</span>
                  <span className="text-[10px] uppercase font-bold text-white/80 tracking-wider">TOETVA Neck Scar</span>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 rounded-xl bg-medical-blue text-white text-sm font-bold uppercase tracking-wider shadow-xl shadow-medical-blue/20 hover:bg-medical-blue-dark transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={18} /> Book Consultation
                </button>
                <button
                  onClick={() => scrollToSection('second-opinion')}
                  className="px-6 py-4 rounded-xl bg-white text-medical-blue border-2 border-medical-gold hover:bg-amber-50/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm font-bold uppercase tracking-wider"
                >
                  <FileText size={16} className="text-medical-gold" /> Second Opinion Desk
                </button>
                <a
                  href="https://wa.me/916300550392?text=Hello%20Dr.%20Dinesh%20Goli%2C%20I%20would%20like%20to%20consult%20regarding..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 rounded-xl bg-green-50 text-green-700 text-sm font-bold border border-green-200 hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 68.9 27.1 106.1 27.1h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  Trusted by 5,000+ patients across Vizag & North Coastal Andhra
                </span>
              </div>
            </motion.div>

            {/* Right Doctor Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative mt-4 lg:mt-0"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                <img 
                  src="/images/dr-dinesh-primary.jpeg" 
                  alt="Dr. Dinesh Goli - Endocrine & Breast Surgeon" 
                  className="w-full h-[400px] sm:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-photo.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-medical-gold text-medical-blue-dark text-[10px] font-extrabold uppercase tracking-widest inline-block mb-1.5">
                    Consultant Endocrine Surgeon
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Dr. Dinesh Goli
                  </h3>
                  <p className="text-xs text-white/80 font-sans mt-0.5">
                    Apollo Health City & Venkateshwara Vascular Foundation
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-medical-teal">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-medical-blue">100% Nerve Safety</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">IONM Protocol</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-medical-blue text-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-medical-gold">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">MCh Specialized</p>
                  <p className="text-[10px] text-medical-gold font-semibold uppercase tracking-wider">Madras Medical College</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Specialized Areas */}
        <section id="specialties" className="py-20 lg:py-28 bg-slate-bg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
                Core Surgical Specialties
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
                Focused Clinical Excellence
              </h2>
              <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
                Dedicated surgical focus on hormone-producing glands and oncoplastic breast preservation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SpecialtyCard 
                icon="🦋"
                title="Thyroid & Scarless Surgery"
                badge="Thyroid"
                desc="Total & hemithyroidectomy, central neck dissection for cancer, and pioneering Scarless TOETVA (Zero Neck Scar) through the lower lip."
                highlights={["Scarless TOETVA", "Ultrasound FNAC", "IONM Nerve Preserving", "Thyroid Cancer Care"]}
                onLearnMore={() => setSelectedGuideId('thyroid-nodes')}
              />
              <SpecialtyCard 
                icon="⚡"
                title="Parathyroid & Calcium"
                badge="Parathyroid"
                desc="Comprehensive cure for Primary Hyperparathyroidism, recurrent kidney stones, elevated serum calcium, and sestamibi-guided mini-incision surgery."
                highlights={["Minimally Invasive MIP", "Sestamibi SPECT Guidance", "Kidney Stone Resolution", "Bone Density Recovery"]}
                onLearnMore={() => setSelectedGuideId('pth-levels')}
              />
              <SpecialtyCard 
                icon="⬡"
                title="Adrenal Keyhole Surgery"
                badge="Adrenal"
                desc="Laparoscopic and retroperitoneoscopic adrenalectomy for pheochromocytomas, aldosterone Conn's syndrome, Cushing's, and incidentalomas."
                highlights={["Keyhole Laparoscopic Cut", "Endocrine Hypertension", "Pheochromocytoma", "Rapid 24-hr Recovery"]}
                onLearnMore={() => setSelectedGuideId('pth-levels')}
              />
              <SpecialtyCard 
                icon="🌸"
                title="Breast Care & Oncoplasty"
                badge="Breast"
                desc="Advanced Breast Conservation Surgery (BCS), sentinel lymph node biopsy, and oncoplastic remodeling to preserve natural symmetry."
                highlights={["Triple Assessment", "Oncoplastic Remodeling", "Sentinel Node Biopsy", "Benign Lump Removal"]}
                onLearnMore={() => setSelectedGuideId('breast-wellness')}
              />
            </div>
          </div>
        </section>

        {/* Scarless Comparison Component */}
        <ScarlessComparison onBookClick={() => scrollToSection('contact')} />

        {/* Interactive Anatomy Explorer */}
        <AnatomyExplorer onBookClick={() => scrollToSection('contact')} />

        {/* Thyroid & Biopsy Risk Calculator */}
        <ThyroidRiskCalculator onBookClick={() => scrollToSection('contact')} />

        {/* Interactive Symptom Checker */}
        <SymptomChecker onSelectSpecialty={(spec) => setFormData(prev => ({ ...prev, specialty: spec }))} />

        {/* Second Opinion Desk */}
        <SecondOpinionDesk onBookClick={() => scrollToSection('contact')} />

        {/* About Dr. Dinesh Goli */}
        <section id="about" className="py-20 lg:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img 
                  src="/images/dr-dinesh-secondary.jpeg" 
                  alt="Dr. Dinesh Goli in consultation" 
                  className="w-full h-[400px] sm:h-[550px] object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = '/images/about-photo.jpg';
                  }}
                />
              </div>

              {/* Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-medical-blue p-6 sm:p-8 rounded-3xl shadow-2xl text-white max-w-xs sm:max-w-sm border-2 border-medical-gold/30">
                <p className="font-serif italic text-sm sm:text-base leading-relaxed text-white/95">
                  "Every endocrine surgery demands two non-negotiables: absolute oncological clearance and complete preservation of voice, calcium, and aesthetics."
                </p>
                <div className="w-12 h-1 bg-medical-gold mt-4 rounded-full"></div>
              </div>
            </div>

            {/* Right Academic Details */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
                Academic & Surgical Pedigree
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight mb-6">
                MCh Specialized Care from <br className="hidden sm:inline" />
                <span className="text-medical-teal">Madras Medical College</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-sans mb-6">
                Dr. Dinesh Goli completed his prestigious superspecialty M.Ch degree in Endocrine Surgery from the historic Department of Endocrine Surgery at Madras Medical College (MMC), Chennai — one of the earliest and most reputed centers in South Asia.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-medical-teal flex-shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-medical-blue">M.Ch Endocrine Surgery</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Madras Medical College, Chennai</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-medical-teal flex-shrink-0">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-medical-blue">DNB General Surgery</h4>
                    <p className="text-xs text-slate-500 mt-0.5">National Board of Examinations</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-medical-teal flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-medical-blue">MBBS Graduation</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Comprehensive Medical Foundation</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-medical-teal flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-medical-blue">IAES Member</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Indian Assoc. of Endocrine Surgeons</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 text-slate-700 text-sm leading-relaxed">
                <span className="font-bold text-medical-teal block mb-1">Dual Consultation Base in Vizag:</span>
                Available daily for outpatient evaluation at <strong>Venkateshwara Vascular Foundation</strong> (Maharanipeta, 5:00 – 7:00 PM) and hospital consultations at <strong>Apollo Health City</strong> (Arilova, 1:00 – 4:00 PM).
              </div>
            </div>
          </div>
        </section>

        {/* Patient Guides Hub */}
        <section id="education" className="py-20 lg:py-28 bg-medical-blue text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-gold block mb-3 font-sans">
                  Educational Resources
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
                  Patient Clinical Guides
                </h2>
                <p className="text-sm text-white/70 mt-2 font-sans max-w-lg">
                  Read clinical guides written by Dr. Dinesh Goli on investigations, nerve monitoring protocols, and modern treatments.
                </p>
              </div>

              <button 
                onClick={() => setSelectedGuideId('thyroid-nodes')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-white/20"
              >
                Browse All Guides <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <GuideCard 
                title="Thyroid Nodules & FNAC"
                category="Clinical Guide"
                desc="Understanding TIRADS score, biopsy Bethesda system, and when surgery is indicated."
                icon="🦋"
                onClick={() => setSelectedGuideId('thyroid-nodes')}
              />
              <GuideCard 
                title="Calcium & Parathyroid"
                category="Gland Guide"
                desc="Why high calcium causes kidney stones and how focused MIP surgery cures PHPT."
                icon="⚡"
                onClick={() => setSelectedGuideId('pth-levels')}
              />
              <GuideCard 
                title="RLN Voice Preservation"
                category="Safety Protocol"
                desc="How Intraoperative Nerve Monitoring (IONM) protects your speaking voice."
                icon="🛡️"
                onClick={() => setSelectedGuideId('nerve-safety')}
              />
              <GuideCard 
                title="Breast Conservation"
                category="Oncology Guide"
                desc="Preserving aesthetic breast symmetry while ensuring complete tumor clearance."
                icon="🌸"
                onClick={() => setSelectedGuideId('breast-wellness')}
              />
            </div>
          </div>
        </section>

        {/* Patient Testimonials */}
        <PatientTestimonials />

        {/* Interactive FAQ Section */}
        <InteractiveFAQ />

        {/* Gallery */}
        <Gallery />

        {/* Dual Clinic Locations */}
        <section id="locations" className="py-20 lg:py-28 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block mb-3 font-sans">
                Visakhapatnam Consultation Centers
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
                Two Convenient Clinic Locations
              </h2>
              <p className="text-sm text-slate-600 mt-3 font-sans max-w-xl mx-auto">
                Consult Dr. Dinesh Goli in Maharanipeta (Evening Clinic) or Apollo Health City (Afternoon Hospital Visits).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {/* Location 1: Maharanipeta */}
              <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 card-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-teal-100 text-medical-teal text-[11px] font-bold uppercase tracking-wider">
                        Evening Consultation Clinic
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-medical-blue mt-2">
                        Venkateshwara Vascular Foundation
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-medical-teal shadow-sm">
                      <MapPin size={22} />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4">
                    14-1-128, 1st Floor, Noworji Road, Maharanipeta, Visakhapatnam – 530002.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-medical-gold bg-white px-4 py-2.5 rounded-xl border border-slate-200 w-fit mb-6">
                    <Clock size={16} /> 5:00 PM – 7:00 PM (Monday – Saturday)
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Venkateshwara+Vascular+Foundation,+14-1-128,+1st+Floor,+Noworji+Road,+Visakhapatnam" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-medical-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-all"
                  >
                    Google Maps <ExternalLink size={14} />
                  </a>
                  <a 
                    href="tel:+919133685222" 
                    className="py-3 px-4 bg-white text-medical-blue border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                  >
                    <Phone size={14} /> Call Clinic
                  </a>
                </div>
              </div>

              {/* Location 2: Apollo Health City */}
              <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 card-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-teal-100 text-medical-teal text-[11px] font-bold uppercase tracking-wider">
                        Hospital OPD & Inpatient Care
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-medical-blue mt-2">
                        Apollo Health City
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-medical-teal shadow-sm">
                      <MapPin size={22} />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4">
                    Health City, Arilova, Visakhapatnam, Andhra Pradesh – 530040.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-medical-gold bg-white px-4 py-2.5 rounded-xl border border-slate-200 w-fit mb-6">
                    <Clock size={16} /> 1:00 PM – 4:00 PM (Monday – Friday)
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Apollo+Health+City,+Arilova,+Visakhapatnam" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-medical-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-all"
                  >
                    Google Maps <ExternalLink size={14} />
                  </a>
                  <a 
                    href="tel:+919133685222" 
                    className="py-3 px-4 bg-white text-medical-blue border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                  >
                    <Phone size={14} /> Call Apollo Desk
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 shadow-lg h-[380px]">
              <iframe 
                src="https://maps.google.com/maps?q=Venkateshwara%20Vascular%20Foundation,%2014-1-128,%20Noworji%20Road,%20Visakhapatnam&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Venkateswara Vascular Foundation Map"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Appointment Booking Section */}
        <section id="contact" className="py-20 lg:py-28 bg-slate-bg relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-slate-200 card-shadow grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Instructions */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-medical-teal block font-sans">
                  Direct Appointment Desk
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-medical-blue tracking-tight">
                  Schedule Your Consultation
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  Submit your details to request an appointment. Your request is emailed directly to Dr. Dinesh Goli (<span className="font-semibold text-medical-blue">Dinesh.goli@gmail.com</span>) and our coordination staff for scheduling.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-medical-teal flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Appointment Helpline</p>
                      <a href="tel:+919133685222" className="text-lg font-bold text-medical-blue hover:text-medical-teal transition-colors">
                        +91 9133685222
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50/60 border border-green-200">
                    <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 68.9 27.1 106.1 27.1h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-green-800 uppercase tracking-wider">Instant WhatsApp Chat</p>
                      <a href="https://wa.me/916300550392" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-green-700 hover:underline">
                        +91 6300550392
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Booking Form / Success State */}
              <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
                {bookingSuccess ? (
                  <div className="text-center py-6 sm:py-8 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 size={36} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-2xl text-medical-blue">
                        Consultation Request Sent!
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Dispatched to Dr. Dinesh Goli (Dinesh.goli@gmail.com)
                      </div>
                      <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto mt-2">
                        Our clinical desk will contact you at <strong>{submittedBooking?.phone}</strong> to confirm your appointment slot.
                      </p>
                    </div>

                    {submittedBooking && (
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-left max-w-md mx-auto">
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-slate-400">Patient:</span>
                          <span className="font-bold text-medical-blue">{submittedBooking.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-slate-400">Specialty:</span>
                          <span className="font-bold text-medical-teal">{submittedBooking.specialty}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-100">
                          <span className="text-slate-400">Location:</span>
                          <span className="font-bold text-medical-blue">{submittedBooking.city}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        onClick={openWhatsAppBooking}
                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <span>Confirm via WhatsApp</span>
                      </button>
                      <button
                        onClick={() => {
                          setBookingSuccess(false);
                          setSubmittedBooking(null);
                        }}
                        className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-medical-blue border border-slate-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book Another Slot
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Patient Full Name *
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Varma"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal font-medium"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          Condition / Specialty
                        </label>
                        <select 
                          value={formData.specialty}
                          onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal font-medium cursor-pointer"
                        >
                          <option>Thyroid / Parathyroid</option>
                          <option>Scarless TOETVA Thyroid</option>
                          <option>Adrenal Surgery</option>
                          <option>Breast Oncology & Lumps</option>
                          <option>Other Endocrine Query</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Preferred Clinic Location
                      </label>
                      <select 
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-medical-teal font-medium cursor-pointer"
                      >
                        <option>Venkateshwara Vascular Foundation (Maharanipeta, 5–7 PM)</option>
                        <option>Apollo Health City (Arilova, 1–4 PM)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-medical-blue text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-medical-blue-dark transition-all shadow-lg shadow-medical-blue/20 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Sending to Dinesh.goli@gmail.com...
                        </>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span> <ChevronRight size={18} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={openWhatsAppBooking}
                      className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-md cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 68.9 27.1 106.1 27.1h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                      <span>Instant Booking via WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-medical-blue text-white/70 py-12 border-t border-medical-gold/20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white font-serif font-bold text-xl mb-1">Dr. Dinesh Goli</h4>
            <p className="text-xs text-medical-gold font-bold uppercase tracking-wider">
              M.Ch Endocrine Surgery (MMC) | DNB | MBBS
            </p>
            <p className="text-xs text-white/60 mt-1">
              Visakhapatnam, Andhra Pradesh, India
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-white/80">
            <button onClick={() => scrollToSection('specialties')} className="hover:text-medical-gold transition-colors">Specialties</button>
            <button onClick={() => scrollToSection('scarless')} className="hover:text-medical-gold transition-colors">Scarless TOETVA</button>
            <button onClick={() => scrollToSection('anatomy')} className="hover:text-medical-gold transition-colors">Anatomy</button>
            <button onClick={() => scrollToSection('calculator')} className="hover:text-medical-gold transition-colors">Risk Calculator</button>
            <button onClick={() => scrollToSection('locations')} className="hover:text-medical-gold transition-colors">Clinics</button>
            <a href="tel:+919133685222" className="text-red-400 hover:underline">Emergency: 9133685222</a>
          </div>

          <div className="text-xs text-center md:text-right text-white/50 space-y-1">
            <p>© {new Date().getFullYear()} Dr. Dinesh Goli Practice. All rights reserved.</p>
            <p className="text-[10px] text-white/40">vizagendosurgeon.com</p>
          </div>
        </div>
      </footer>

      {/* Floating Emergency Action on Mobile */}
      <div className="fixed bottom-6 left-6 md:hidden z-30">
        <a 
          href="tel:+919133685222" 
          className="w-13 h-13 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse"
          aria-label="Call Emergency Helpline"
        >
          <Phone size={22} />
        </a>
      </div>

      {/* AI Health Assistant Bot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] max-w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-medical-blue p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-medical-gold">
                  <Bot size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI Health Assistant</h4>
                  <p className="text-[11px] text-white/70">
                    {useLocalFallback ? 'Offline Clinical Mode' : 'Dr. Dinesh Goli Practice Assistant'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs sm:text-sm">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-medical-blue text-white rounded-br-none'
                      : 'bg-white text-slate-700 rounded-bl-none shadow-sm border border-slate-100'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm border border-slate-100 flex items-center gap-2">
                    <Loader2 size={16} className="text-medical-teal animate-spin" />
                    <span className="text-xs text-slate-500">Typing clinical guidance...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
              <button onClick={() => setInputMessage('Tell me about Scarless TOETVA')} className="px-2.5 py-1 bg-teal-50 text-medical-teal rounded-full font-bold whitespace-nowrap">
                Scarless TOETVA
              </button>
              <button onClick={() => setInputMessage('Second opinion on my report')} className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full font-medium whitespace-nowrap">
                Second Opinion
              </button>
              <button onClick={() => setInputMessage('Book an appointment')} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-medium whitespace-nowrap">
                Book Visit
              </button>
              <button onClick={() => setInputMessage('Clinic locations in Vizag')} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-medium whitespace-nowrap">
                Locations
              </button>
              <button onClick={() => setInputMessage('Parathyroid and high calcium')} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-medium whitespace-nowrap">
                Parathyroid
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about thyroid, scarless surgery..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-medical-teal"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-9 h-9 bg-medical-blue text-white rounded-full flex items-center justify-center hover:bg-medical-blue-dark transition-all disabled:opacity-40 cursor-pointer flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-medical-blue text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white"
        aria-label="Open AI Health Assistant"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* In-depth Patient Guide Modal */}
      <PatientGuideModal 
        guideId={selectedGuideId} 
        onClose={() => setSelectedGuideId(null)} 
        onBookClick={() => scrollToSection('contact')}
      />
    </div>
  );
}

function SpecialtyCard({ 
  icon, 
  title, 
  badge, 
  desc, 
  highlights, 
  onLearnMore 
}: { 
  icon: string; 
  title: string; 
  badge: string; 
  desc: string; 
  highlights: string[]; 
  onLearnMore: () => void; 
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 card-shadow flex flex-col justify-between group transition-all duration-300"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            {badge}
          </span>
        </div>

        <h3 className="font-serif font-bold text-lg text-medical-blue mb-2.5">
          {title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed font-sans mb-5">
          {desc}
        </p>

        <div className="space-y-1.5 mb-6">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
              <CheckCircle2 size={13} className="text-medical-teal flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onLearnMore}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-medical-blue hover:text-white text-medical-blue text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
      >
        <span>View Clinical Guide</span> <ChevronRight size={14} />
      </button>
    </motion.div>
  );
}

function GuideCard({ 
  title, 
  category, 
  desc, 
  icon, 
  onClick 
}: { 
  title: string; 
  category: string; 
  desc: string; 
  icon: string; 
  onClick: () => void; 
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="p-6 rounded-3xl bg-white/10 border border-white/10 hover:bg-white/15 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-extrabold text-medical-gold uppercase tracking-[0.2em] block mb-1">
          {category}
        </span>
        <h4 className="font-serif font-bold text-lg text-white mb-2 leading-tight">
          {title}
        </h4>
        <p className="text-xs text-white/70 leading-relaxed font-sans mb-4">
          {desc}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-bold text-medical-gold pt-3 border-t border-white/10 uppercase tracking-wider">
        <span>Read Guide</span> <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
