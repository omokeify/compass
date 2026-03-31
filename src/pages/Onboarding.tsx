import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, useSupabase } from '../lib/supabase';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 11;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Step 1
    fullName: '', email: '', telegram: '', discord: '',
    // Step 2
    country: '', state: '', maritalStatus: '', ageRange: '',
    // Step 3
    timeInTCC: '', joinDateTCC: '', startDateWeb3: '',
    // Step 4
    inspiration: '', expectations: '',
    // Step 5
    skills: [] as string[], skillLevel: 3, tools: '', hasCerts: '', certsList: '', hasPortfolio: '', portfolioLink: '',
    // Step 6
    workedWithWeb3: '', web3Role: '', web3Brands: '',
    // Step 7
    contributions: [] as string[], contributionCapacity: '',
    // Step 8
    currentStatus: '',
    // Step 9
    openToTeaching: '',
    // Step 10
    hasNetwork: '', networkDesc: '',
    // Step 11
    password: ''
  });

  const updateData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'skills' | 'contributions', item: string) => {
    setFormData(prev => {
      const array = prev[field];
      if (array.includes(item)) {
        return { ...prev, [field]: array.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...array, item] };
      }
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return !!(formData.fullName && formData.email && formData.telegram && formData.discord);
      case 2: return !!(formData.country && formData.state && formData.maritalStatus && formData.ageRange);
      case 3: return !!(formData.timeInTCC && formData.joinDateTCC && formData.startDateWeb3);
      case 4: return !!(formData.inspiration && formData.expectations);
      case 5: return formData.skills.length > 0 && !!formData.tools && !!formData.hasCerts && (formData.hasCerts === 'No' || !!formData.certsList) && !!formData.hasPortfolio && (formData.hasPortfolio === 'No' || !!formData.portfolioLink);
      case 6: return !!formData.workedWithWeb3 && (formData.workedWithWeb3 === 'No' || (!!formData.web3Role && !!formData.web3Brands));
      case 7: return formData.contributions.length > 0 && !!formData.contributionCapacity;
      case 8: return !!formData.currentStatus;
      case 9: return !!formData.openToTeaching;
      case 10: return !!formData.hasNetwork && (formData.hasNetwork === 'No' || !!formData.networkDesc);
      case 11: return !!formData.password && formData.password.length >= 6;
      default: return false;
    }
  };

  const nextStep = () => {
    if (isStepValid()) {
      setStep(s => Math.min(s + 1, totalSteps));
    }
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Save to local storage for immediate session access
    localStorage.setItem('tcc_user_data', JSON.stringify(formData));
    
    // Save to global admin registry (Local Fallback)
    const globalMembers = JSON.parse(localStorage.getItem('compass_global_members') || '[]');
    const newMember = {
      id: Date.now(),
      name: formData.fullName,
      email: formData.email,
      role: formData.web3Role || 'New Builder',
      status: 'Approved',
      date: new Date().toLocaleDateString(),
      details: formData,
      password: formData.password
    };
    
    // Prevent duplicates in local storage
    if (!globalMembers.find((m: any) => m.email === newMember.email)) {
      localStorage.setItem('compass_global_members', JSON.stringify([...globalMembers, newMember]));
    }

    // BROADCAST TO SUPABASE REGISTRY
    if (useSupabase) {
      try {
        await supabase
          .from('profiles')
          .upsert({ 
            id: crypto.randomUUID(),
            fullName: formData.fullName,
            telegram: formData.telegram,
            email: formData.email,
            experience: formData.web3Role || 'Builder',
            signals: ['TCC_MEMBER', 'GENESIS_INTAKE'],
            status: 'PENDING',
            payload: { ...formData, password: formData.password },
            created_at: new Date().toISOString()
          });
      } catch (err) {
        console.error('Supabase Profile Sync Error:', err);
      }
    }

    window.dispatchEvent(new Event('storage'));
    navigate('/dashboard');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header & Progress */}
        <div className="mb-12">
          <h1 className="font-sans font-black text-4xl uppercase tracking-tighter mb-4">
            TCC Member <span className="text-brand-accent">Intake</span>
          </h1>
          <p className="font-mono text-sm text-brand-muted mb-8">
            Welcome to The Compass Community. This form helps us understand your skills, experience, and how best to support and position you for opportunities within Web3.
          </p>
          
          <div className="w-full bg-brand-surface border border-brand-border h-4 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-brand-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 font-mono text-xs text-brand-muted uppercase tracking-widest">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Completed</span>
          </div>
        </div>

        {/* Form Sections */}
        <div className="bg-brand-surface border border-brand-border p-8 md:p-12 relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {step === 1 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">1. Basic Information</h2>
                  <input type="text" placeholder="Full Name (First & Last)" value={formData.fullName} onChange={e => updateData('fullName', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={e => updateData('email', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  <input type="text" placeholder="Telegram Username" value={formData.telegram} onChange={e => updateData('telegram', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  <input type="text" placeholder="Discord Username" value={formData.discord} onChange={e => updateData('discord', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">2. Location & Demographics</h2>
                  <select value={formData.country} onChange={e => updateData('country', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none appearance-none">
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                  <input type="text" placeholder="State/Region" value={formData.state} onChange={e => updateData('state', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  
                  <div className="space-y-4 mt-4">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest">Marital Status</p>
                    {['Single', 'Married', 'Prefer not to say'].map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="marital" checked={formData.maritalStatus === opt} onChange={() => updateData('maritalStatus', opt)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-4 mt-4">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest">Age Range</p>
                    {['Below 20', '20–30', '30–40', '40 & above'].map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="age" checked={formData.ageRange === opt} onChange={() => updateData('ageRange', opt)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">3. Community & Web3 Journey</h2>
                  <input type="text" placeholder="How long have you been in TCC?" value={formData.timeInTCC} onChange={e => updateData('timeInTCC', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  <div>
                    <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">When did you join TCC?</label>
                    <input type="month" value={formData.joinDateTCC} onChange={e => updateData('joinDateTCC', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">When did you start your Web3 journey?</label>
                    <input type="month" value={formData.startDateWeb3} onChange={e => updateData('startDateWeb3', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">4. Motivation & Expectations</h2>
                  <textarea placeholder="What inspired you to join The Compass Community?" value={formData.inspiration} onChange={e => updateData('inspiration', e.target.value)} rows={4} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none" />
                  <textarea placeholder="What are your short-term and long-term expectations in TCC?" value={formData.expectations} onChange={e => updateData('expectations', e.target.value)} rows={4} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none" />
                </>
              )}

              {step === 5 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">5. Skills & Expertise</h2>
                  <div className="space-y-4">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest">What tech/Web3 skills do you have?</p>
                    {['Trading (Spot/Futures)', 'Research/Analysis', 'Content Creation', 'Community Management', 'Graphic Design', 'Development (Frontend/Backend/Web3)', 'Marketing/Growth', 'Data Analysis'].map(skill => (
                      <label key={skill} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.skills.includes(skill)} onChange={() => toggleArrayItem('skills', skill)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-4">Rate your overall skill level (1-5)</p>
                    <input type="range" min="1" max="5" value={formData.skillLevel} onChange={e => updateData('skillLevel', parseInt(e.target.value))} className="w-full accent-brand-accent" />
                    <div className="flex justify-between font-mono text-xs mt-2 text-brand-muted">
                      <span>1 - Beginner</span>
                      <span className="text-brand-accent font-bold text-lg">{formData.skillLevel}</span>
                      <span>5 - Advanced</span>
                    </div>
                  </div>

                  <textarea placeholder="What tools are you very knowledgeable with? (e.g., TradingView, Notion, Dune, Canva)" value={formData.tools} onChange={e => updateData('tools', e.target.value)} rows={3} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none mt-4" />

                  <div className="mt-4">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-2">Do you have any certifications?</p>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={formData.hasCerts === opt} onChange={() => updateData('hasCerts', opt)} className="accent-brand-accent w-4 h-4" />
                          <span className="font-mono text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {formData.hasCerts === 'Yes' && (
                      <motion.textarea initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} placeholder="List your certifications" value={formData.certsList} onChange={e => updateData('certsList', e.target.value)} rows={2} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none mt-4" />
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-2">Do you have a portfolio?</p>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={formData.hasPortfolio === opt} onChange={() => updateData('hasPortfolio', opt)} className="accent-brand-accent w-4 h-4" />
                          <span className="font-mono text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {formData.hasPortfolio === 'Yes' && (
                      <motion.input initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} type="text" placeholder="Share your portfolio link" value={formData.portfolioLink} onChange={e => updateData('portfolioLink', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none mt-4" />
                    )}
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">6. Work Experience</h2>
                  <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-2">Have you worked with a Web3 brand before?</p>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={formData.workedWithWeb3 === opt} onChange={() => updateData('workedWithWeb3', opt)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {formData.workedWithWeb3 === 'Yes' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mt-4">
                      <input type="text" placeholder="What was your role?" value={formData.web3Role} onChange={e => updateData('web3Role', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                      <input type="text" placeholder="Which brand(s) have you worked with?" value={formData.web3Brands} onChange={e => updateData('web3Brands', e.target.value)} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" />
                    </motion.div>
                  )}
                </>
              )}

              {step === 7 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">7. Contribution & Roles</h2>
                  <div className="space-y-4">
                    <p className="font-mono text-sm text-brand-muted uppercase tracking-widest">What areas are you comfortable contributing to?</p>
                    {['Community Moderation', 'Content Creation', 'Trading/Signals', 'Research & Reports', 'Events/Spaces Hosting', 'Business Development', 'Technical Development', 'Design', 'Education/Training'].map(role => (
                      <label key={role} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.contributions.includes(role)} onChange={() => toggleArrayItem('contributions', role)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{role}</span>
                      </label>
                    ))}
                  </div>
                  <textarea placeholder="In what capacity can you contribute to TCC?" value={formData.contributionCapacity} onChange={e => updateData('contributionCapacity', e.target.value)} rows={4} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none mt-4" />
                </>
              )}

              {step === 8 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">8. Current Status</h2>
                  <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-4">What best describes your current situation?</p>
                  <div className="space-y-4">
                    {['Job Hunting', 'Freelancing', 'Learning', 'Building'].map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" checked={formData.currentStatus === opt} onChange={() => updateData('currentStatus', opt)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {step === 9 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">9. Teaching & Leadership</h2>
                  <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-4">Are you open to teaching or mentoring others?</p>
                  <div className="space-y-4">
                    {['Yes', 'No', 'Maybe'].map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" checked={formData.openToTeaching === opt} onChange={() => updateData('openToTeaching', opt)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {step === 10 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4">10. Network & Reach</h2>
                  <p className="font-mono text-sm text-brand-muted uppercase tracking-widest mb-4">Do you have access to any audience, community, or network?</p>
                  <div className="flex gap-4 mb-4">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={formData.hasNetwork === opt} onChange={() => updateData('hasNetwork', opt)} className="accent-brand-accent w-4 h-4" />
                        <span className="font-mono text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {formData.hasNetwork === 'Yes' && (
                    <motion.textarea initial={{ opacity: 0 }} animate={{ opacity: 1 }} placeholder="Describe your audience/network (platform, size, niche)" value={formData.networkDesc} onChange={e => updateData('networkDesc', e.target.value)} rows={4} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none resize-none" />
                  )}
                </>
              )}

              {step === 11 && (
                <>
                  <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 border-b border-brand-border pb-4 text-brand-accent">11. Security Protocol</h2>
                  <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-6 leading-relaxed">Establish your unique <span className="text-white">Command Key</span> to securely access your Dashboard.</p>
                  <div className="space-y-4">
                     <p className="font-mono text-[10px] text-brand-muted uppercase">Create Password (Min 6 Characters)</p>
                     <input 
                      type="password" 
                      placeholder="Enter Command Key..." 
                      value={formData.password} 
                      onChange={e => updateData('password', e.target.value)} 
                      className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none" 
                     />
                     <div className="p-4 border border-brand-accent/20 bg-brand-accent/5">
                        <p className="font-mono text-[9px] text-brand-accent uppercase tracking-widest leading-relaxed italic">
                           This key, paired with your Telegram username or Email, will be your secure gateway into the TCC Hub.
                        </p>
                     </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-end mt-8 gap-4">
          {!isStepValid() && (
            <p className="font-mono text-xs text-red-500 uppercase tracking-widest">
              * Please answer all required questions to proceed.
            </p>
          )}
          <div className="flex justify-between w-full">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest border border-brand-border transition-colors ${step === 1 ? 'opacity-50 cursor-not-allowed text-brand-muted' : 'text-brand-text hover:bg-brand-surface hover:text-brand-accent'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            {step < totalSteps ? (
              <button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${!isStepValid() ? 'bg-brand-surface text-brand-muted cursor-not-allowed border border-brand-border' : 'bg-brand-accent text-black hover:bg-white'}`}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${!isStepValid() ? 'bg-brand-surface text-brand-muted cursor-not-allowed border border-brand-border' : 'bg-green-500 text-black hover:bg-green-400'}`}
              >
                Submit Mission <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
