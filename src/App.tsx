/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MapPin, ExternalLink, Award, BookOpen, 
  Stethoscope, Users, ChevronRight, Mail, Clock, Activity, 
  MessageCircle, Send, Bot, Loader2, AlertCircle
} from 'lucide-react';
import OpenAI from 'openai';
import Gallery from './Gallery';

const SYSTEM_PROMPT = `You are Dr. Dinesh Goli's AI Assistant for a surgical practice in Visakhapatnam, India. You help patients with:

SPECIALTIES:
- Thyroid surgery (nodules, cancer, hyperthyroidism)
- Parathyroid surgery (hyperparathyroidism)
- Adrenal surgery (tumors, pheochromocytoma)
- Breast surgery (lumps, cancer, oncoplastic)

APPOINTMENT BOOKING:
- Consultation Clinic: Venkateshwara Vascular Foundation, 14-1-128, 1st Floor, Noworji Road, Visakhapatnam - 530002, Timings: 5:00 PM – 7:00 PM
- Hospital Visit: Apollo Health City, Health City, Arilova, Visakhapatnam - 530040, Timings: 1:00 PM – 4:00 PM (Mon-Fri)
- Phone: 9133685222, WhatsApp: 6300550392

RULES:
1. Always be professional and empathetic
2. Don't provide specific medical diagnoses - recommend consultation
3. Help with appointment booking by providing contact details
4. Keep responses concise (under 200 words)
5. Always end with a helpful call-to-action
6. Use Hindi/Hinglish occasionally for local patients
7. Never claim to be a doctor - always clarify you're an AI assistant
8. For emergencies, direct to call 9133685222`;

