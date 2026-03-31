import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, DollarSign, ArrowUpRight, ArrowLeft, Check } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const opportunities = [
  { id: 1, title: 'Smart Contract Audit Bounty', protocol: 'DeFi Swap', reward: '$5,000 USDC', type: 'Bounty', description: 'We are looking for experienced smart contract auditors to review our new automated market maker (AMM) contracts before mainnet launch. The codebase is written in Solidity and utilizes advanced mathematical models for pricing. You will be responsible for identifying vulnerabilities, suggesting gas optimizations, and providing a comprehensive audit report.', requirements: ['3+ years Solidity experience', 'Previous audit reports', 'Deep understanding of DeFi protocols'] },
  { id: 2, title: 'Frontend Developer (React/Web3)', protocol: 'NFT Marketplace', reward: '$120k/yr', type: 'Full-time', description: 'Join our core team to build the next generation of NFT marketplaces. You will be responsible for creating responsive, high-performance user interfaces that interact seamlessly with our smart contracts.', requirements: ['React/Next.js', 'Ethers.js/viem', 'Tailwind CSS'] },
  { id: 3, title: 'Community Moderator', protocol: 'Gaming DAO', reward: '$500/mo', type: 'Part-time', description: 'Help us manage our growing Discord community. You will answer questions, organize events, and ensure a positive environment for all members.', requirements: ['Discord moderation experience', 'Knowledge of Web3 gaming', 'Excellent communication skills'] },
  { id: 4, title: 'Write Technical Documentation', protocol: 'L2 Network', reward: '$1,000 USDC', type: 'Bounty', description: 'We need a technical writer to create comprehensive documentation for our new Layer 2 scaling solution. This includes API references, tutorials, and architecture overviews.', requirements: ['Technical writing experience', 'Understanding of rollups', 'Markdown proficiency'] },
];

export default function EarningOpportunities() {
  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                Earning <br /> <span className="text-brand-accent">Opportunities</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Income-generating Web3 hub. Bounties, jobs, and tasks from top protocols.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/earning-opportunities/new" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors border border-transparent flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Post Opportunity
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group border border-brand-border bg-brand-surface p-8 hover:border-brand-accent transition-colors duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
                  {opp.type}
                </span>
                <div className="flex items-center gap-1 text-brand-accent font-mono font-bold">
                  <DollarSign className="w-4 h-4" />
                  {opp.reward}
                </div>
              </div>
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-2">
                {opp.title}
              </h3>
              <p className="font-mono text-sm text-brand-muted mb-8">
                {opp.protocol}
              </p>
              <Link to={`/earning-opportunities/${opp.id}`} className="mt-auto w-full flex items-center justify-between border-t border-brand-border pt-4 font-mono text-sm font-bold uppercase tracking-widest text-brand-text group-hover:text-brand-accent transition-colors">
                View Details
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OpportunityDetail() {
  const { id } = useParams();
  const opp = opportunities.find(o => o.id === Number(id)) || opportunities[0];
  const [applied, setApplied] = useState(false);

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
      <Link to="/earning-opportunities" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Opportunities
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Briefcase className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-brand-bg text-brand-accent border border-brand-accent/20 px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {opp.type}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {opp.protocol}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> {opp.reward}
            </span>
          </div>

          <h1 className="font-sans font-black text-5xl sm:text-6xl uppercase tracking-tighter mb-12 border-b border-brand-border pb-12">
            {opp.title}
          </h1>

          <div className="mb-12">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Description</h3>
            <p className="font-mono text-lg leading-relaxed text-brand-muted">
              {opp.description}
            </p>
          </div>

          <div className="mb-12">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Requirements</h3>
            <ul className="list-disc list-inside font-mono text-lg leading-relaxed text-brand-muted space-y-2">
              {opp.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setApplied(true)}
            disabled={applied}
            className={`w-full py-6 font-mono text-lg font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3 ${applied ? 'bg-green-500 text-black' : 'bg-brand-accent text-black hover:bg-white'}`}
          >
            {applied ? (
              <><Check className="w-6 h-6" /> Application Submitted</>
            ) : (
              'Apply Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PostOpportunity() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/earning-opportunities');
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-3xl mx-auto">
      <Link to="/earning-opportunities" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Opportunities
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12">
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-4">
          Post an Opportunity
        </h1>
        <p className="font-mono text-sm text-brand-muted mb-12">
          List a bounty, job, or task for the community.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 p-8 text-center">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-sans font-black text-2xl text-green-500 uppercase tracking-tighter mb-2">Opportunity Posted</h3>
            <p className="font-mono text-sm text-brand-muted">Redirecting to listings...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Title</label>
              <input required type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Smart Contract Audit Bounty" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Protocol / Company</label>
                <input required type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. DeFi Swap" />
              </div>
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Type</label>
                <select required className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text">
                  <option value="Bounty">Bounty</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Reward / Salary</label>
              <input required type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. $5,000 USDC" />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Description</label>
              <textarea required rows={5} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text resize-none" placeholder="Describe the opportunity..." />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Requirements (comma separated)</label>
              <input required type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. 3+ years Solidity, Previous audits" />
            </div>
            <button type="submit" className="w-full bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Post Opportunity
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
