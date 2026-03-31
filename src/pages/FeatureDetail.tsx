import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { features } from '../data/features';
import { ArrowLeft, CheckCircle2, Zap, Users, Coins, Rocket } from 'lucide-react';

export default function FeatureDetail() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);

  if (!feature) {
    return <Navigate to="/" replace />;
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen pb-24">
      {/* Header Section */}
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12">
        <div className="w-full">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Platform
          </Link>

          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div>
              <div className="w-20 h-20 bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent mb-8">
                <Icon className="w-10 h-10" />
              </div>
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                {feature.title}
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                {feature.purpose}
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="bg-brand-text text-brand-bg px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300">
                Launch Module
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <div className="w-full px-6 lg:px-12 mt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="font-sans font-black text-3xl uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Zap className="w-6 h-6 text-brand-accent" />
                How It Works
              </h2>
              <div className="grid gap-4">
                {feature.howItWorks.map((step, index) => (
                  <div key={index} className="flex gap-4 p-6 border border-brand-border bg-brand-surface/50">
                    <span className="font-mono text-brand-accent font-bold">0{index + 1}</span>
                    <p className="font-mono text-sm text-brand-text leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-sans font-black text-3xl uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Rocket className="w-6 h-6 text-brand-accent" />
                Future Expansion
              </h2>
              <div className="p-8 border border-brand-border bg-brand-surface">
                <ul className="space-y-4">
                  {feature.futureExpansion.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="font-mono text-brand-accent mt-0.5">&rarr;</span>
                      <span className="font-mono text-sm text-brand-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="p-8 border border-brand-border bg-brand-surface">
              <h3 className="font-sans font-black text-xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                <Users className="w-5 h-5 text-brand-accent" />
                Target Users
              </h3>
              <ul className="space-y-4">
                {feature.targetUsers.map((user, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-muted shrink-0 mt-0.5" />
                    <span className="font-mono text-sm text-brand-text">{user}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 border border-brand-border bg-brand-surface">
              <h3 className="font-sans font-black text-xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                <Coins className="w-5 h-5 text-brand-accent" />
                Monetization
              </h3>
              <ul className="space-y-4">
                {feature.monetization.map((method, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                    <span className="font-mono text-sm text-brand-text">{method}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
