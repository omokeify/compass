import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { features } from '../data/features';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'DeFi Yield Dashboard',
    desc: 'A comprehensive analytics dashboard for tracking yield farming across multiple chains.',
    img: 'https://picsum.photos/seed/defi-dash/1200/900?grayscale',
    thumb: 'https://picsum.photos/seed/defi-dash/200/120?grayscale'
  },
  {
    id: 2,
    title: 'NFT Marketplace UI',
    desc: 'Next-gen marketplace interface with zero gas fees and instant trades.',
    img: 'https://picsum.photos/seed/nft-market/1200/900?grayscale',
    thumb: 'https://picsum.photos/seed/nft-market/200/120?grayscale'
  },
  {
    id: 3,
    title: 'DAO Governance Portal',
    desc: 'Streamlined voting and proposal management for decentralized autonomous organizations.',
    img: 'https://picsum.photos/seed/dao-gov/1200/900?grayscale',
    thumb: 'https://picsum.photos/seed/dao-gov/200/120?grayscale'
  },
  {
    id: 4,
    title: 'Web3 Mobile Wallet',
    desc: 'Secure, multi-chain mobile wallet with social recovery features.',
    img: 'https://picsum.photos/seed/web3-wallet/1200/900?grayscale',
    thumb: 'https://picsum.photos/seed/web3-wallet/200/120?grayscale'
  }
];

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;

      // Features scroll logic
      const featureElements = document.querySelectorAll('.feature-item');
      let currentFeature = 0;
      featureElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          currentFeature = index;
        }
      });
      setActiveFeature(currentFeature);

      // Projects scroll logic
      const projectElements = document.querySelectorAll('.project-image-item');
      let currentProject = 0;
      projectElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          currentProject = index;
        }
      });
      setActiveProject(currentProject);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 w-full border-b border-brand-border">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-sans font-black text-[12vw] leading-[0.85] tracking-tighter uppercase mb-8 break-words">
              Web3 <br />
              <span className="text-brand-accent">Community</span> <br />
              That Moves.
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 items-start sm:items-center w-full justify-between"
          >
            <p className="font-mono text-sm sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
              A decentralized platform for news, alpha, earning, and learning. 
              Built for the next generation of builders and creators.
            </p>
            <button className="group flex items-center gap-3 bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Explore Alpha
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b border-brand-border overflow-hidden py-4 bg-brand-surface">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-widest text-brand-muted mx-8">
              +++ JOIN THE COMPASS +++ FIND ALPHA +++ EARN REWARDS +++ LEARN SKILLS +++
            </span>
          ))}
        </div>
      </div>

      {/* Spotlight Section */}
      <section className="py-24 px-6 lg:px-12 w-full max-w-7xl mx-auto border-b border-brand-border">
        <div className="flex justify-between items-end mb-16 border-b border-brand-border pb-8">
          <h2 className="font-sans font-black text-4xl sm:text-6xl tracking-tighter uppercase">
            Community <br /> Spotlight
          </h2>
          <span className="font-mono text-sm text-brand-muted hidden sm:block">02 // WINS</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="group relative bg-brand-surface border border-brand-border overflow-hidden flex flex-col md:flex-row"
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
            <img 
              src="https://picsum.photos/seed/sarah/800/800?grayscale" 
              alt="Sarah Chen" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 z-20 bg-brand-bg text-brand-text border border-brand-border px-4 py-2 font-mono text-xs uppercase tracking-widest">
              Member of the Month
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="font-sans font-black text-9xl">"</span>
            </div>
            
            <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tighter mb-6 leading-tight relative z-10">
              "Sarah secured a <span className="text-brand-accent">$5k grant</span> after just 2 months of active contribution in TCC."
            </h3>
            
            <div className="mt-auto pt-8 border-t border-brand-border">
              <p className="font-sans font-bold text-xl uppercase tracking-tighter">Sarah Chen</p>
              <p className="font-mono text-sm text-brand-muted">UX/UI Designer & Web3 Researcher</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Sticky Scroll Section */}
      <section id="features" className="py-24 px-6 lg:px-12 w-full max-w-7xl mx-auto relative">
        <div className="flex justify-between items-end mb-16 border-b border-brand-border pb-8">
          <h2 className="font-sans font-black text-4xl sm:text-6xl tracking-tighter uppercase">
            Platform <br /> Features
          </h2>
          <span className="font-mono text-sm text-brand-muted hidden sm:block">03 // ECOSYSTEM</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          {/* Left side: Scrolling list */}
          <div className="w-full lg:w-1/2 pb-[30vh]">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-item min-h-[40vh] flex flex-col justify-center transition-all duration-700 ${
                  activeFeature === index ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* Indicator square */}
                  <div className={`w-3 h-3 mt-3 shrink-0 transition-colors duration-500 ${
                    activeFeature === index ? 'bg-brand-accent' : 'bg-brand-border'
                  }`} />
                  <div>
                    <span className="font-mono text-sm text-brand-muted mb-4 block">
                      0{index + 1}
                    </span>
                    <h3 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-6">
                      {feature.title}
                    </h3>
                    <p className="font-mono text-base text-brand-muted leading-relaxed max-w-md">
                      {feature.purpose}
                    </p>
                    <Link
                      to={`/${feature.id}`}
                      className="inline-flex items-center gap-2 mt-8 font-mono text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors"
                    >
                      Explore Module <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Sticky Image/Content */}
          <div className="hidden lg:block w-1/2 sticky top-32 h-[calc(100vh-16rem)]">
            <div className="w-full h-full border border-brand-border bg-brand-surface relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* Using Picsum for placeholder images, tinted with brand colors */}
                  <div className="absolute inset-0 bg-brand-accent mix-blend-multiply z-10 opacity-20" />
                  <div className="absolute inset-0 bg-brand-bg mix-blend-color z-10 opacity-60" />
                  <img
                    src={`https://picsum.photos/seed/${features[activeFeature].id}/800/1000?grayscale`}
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay content */}
                  <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent">
                    <div className="w-16 h-16 bg-brand-bg border border-brand-border flex items-center justify-center text-brand-accent mb-6">
                      {React.createElement(features[activeFeature].icon, { className: "w-8 h-8" })}
                    </div>
                    <h4 className="font-sans font-black text-3xl uppercase tracking-tighter text-white">
                      {features[activeFeature].title}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="featured-work" className="w-full border-t border-brand-border bg-brand-bg relative">
        <div className="flex flex-col lg:flex-row w-full">
          
          {/* Left Column: Sticky Text & Thumbnails */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 lg:pl-12 lg:pr-12 py-24 z-20 bg-brand-bg self-start">
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-sans font-black text-5xl sm:text-6xl tracking-tighter">
                Featured Work
              </h2>
              <span className="font-mono text-sm text-brand-muted hidden sm:block">04 // PROJECTS</span>
            </div>
            <p className="font-mono text-brand-muted mb-12 leading-relaxed text-sm sm:text-base">
              We highlight the best projects built by our community. Every line of code, every smart contract, and every interaction feels intentional. The details most teams skip are the details we care about most.
            </p>

            {/* Thumbnails */}
            <div className="flex flex-col gap-4 mb-16">
              {featuredProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    const el = document.getElementById(`project-image-${idx}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative flex items-center gap-4 group w-40"
                >
                  <div className={`relative w-32 h-20 overflow-hidden transition-all duration-500 border border-brand-border ${
                    activeProject === idx 
                      ? 'opacity-100 border-brand-accent' 
                      : 'opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0'
                  }`}>
                    <img 
                      src={proj.thumb} 
                      alt={proj.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover overlay for inactive thumbs */}
                    {activeProject !== idx && (
                      <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-transparent transition-colors duration-300" />
                    )}
                  </div>
                  
                  {/* Active Indicator Square */}
                  <div className={`w-2 h-2 shrink-0 transition-colors duration-300 ${
                    activeProject === idx ? 'bg-brand-accent' : 'bg-transparent'
                  }`} />
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex mt-auto">
              <button className="bg-brand-accent text-black px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                View All
              </button>
              <button className="bg-brand-accent text-black border-l border-black/20 px-4 py-3 hover:bg-white transition-colors">
                +
              </button>
            </div>
          </div>

          {/* Right Column: Scrolling Large Images */}
          <div className="w-full lg:w-2/3 relative">
            {featuredProjects.map((proj, idx) => (
              <motion.div 
                key={proj.id} 
                id={`project-image-${idx}`}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="project-image-item w-full h-[50vh] sm:h-[70vh] lg:h-screen relative bg-brand-surface border-l border-b border-brand-border overflow-hidden"
              >
                {/* Brand tint overlay */}
                <div className="absolute inset-0 bg-brand-accent mix-blend-multiply z-10 opacity-10 pointer-events-none" />
                <div className="absolute inset-0 bg-brand-bg mix-blend-color z-10 opacity-20 pointer-events-none" />
                
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Label Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-bg/90 via-brand-bg/40 to-transparent z-20">
                  <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white mb-2">
                    {proj.title}
                  </h3>
                  <p className="font-mono text-base text-brand-muted max-w-lg">
                    {proj.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