const INITIAL_MESSAGES = [
  { role: 'bot', content: 'Hello! I\'m Dr. Dinesh\'s AI Assistant. I can help you with:\n\n• Information about endocrine surgery\n• Thyroid, parathyroid & adrenal conditions\n• Breast health queries\n• Appointment booking\n\nHow can I help you today?' }
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
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', specialty: 'Thyroid / Parathyroid' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    fetch('/api/announcement')
      .then(res => res.json())
      .then(data => setAnnouncement(data.text))
      .catch(console.error);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert('Name and phone are required');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Appointment booked successfully! We will contact you soon.');
        setFormData({ name: '', phone: '', city: '', specialty: 'Thyroid / Parathyroid' });
      } else {
        alert('Failed to book appointment. Please try calling us instead.');
      }
    } catch (e) {
      alert('Network error. Please try calling us instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getLocalFallback = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('book') || input.includes('appointment') || input.includes('schedule')) {
      return `To book an appointment:\n\n📞 9133685222\n💬 6300550392\n\n📍 Venkateshwara Vascular Foundation\n14-1-128, Noworji Road, Vizag\n5:00 PM – 7:00 PM\n\n📍 Apollo Health City, Arilova\n1:00 PM – 4:00 PM (Mon-Fri)`;
    }
    
    if (input.includes('thyroid')) {
      return `For thyroid conditions:\n\n• Nodules, cancer, hyperthyroidism\n• Tests: TSH, T3, T4, Ultrasound\n• Fine needle aspiration biopsy\n\nBook consultation: 9133685222`;
    }
    
    if (input.includes('parathyroid') || input.includes('pth')) {
      return `Parathyroid services:\n\n• Hyperparathyroidism\n• Tests: Serum Calcium, PTH\n• Sestamibi scan\n\nConsult: 9133685222`;
    }
    
    if (input.includes('adrenal')) {
      return `Adrenal surgery:\n\n• Tumor removal (laparoscopic)\n• Pheochromocytoma\n• Hormonal workup required\n\nBook consultation: 9133685222`;
    }
    
    if (input.includes('breast')) {
      return `Breast care services:\n\n• Lump evaluation\n• Cancer surgery\n• Oncoplastic surgery\n• Mammogram & biopsy\n\nBook: 9133685222`;
    }
    
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hi! How can I help? Ask about thyroid, parathyroid, adrenal, breast conditions or book appointment.';
    }
    
    return `I can help with:\n🦋 Thyroid issues\n🔘 Parathyroid\n⚡ Adrenal tumors\n💼 Breast health\n📅 Appointment booking\n\n📞 9133685222 | 💬 6300550392`;
  };

  const callAIAPI = async (userMessage: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_MINIMAX_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('No API key found, using local fallback');
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
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content || '';
      
      conversationHistory.current.push({ role: 'model', content: response });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      setApiError(true);
      return getLocalFallback(userMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await callAIAPI(userMessage);
      setChatMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'bot', content: getLocalFallback(userMessage) }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-bg selection:bg-medical-teal selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 flex flex-col ${
          scrolled ? 'glass-morphism shadow-sm' : 'bg-transparent'
        }`}
      >
        {/* Announcement Banner */}
        <AnimatePresence>
          {announcement && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-medical-blue text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase py-1.5 px-4 text-center flex items-center justify-center gap-2 relative overflow-hidden border-b border-medical-teal/30"
            >
               <div className="absolute inset-0 bg-medical-blue-dark opacity-50"></div>
               <span className="relative z-10 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-medical-teal animate-pulse"></span>
                 {announcement}
               </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center w-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-5'}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-medical-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-medical-blue/20 overflow-hidden relative group border-b-2 border-medical-gold">
              <div className="absolute inset-0 bg-medical-teal opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Logo goes here: Upload logo.png to public/images/ */}
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover relative z-10" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
              <Activity size={24} className="relative z-10 text-medical-teal-light hidden" />
            </div>
            <div className="leading-tight">
              <h1 className="font-display font-bold text-lg text-medical-blue tracking-tight uppercase">
                Dr. Dinesh Goli
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-medical-gold font-bold">
                Endocrine & Breast Surgeon
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink href="#specialties">Specialties</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#gallery">Gallery</NavLink>
            <NavLink href="#education">Patient Hub</NavLink>
            <NavLink href="#locations">Locations</NavLink>
            <div className="h-4 w-px bg-gray-200"></div>
            <a href="tel:+919133685222" className="text-red-600 font-bold uppercase text-xs border border-red-200 px-3 py-1 rounded bg-red-50/50 hover:bg-red-50 transition-colors">
              Emergency: 9133685222
            </a>
            <button className="bg-medical-blue text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-medical-blue/20 hover:scale-105 transition-transform active:scale-95">
              Book Appointment
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-medical-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-5">
              <MobileNavLink href="#specialties" onClick={() => setIsMenuOpen(false)}>Specialties</MobileNavLink>
              <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</MobileNavLink>
              <MobileNavLink href="#education" onClick={() => setIsMenuOpen(false)}>Patient Education</MobileNavLink>
              <MobileNavLink href="#locations" onClick={() => setIsMenuOpen(false)}>Locations</MobileNavLink>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a href="tel:+919133685222" className="flex items-center gap-3 text-red-600 font-bold text-sm mb-4">
                  <Phone size={18} /> Emergency: 9133685222
                </a>
              </div>
              <button className="bg-medical-blue text-white py-4 rounded-xl font-sans font-bold shadow-xl shadow-medical-blue/20 w-full">
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 lg:pt-24 overflow-hidden bg-white border-b border-gray-100">
          <div className="absolute top-20 right-0 w-1/3 h-full bg-slate-bg -z-0 hidden lg:block"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-0 items-center relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 py-8 lg:py-12 lg:pr-12 lg:border-r lg:border-gray-100"
            >
              <div className="w-24 h-1 bg-medical-blue mb-10"></div>
              <h2 className="text-3xl sm:text-4xl lg:text-7xl font-display font-bold text-medical-blue leading-[1.1] mb-6 lg:mb-8">
                Expert Care in<br/>
                Endocrine &<br/>
                <span className="text-medical-teal italic">Breast Surgery.</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-500 mb-8 lg:mb-10 max-w-xl leading-relaxed gold-border-left pl-4 lg:pl-6 font-sans">
                Precision surgical solutions for thyroid, parathyroid, and adrenal disorders with a philosophy centered on patient safety.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="text-center px-5 py-3 bg-slate-50 rounded-lg border border-slate-100 min-w-[80px]">
                  <span className="block font-bold text-medical-blue text-2xl">MBBS</span>
                  <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">Graduation</span>
                </div>
                <div className="text-center px-5 py-3 bg-slate-50 rounded-lg border border-slate-100 min-w-[80px]">
                  <span className="block font-bold text-medical-blue text-2xl">DNB</span>
                  <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">Surgical</span>
                </div>
                <div className="text-center px-5 py-3 bg-medical-blue text-white rounded-lg shadow-md min-w-[80px]">
                  <span className="block font-bold text-2xl">MCh</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-80 font-bold">Endocrine</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm font-semibold">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-medical-teal flex items-center justify-center text-white text-[10px] border-2 border-white shadow-sm font-bold">
                    +5k
                  </div>
                </div>
                <span className="text-gray-500 font-sans tracking-tight">Trusted by 5,000+ patients annually</span>
              </div>
            </motion.div>

            <div className="lg:col-span-6 lg:pl-12 py-8 lg:py-12 mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-gray-100">
                  <img 
                    src="/images/hero-photo.jpg" 
                    alt="Dr. Dinesh Goli" 
                    className="w-full h-[300px] lg:h-[600px] object-cover bg-slate-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/20 to-transparent"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-medical-teal/5 rounded-full blur-3xl -z-0 hidden lg:block"></div>
                <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 bg-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl card-shadow flex items-center gap-3 lg:gap-4 border border-gray-100">
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-medical-teal-light rounded-full flex items-center justify-center text-medical-teal">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-medical-blue">Certified Excellence</p>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest leading-tight">National Surgical Board</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Defining Endocrine Surgery */}
        <section id="specialties" className="py-16 lg:py-24 bg-slate-bg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 lg:mb-12 border-b border-gray-200 pb-6 lg:pb-8">
              <div className="max-w-xl">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 lg:mb-4 font-sans">Specialized Care</h2>
                <h3 className="text-2xl lg:text-4xl lg:text-5xl font-display font-bold text-medical-blue">Defining Endocrine Surgery</h3>
              </div>
              <span className="hidden md:block text-xs text-slate-400 font-sans font-medium uppercase tracking-tight text-right max-w-[200px]">
                A refined surgical branch dedicated to hormone-secreting glands and endocrine oncology.
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <SpecialtyCard 
                title="Thyroid & Parathyroid"
                desc="Expert management of nodules, cancer, and hyperparathyroidism using precision techniques."
                icon="◈"
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
              />
              <SpecialtyCard 
                title="Adrenal & Pancreas"
                desc="Specialized management of adrenal tumors and complex neuroendocrine pathologies."
                icon="⬡"
                iconColor="text-medical-teal"
                bgColor="bg-teal-50"
              />
              <SpecialtyCard 
                title="Breast Surgery"
                desc="Advanced oncoplastic and reconstructive approaches for optimal clinical outcomes."
                icon="✦"
                iconColor="text-indigo-600"
                bgColor="bg-indigo-50"
              />
            </div>
          </div>
        </section>

        {/* Meet the Surgeon / Academic Section Combined Aesthetic */}
<section id="about" className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-[350px] lg:h-[600px]"
              >
                 <img 
                  src="/images/about-photo.jpg" 
                  alt="Dr. Dinesh Goli" 
                  className="w-full h-full object-cover bg-slate-200"
                />
              </motion.div>
              <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 bg-medical-blue p-6 lg:p-10 rounded-2xl lg:rounded-3xl shadow-2xl text-white max-w-xs lg:max-w-sm">
                <p className="font-serif italic text-base lg:text-xl leading-relaxed mb-3 lg:mb-4">
                  "Surgical innovation must always be rooted in evidence-based safety protocols."
                </p>
                <div className="w-10 lg:w-12 h-1 bg-medical-teal"></div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-10 mt-8 lg:mt-0 order-1 lg:order-2">
               <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 lg:mb-6 font-sans">Academic Foundation</h2>
               <h3 className="text-2xl lg:text-4xl font-display font-bold text-medical-blue mb-6 lg:mb-8 leading-tight">
                 MCh Specialized Excellence from <span className="text-medical-teal">Madras Medical College.</span>
               </h3>
               
               <div className="space-y-6 lg:space-y-8 text-slate-500 leading-relaxed text-base lg:text-lg font-sans">
                  <p>
                    Dr. Dinesh Goli is a dedicated Endocrine and Breast Surgeon who has mastered the balance between radical treatment and cosmetic preservation. With his MCh specialization, he offers a level of focus rare in general surgery circles.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 pt-4 lg:pt-6">
                    <div className="flex gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-medical-blue/20 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-medical-teal shadow-sm group-hover:bg-medical-blue group-hover:text-white transition-all">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-medical-blue text-sm">Advanced MCh</h4>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter font-bold">Endocrine Surgery</p>
                      </div>
                    </div>
                    <div className="flex gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-medical-blue/20 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-medical-teal shadow-sm group-hover:bg-medical-blue group-hover:text-white transition-all">
                        <Stethoscope size={20} />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-medical-blue text-sm">Clinical Innovation</h4>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter font-bold">Minimal Access Surgery</p>
                      </div>
                    </div>
                  </div>

                  <p className="border-l-4 border-medical-teal pl-4 lg:pl-6 py-2 italic bg-slate-50 rounded-r-xl text-medical-blue-dark">
                    His expertise covers Thyroid, Parathyroid, Adrenal, Breast, and Endocrine Pancreas, with a focus on Breast Conservation and Oncoplastic Breast Surgery.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* Education Hub */}
        <section id="education" className="py-16 lg:py-24 bg-medical-blue relative border-y border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 lg:gap-12 mb-12 lg:mb-20">
              <div className="max-w-2xl">
                <h2 className="text-xs font-bold text-medical-teal uppercase tracking-[0.3em] mb-3 lg:mb-4 font-sans">Patient Hub</h2>
                <h3 className="text-3xl lg:text-4xl md:text-6xl font-display font-bold text-white leading-tight">Patient Resources</h3>
              </div>
              <button className="flex items-center gap-2 lg:gap-3 text-sm text-white font-bold uppercase tracking-widest hover:text-medical-teal transition-colors border-b-2 border-medical-teal pb-1 lg:pb-2 group">
                Access All Research <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              <EducationLink 
                title="Thyroid Nodes" 
                category="Clinical Guide"
                icon={<Stethoscope className="text-medical-teal" size={20} />}
              />
              <EducationLink 
                title="PTH Levels" 
                category="Blood Work Help"
                icon={<BookOpen className="text-medical-teal" size={20} />}
              />
              <EducationLink 
                title="Nerve Safety" 
                category="Surgical Protocol"
                icon={<Award className="text-medical-teal" size={20} />}
              />
              <EducationLink 
                title="Breast Wellness" 
                category="Preventive Care"
                icon={<Users className="text-medical-teal" size={20} />}
              />
            </div>
          </div>
        </section>

        <Gallery />

        {/* Clinic Locator */}
        <section id="locations" className="py-16 lg:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-12 lg:mb-20 max-w-2xl mx-auto">
              <h2 className="text-xs font-bold text-medical-teal uppercase tracking-[0.3em] mb-3 lg:mb-4 font-sans">Dual Locations</h2>
              <h3 className="text-2xl lg:text-4xl lg:text-5xl font-display font-bold text-medical-blue">Consultation Clinics</h3>
              <div className="w-16 h-1.5 bg-medical-teal mx-auto mt-6 lg:mt-8 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              <LocationCard 
                city="Consultation Clinic"
                info="Venkateshwara Vascular Foundation"
                address="14-1-128, 1st Floor, Noworji Road, Visakhapatnam - 530002"
                hours="5:00 PM – 7:00 PM"
                mapLink="https://www.google.com/maps/search/?api=1&query=Venkateshwara+Vascular+Foundation,+14-1-128,+1st+Floor,+Noworji+Road,+Visakhapatnam"
              />
              <LocationCard 
                city="Hospital Visit"
                info="Apollo Health City"
                address="Health City, Arilova, Visakhapatnam, Andhra Pradesh 530040"
                hours="1:00 PM – 4:00 PM, MON - FRI"
                mapLink="https://www.google.com/maps/search/?api=1&query=Apollo+Health+City,+Arilova,+Visakhapatnam"
              />
            </div>

            <div className="mt-12 lg:mt-16 bg-slate-50/50 p-3 lg:p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-inner">
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
          </div>
        </section>

        {/* Contact/Appointment */}
        <section id="contact" className="py-12 lg:py-16 bg-slate-bg">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-20 shadow-2xl card-shadow flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 overflow-hidden relative border border-gray-100">
                <div className="absolute top-0 left-0 w-1 lg:w-2 h-full bg-medical-blue"></div>
                <div className="max-w-xl w-full">
                  <h3 className="text-2xl lg:text-4xl font-display font-bold text-medical-blue mb-4 lg:mb-6">Schedule Consultation</h3>
                  <p className="text-slate-500 mb-6 lg:mb-10 text-base lg:text-lg leading-relaxed font-sans font-medium border-l-4 border-medical-teal pl-4 lg:pl-6">
                    Our team provides comprehensive support from pre-surgical workup to long-term follow-up care.
                  </p>
                  
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex items-center gap-4 lg:gap-5 group">
                      <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-all shadow-sm">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 font-sans">Appointments</p>
                        <p className="font-sans font-bold text-medical-blue text-base lg:text-lg">9133685222</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-5 group">
                      <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                        <svg className="w-5 lg:w-6 h-5 lg:h-6 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 68.9 27.1 106.1 27.1h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.6-8.7-45-27.7-16.6-14.8-27.8-33.1-31.1-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 font-sans">WhatsApp</p>
                        <p className="font-sans font-bold text-medical-blue text-base lg:text-lg">6300550392</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-[450px] bg-slate-50/50 p-5 lg:p-12 rounded-2xl lg:rounded-[2.5rem] border border-slate-100 shadow-inner">
                  <form className="space-y-4 lg:space-y-5" onSubmit={handleBookingSubmit}>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-2">Patient name</label>
                       <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-teal transition-all font-sans font-medium text-sm shadow-sm" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-2">Phone</label>
                         <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-teal transition-all font-sans font-medium text-sm shadow-sm" placeholder="+91" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-2">City</label>
                         <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-teal transition-all font-sans font-medium text-sm shadow-sm" placeholder="Location" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest pl-2">Specialty</label>
                       <select value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-teal transition-all font-sans font-medium text-sm shadow-sm accent-medical-teal">
                        <option>Thyroid / Parathyroid</option>
                        <option>Adrenal Surgery</option>
                        <option>Breast Oncology</option>
                        <option>Others</option>
                       </select>
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full bg-medical-blue py-4 lg:py-5 rounded-xl font-sans font-bold text-white shadow-xl shadow-medical-blue/20 hover:scale-[1.02] transition-transform mt-3 lg:mt-4 flex items-center justify-center gap-3 disabled:opacity-50">
                      {isSubmitting ? 'Booking...' : 'Secure Consultation'} {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <ChevronRight size={18} />}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-3 lg:mt-4 uppercase font-bold tracking-tighter">Your data is secured under HIPAA protocols</p>
                  </form>
                </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-medical-blue text-white/50 py-10 lg:py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-10">
          <div className="text-center md:text-left">
            <h4 className="text-white font-sans font-bold tracking-[0.2em] mb-2 uppercase text-base lg:text-lg">Dr. Dinesh Goli</h4>
            <p className="text-xs font-sans font-bold text-medical-teal tracking-widest uppercase">MCh | DNB | MBBS | Endocrine Surgeon</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 lg:gap-10 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="text-white hover:text-medical-teal transition-colors">Patient Safety</a>
            <a href="#" className="hover:text-medical-teal transition-colors">Evidence-Based Practice</a>
            <a href="#" className="hover:text-medical-teal transition-colors hidden sm:block">Board Certified</a>
          </div>

          <div className="text-[10px] font-sans text-center lg:text-right opacity-60">
            <p>© 2026 DR. DINESH GOLI ACADEMIC PRACTICE</p>
            <p className="mt-1 hidden lg:block">PRECISION IN GLANDULAR SURGERY</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30 flex flex-col gap-4">
        <a href="tel:+919133685222" className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
          <Phone size={24} />
        </a>
      </div>

      {/* AI Chat Bot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-[90vw] max-w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-medical-blue p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">AI Health Assistant</h4>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    {useLocalFallback ? 'Offline Mode' : 'Powered by AI'}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {apiError && (
              <div className="bg-amber-50 px-4 py-2 flex items-center gap-2 text-xs text-amber-700 border-b border-amber-100">
                <AlertCircle size={14} />
                <span>Using offline responses. API key may need configuration.</span>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-medical-blue text-white rounded-br-md' 
                      : 'bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100'
                  }`}>
                    <div className="whitespace-pre-line">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100 p-3 flex items-center gap-2">
                    <Loader2 size={16} className="text-medical-teal animate-spin" />
                    <span className="text-xs text-gray-500">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2 border-t bg-white flex gap-2 overflow-x-auto">
              <button onClick={() => setInputMessage('Book an appointment')} className="text-xs px-3 py-1.5 bg-medical-teal-light text-medical-teal rounded-full whitespace-nowrap font-medium">
                Book Appointment
              </button>
              <button onClick={() => setInputMessage('Thyroid information')} className="text-xs px-3 py-1.5 bg-slate-100 text-gray-600 rounded-full whitespace-nowrap font-medium">
                Thyroid
              </button>
              <button onClick={() => setInputMessage('Breast consultation')} className="text-xs px-3 py-1.5 bg-slate-100 text-gray-600 rounded-full whitespace-nowrap font-medium">
                Breast
              </button>
              <button onClick={() => setInputMessage('Location details')} className="text-xs px-3 py-1.5 bg-slate-100 text-gray-600 rounded-full whitespace-nowrap font-medium">
                Location
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-t flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-medical-teal"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-medical-blue text-white rounded-full flex items-center justify-center hover:bg-medical-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-medical-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-gray-500 hover:text-medical-blue transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-teal transition-all group-hover:w-full"></span>
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="text-xl font-sans font-bold text-medical-blue border-b border-gray-100 py-3 flex justify-between items-center group"
    >
      {children}
      <ChevronRight className="text-medical-teal group-hover:translate-x-2 transition-transform" size={20} />
    </a>
  );
}

