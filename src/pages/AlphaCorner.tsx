import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gem, Lock, ArrowUpRight } from 'lucide-react';

const alphas = [
  { id: 1, title: 'Undiscovered L1 Airdrop Strategy', risk: 'High', reward: 'High', status: 'Active' },
  { id: 2, title: 'New DeFi Protocol Yield Farming', risk: 'Medium', reward: 'High', status: 'Active' },
  { id: 3, title: 'Upcoming NFT Mint Whitelist', risk: 'Low', reward: 'Medium', status: 'Closing Soon' },
];

export default function AlphaCorner() {
  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                Alpha <br /> <span className="text-brand-accent">Corner</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Early-stage Web3 opportunities. Highly curated, high-signal alpha for the community.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors border border-transparent flex items-center gap-2">
                <Lock className="w-4 h-4" /> Unlock Premium
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {alphas.map((alpha, index) => (
            <motion.div
              key={alpha.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border border-brand-border bg-brand-surface p-6 sm:p-8 hover:border-brand-accent transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-bg border border-brand-border flex items-center justify-center text-brand-accent shrink-0">
                  <Gem className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-2">
                    {alpha.title}
                  </h3>
                  <div className="flex gap-4 font-mono text-xs uppercase tracking-widest text-brand-muted">
                    <span>Risk: <span className="text-brand-text">{alpha.risk}</span></span>
                    <span>Reward: <span className="text-brand-text">{alpha.reward}</span></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-4">
                <span className="bg-brand-bg text-brand-accent border border-brand-accent/20 px-3 py-1 font-mono text-xs uppercase tracking-widest self-start sm:self-auto">
                  {alpha.status}
                </span>
                <Link to={`/alpha-corner/${alpha.id}`} className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors">
                  View Alpha <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
