import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Handshake, ArrowUpRight, Check } from 'lucide-react';

export default function Sponsorship() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                Sponsorship & <br /> <span className="text-brand-accent">Partnership</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                B2B collaboration system. Partner with Compass to reach the African Web3 market.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-brand-border bg-brand-surface p-8 lg:p-12"
          >
            <div className="w-16 h-16 bg-brand-bg border border-brand-border flex items-center justify-center text-brand-accent mb-8">
              <Handshake className="w-8 h-8" />
            </div>
            <h2 className="font-sans font-black text-4xl uppercase tracking-tighter mb-6">
              Why Partner With Us?
            </h2>
            <ul className="space-y-6 font-mono text-sm text-brand-muted">
              <li className="flex gap-4">
                <span className="text-brand-accent">01</span>
                Direct access to a highly engaged community of Web3 builders and enthusiasts in Africa.
              </li>
              <li className="flex gap-4">
                <span className="text-brand-accent">02</span>
                Co-branded educational programs to onboard users to your protocol.
              </li>
              <li className="flex gap-4">
                <span className="text-brand-accent">03</span>
                Talent sourcing for your development and marketing needs.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-brand-border bg-brand-surface p-8 lg:p-12 flex flex-col justify-center"
          >
            <h2 className="font-sans font-black text-3xl uppercase tracking-tighter mb-8">
              Let's Build Together
            </h2>
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 p-8 text-center h-full flex flex-col items-center justify-center">
                <Check className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="font-sans font-black text-3xl text-green-500 uppercase tracking-tighter mb-4">Inquiry Sent</h3>
                <p className="font-mono text-brand-muted">Our partnership team will review your proposal and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input 
                  required
                  type="text" 
                  placeholder="Company Name" 
                  className="w-full bg-brand-bg border border-brand-border text-brand-text font-mono text-sm p-4 focus:outline-none focus:border-brand-accent transition-colors"
                />
                <input 
                  required
                  type="email" 
                  placeholder="Contact Email" 
                  className="w-full bg-brand-bg border border-brand-border text-brand-text font-mono text-sm p-4 focus:outline-none focus:border-brand-accent transition-colors"
                />
                <textarea 
                  required
                  placeholder="Partnership Proposal" 
                  rows={4}
                  className="w-full bg-brand-bg border border-brand-border text-brand-text font-mono text-sm p-4 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                />
                <button type="submit" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors mt-4 flex items-center justify-center gap-2">
                  Submit Inquiry <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
