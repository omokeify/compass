import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

// Mock data for the specific alpha requested
const alphaData = {
  id: '1',
  title: 'Undiscovered L1 Airdrop Strategy',
  category: 'Airdrop',
  risk: 'High',
  reward: 'High',
  status: 'Active',
  datePosted: 'Mar 30, 2026',
  author: 'Compass Research Team',
  overview: 'A new Layer 1 blockchain focused on parallelized EVM execution has just launched its incentivized testnet. With less than 10,000 active wallets currently participating and a confirmed token allocation for testnet users, this presents a massive asymmetric opportunity.',
  steps: [
    { title: 'Setup Wallet', desc: 'Add the custom RPC network to your MetaMask or Rabby wallet. Ensure you are using a burner wallet for safety.' },
    { title: 'Claim Faucet Tokens', desc: 'Visit the official Discord, verify your account, and use the #faucet channel to claim testnet tokens every 24 hours.' },
    { title: 'Bridge Assets', desc: 'Use the official testnet bridge to move Sepolia ETH over to the new L1. Volume matters here, aim for at least 3 bridge transactions.' },
    { title: 'Interact with DApps', desc: 'Swap tokens on their native DEX, provide liquidity to the ETH/USDC pool, and mint the early adopter NFT on their launchpad.' }
  ],
  warnings: [
    'This is a testnet, expect bugs and failed transactions.',
    'Do NOT use your main wallet. Always use a dedicated burner wallet for airdrop farming.',
    'Beware of scam links on Twitter. Only use official links provided below.'
  ]
};

export default function AlphaDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen pb-24 bg-brand-bg">
      {/* Header */}
      <header className="border-b border-brand-border pt-32 pb-12 px-6 lg:px-12 bg-brand-surface relative">
        <div className="w-full max-w-4xl mx-auto relative z-10">
          <Link to="/alpha-corner" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Alpha Corner
          </Link>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-brand-bg text-brand-accent border border-brand-accent/20 px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {alphaData.status}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {alphaData.category}
            </span>
          </div>
          
          <h1 className="font-sans font-black text-4xl sm:text-6xl tracking-tighter uppercase mb-6">
            {alphaData.title}
          </h1>
          
          <div className="flex flex-wrap gap-8 font-mono text-sm uppercase tracking-widest text-brand-muted border-t border-brand-border pt-6">
            <div>Risk: <span className="text-red-500 font-bold">{alphaData.risk}</span></div>
            <div>Reward: <span className="text-green-500 font-bold">{alphaData.reward}</span></div>
            <div>Posted: <span className="text-brand-text">{alphaData.datePosted}</span></div>
            <div>By: <span className="text-brand-text">{alphaData.author}</span></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="w-full px-6 lg:px-12 mt-12 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Overview */}
          <section>
            <h2 className="font-sans font-black text-3xl uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-brand-accent" /> The Opportunity
            </h2>
            <p className="font-mono text-lg text-brand-muted leading-relaxed">
              {alphaData.overview}
            </p>
          </section>

          {/* Steps */}
          <section>
            <h2 className="font-sans font-black text-3xl uppercase tracking-tighter mb-6">
              Execution Strategy
            </h2>
            <div className="space-y-6">
              {alphaData.steps.map((step, idx) => (
                <div key={idx} className="border border-brand-border bg-brand-surface p-6 flex gap-6">
                  <div className="font-sans font-black text-4xl text-brand-accent opacity-50">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl uppercase tracking-tighter mb-2">{step.title}</h3>
                    <p className="font-mono text-sm text-brand-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Warnings */}
          <section className="border border-red-500/30 bg-red-500/5 p-8">
            <h2 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-6 h-6" /> Security Warnings
            </h2>
            <ul className="space-y-4">
              {alphaData.warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-3 font-mono text-sm text-brand-muted">
                  <span className="text-red-500 mt-1">•</span> {warning}
                </li>
              ))}
            </ul>
          </section>

          {/* Action */}
          <section className="pt-8 border-t border-brand-border flex justify-center">
            <button className="bg-brand-accent text-black px-12 py-6 font-mono text-lg font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-3">
              <CheckCircle className="w-6 h-6" /> Mark as Completed
            </button>
          </section>

        </motion.div>
      </main>
    </div>
  );
}