function SpecialtyCard({ title, desc, icon, iconColor, bgColor }: { title: string, desc: string, icon: string, iconColor: string, bgColor: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white p-5 lg:p-8 rounded-xl lg:rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 card-shadow group"
    >
      <div className={`w-10 lg:w-12 h-10 lg:h-12 rounded-xl flex items-center justify-center mb-4 lg:mb-6 text-xl lg:text-2xl shadow-sm ${bgColor} ${iconColor} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-sans font-bold text-sm mb-2 lg:mb-3 text-medical-blue tracking-tight uppercase">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-serif italic border-l-2 border-slate-100 pl-3 lg:pl-4">
        {desc}
      </p>
    </motion.div>
  );
}

function EducationLink({ title, category, icon }: { title: string, category: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
    >
      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-white rounded-lg flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[10px] font-bold text-medical-gold uppercase tracking-[0.2em] mb-1 lg:mb-2">{category}</p>
      <h4 className="text-base lg:text-lg font-sans font-bold text-white mb-3 lg:mb-4 group-hover:text-medical-teal transition-colors">{title}</h4>
      <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest pt-3 lg:pt-4 border-t border-white/5">
        View guide <ChevronRight size={12} />
      </div>
    </motion.div>
  );
}

function LocationCard({ city, info, address, hours, mapLink }: { city: string, info: string, address: string, hours: string, mapLink?: string }) {
  return (
    <div className="group bg-slate-50/50 rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 card-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6 lg:mb-10">
          <div>
            <h4 className="text-xs font-bold text-medical-teal uppercase tracking-[0.3em] mb-2">{city}</h4>
            <p className="text-lg lg:text-2xl font-sans font-bold text-medical-blue">{info}</p>
          </div>
          <div className="w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-lg lg:rounded-xl flex items-center justify-center text-medical-blue shadow-sm group-hover:bg-medical-blue group-hover:text-white transition-all">
            <MapPin size={20} />
          </div>
        </div>
        <p className="text-gray-500 font-serif leading-relaxed italic text-sm lg:max-w-xs">{address}</p>
        <div className="mt-3 lg:mt-4 flex items-center gap-2 text-medical-gold text-xs font-bold uppercase tracking-widest">
          <Clock size={14} /> {hours}
        </div>
      </div>
      <a href={mapLink || "#"} target="_blank" rel="noopener noreferrer" className="mt-6 lg:mt-8 flex items-center justify-between w-full p-4 lg:p-5 bg-white text-medical-blue rounded-xl font-sans font-bold shadow-sm border border-slate-100 group-hover:bg-medical-blue group-hover:text-white transition-all text-sm lg:text-base">
        Consultation Map <ExternalLink size={16} />
      </a>
    </div>
  );
}
