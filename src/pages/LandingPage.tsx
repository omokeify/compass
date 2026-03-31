import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { features } from '../data/features';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { TextGlitch } from '../components/ui/text-glitch-effect';
import { useNavigate } from 'react-router-dom';
import { supabase, useSupabase } from '../lib/supabase';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  // Dynamic Content States
  const [hero, setHero] = useState({ 
    title: "Web3 Community That Moves.", 
    desc: "A decentralized platform for news, alpha, earning, and learning. Built for the next generation of builders and creators." 
  });
  const [spotlight, setSpotlight] = useState({
    name: "Sarah Chen",
    role: "UX/UI Designer & Web3 Researcher",
    quote: "Sarah secured a $5k grant after just 2 months of active contribution in TCC.",
    img: "https://picsum.photos/seed/sarah/800/800?grayscale"
  });
  const [marqueeText, setMarqueeText] = useState('+++ JOIN THE COMPASS +++ FIND ALPHA +++ EARN REWARDS +++ LEARN SKILLS +++');
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [comparisonRows, setComparisonRows] = useState<any[]>([]);
  const [serviceCards, setServiceCards] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const syncVision = async () => {
      // Marquee
      const mSettings = JSON.parse(localStorage.getItem('compass_marquee_settings') || '{"text":"+++ JOIN THE COMPASS +++ FIND ALPHA +++ EARN REWARDS +++ LEARN SKILLS +++"}');
      setMarqueeText(mSettings.text);

      // SUPABASE DATA FETCHING
      if (useSupabase) {
        try {
          // Fetch Vision Configs
          const { data: config } = await supabase.from('platform_config').select('*');
          if (config) {
            const heroRow = config.find(c => c.id === 'compass_hero_content');
            const spotlightRow = config.find(c => c.id === 'compass_spotlight_content');
            const comparisonsRow = config.find(c => c.id === 'compass_comparison_rows');
            const servicesRow = config.find(c => c.id === 'compass_service_cards');
            const marqueeRow = config.find(c => c.id === 'compass_marquee_settings');

            if (heroRow) setHero(heroRow.content);
            if (spotlightRow) setSpotlight(spotlightRow.content);
            if (comparisonsRow) setComparisonRows(comparisonsRow.content);
            if (servicesRow) setServiceCards(servicesRow.content);
            if (marqueeRow) setMarqueeText(marqueeRow.content.text);
          }

          // Fetch Feeds (Projects & FAQs)
          const { data: alphaData } = await supabase.from('alpha_bounties_gigs').select('*').eq('is_live', true);
          if (alphaData) {
            const projList = alphaData.filter(a => a.type === 'PROJECT').map(a => a.payload);
            const faqList = alphaData.filter(a => a.type === 'FAQ').map(a => a.payload);
            if (projList.length > 0) setFeaturedProjects(projList);
            if (faqList.length > 0) setFaqs(faqList);
          }
        } catch (err) {
          console.error('Supabase fetch failed, falling back:', err);
        }
      }

      // Local Fallbacks (If Supabase is disabled or empty)
      if (!useSupabase || featuredProjects.length === 0) {
        const savedProjects = JSON.parse(localStorage.getItem('compass_global_projects') || '[]');
        if (savedProjects.length > 0) {
          setFeaturedProjects(savedProjects);
        } else {
          setFeaturedProjects([
            { id: 1, title: 'DeFi Yield Dashboard', desc: 'A comprehensive analytics dashboard for tracking yield farming.', img: 'https://picsum.photos/seed/defi-dash/1200/900?grayscale', thumb: 'https://picsum.photos/seed/defi-dash/200/120?grayscale' },
            { id: 2, title: 'NFT Marketplace UI', desc: 'Next-gen marketplace interface with zero gas fees.', img: 'https://picsum.photos/seed/nft-market/1200/900?grayscale', thumb: 'https://picsum.photos/seed/nft-market/200/120?grayscale' },
            { id: 3, title: 'DAO Governance Portal', desc: 'Streamlined voting and proposal management.', img: 'https://picsum.photos/seed/dao-gov/1200/900?grayscale', thumb: 'https://picsum.photos/seed/dao-gov/200/120?grayscale' },
            { id: 4, title: 'Web3 Mobile Wallet', desc: 'Secure, multi-chain mobile wallet with social recovery.', img: 'https://picsum.photos/seed/web3-wallet/1200/900?grayscale', thumb: 'https://picsum.photos/seed/web3-wallet/200/120?grayscale' }
          ]);
        }
      }

      if (!useSupabase || comparisonRows.length === 0) {
        const savedRows = JSON.parse(localStorage.getItem('compass_comparison_rows') || '[]');
        if (savedRows.length > 0) setComparisonRows(savedRows);
        else setComparisonRows([
          { label: 'Signal Source', legacy: 'Crowdsourced', paid: 'Single Caller', compass: 'Vetted Experts' },
          { label: 'Access Cost', legacy: 'Hidden/Variable', paid: 'Premium Subs', compass: 'Integrated Value' },
          { label: 'Platform', legacy: 'Noisy Discord', paid: 'Telegram Bot', compass: 'Dynamic Hub' },
          { label: 'Reliability', legacy: 'Unverified', paid: 'Hit or Miss', compass: 'Real-time Signal' },
          { label: 'Engagement', legacy: 'Passive', paid: 'One-way', compass: 'Active Bounties' },
          { label: 'Outcome', legacy: 'Liquidity', paid: 'Short-term', compass: 'Shared Growth' },
        ]);
      }

      if (!useSupabase || serviceCards.length === 0) {
        const savedServices = JSON.parse(localStorage.getItem('compass_service_cards') || '[]');
        if (savedServices.length > 0) setServiceCards(savedServices);
        else setServiceCards([
          { title: "Real-Time Alpha", hover: "INSTANT SIGNAL", desc: "Verified signal across DeFi, NFTs, and emerging chains.", link: "/alpha-corner" },
          { title: "KOL Network", hover: "AMPLIFY REACH", desc: "Direct access to top-tier Key Opinion Leaders.", link: "/dashboard" },
          { title: "Viral Marketing", hover: "BUILD HYPΞ", desc: "Creative, high-impact marketing campaigns.", link: "/dashboard" },
          { title: "Earning Bounties", hover: "GET PΛID", desc: "Direct access to curated gig opportunities.", link: "/earning-opportunities" },
          { title: "Talent Hub", hover: "HIRΞ BUILDΞRS", desc: "Hire the best Web3 builders or offer services.", link: "/skill-marketplace" },
          { title: "Launchpad Support", hover: "GO-TO-MΛRKΞT", desc: "Strategic guidance for token launches.", link: "/dashboard" },
          { title: "PR & Media", hover: "STΛY VISIBLΞ", desc: "Secured features in leading Web3 publications.", link: "/dashboard" },
          { title: "Governance Advisory", hover: "SCΛLΞ DΛOS", desc: "Expert consulting on DAO structure.", link: "/dashboard" },
          { title: "Narrative Building", hover: "CRΞΛTΞ STORY", desc: "Crafting compelling project stories.", link: "/dashboard" }
        ]);
      }

      if (!useSupabase || faqs.length === 0) {
        const savedFaqs = JSON.parse(localStorage.getItem('compass_global_faqs') || '[]');
        if (savedFaqs.length > 0) setFaqs(savedFaqs);
        else setFaqs([
          { question: "What exactly is Compass?", answer: "Compass is a gated intelligence hub for the Web3 elite. We combine high-signal alpha, structured earning opportunities, and a directory of verified talent into one seamless experience." },
          { question: "How do I get access to the Hub?", answer: "Access is granted through our verified onboarding sequence. Once you submit your builder profile and it passes our initial signal check, you'll gain access to Tier 1 of the ecosystem." },
          { question: "Are there costs involved?", answer: "Entry to the basic hub (Tier 1) is open for those who pass verification. Advanced Alpha channels and elite Genesis bounties may require specific reputation scores." },
          { question: "How fast can I start earning?", answer: "Immediately after onboarding. Once you're in, you can browse the Earning Ops tab for active bounties or list your services in the Skills Marketplace." }
        ]);
      }
    };

    syncVision();
    window.addEventListener('storage', syncVision);
    return () => window.removeEventListener('storage', syncVision);
  }, [useSupabase]);

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
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Hero Section */}
      <section className="relative pb-24 px-6 lg:px-12 w-full border-b border-brand-border overflow-hidden bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:40px_40px]">
        <div className="w-full relative">
          {/* Visual Dot from Image */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 bg-brand-accent rounded-full mb-8 ml-32"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-sans font-black text-[12vw] leading-[0.85] tracking-tighter uppercase mb-12 break-words text-white">
              Web3 <br />
              <span className="text-brand-accent">Community</span> <br />
              That Moves.
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 items-end sm:items-center w-full justify-between"
          >
            <p className="font-mono text-sm sm:text-base text-brand-muted max-w-xl leading-relaxed uppercase tracking-wider">
              {hero.desc}
            </p>
            <button className="group flex items-center gap-4 bg-brand-accent text-black px-10 py-5 font-mono text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300">
              Explore Alpha
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b border-brand-border overflow-hidden py-4 bg-brand-surface">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-widest text-brand-muted mx-8">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Spotlight Section */}
      <section className="py-24 px-6 lg:px-12 w-full max-w-7xl mx-auto border-b border-brand-border">
        <div className="flex justify-between items-end mb-16 border-b border-brand-border pb-8">
          <h2 className="font-sans font-black text-4xl sm:text-6xl tracking-tighter uppercase text-white">
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
              src={spotlight.img} 
              alt={spotlight.name} 
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
            
            <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tighter mb-6 leading-tight relative z-10 text-white">
              {spotlight.quote.split(/(\$5k grant)/i).map((part, i) => (
                <React.Fragment key={i}>
                  {part.toLowerCase() === '$5k grant' ? (
                    <span className="text-brand-accent">{part}</span>
                  ) : (
                    part
                  )}
                </React.Fragment>
              ))}
            </h3>
            
            <div className="mt-auto pt-8 border-t border-brand-border">
              <p className="font-sans font-bold text-xl uppercase tracking-tighter text-white">{spotlight.name}</p>
              <p className="font-mono text-sm text-brand-muted">{spotlight.role}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Sticky Scroll Section */}
      <section id="features" className="py-24 px-6 lg:px-12 w-full max-w-7xl mx-auto relative">
        <div className="flex justify-between items-end mb-16 border-b border-brand-border pb-8">
          <h2 className="font-sans font-black text-4xl sm:text-6xl tracking-tighter uppercase text-white">
            Platform <br /> <span className="text-brand-accent">Features</span>
          </h2>
          <span className="font-mono text-sm text-brand-muted hidden sm:block">03 // ECOSYSTEM</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          <div className="w-full lg:w-1/2 pb-[30vh]">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-item min-h-[40vh] flex flex-col justify-center transition-all duration-700 ${
                  activeFeature === index ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-3 h-3 mt-3 shrink-0 transition-colors duration-500 ${
                    activeFeature === index ? 'bg-brand-accent' : 'bg-brand-border'
                  }`} />
                  <div>
                    <span className="font-mono text-sm text-brand-muted mb-4 block">
                      0{index + 1}
                    </span>
                    <h3 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-6 text-white">
                      {feature.title}
                    </h3>
                    <p className="font-mono text-base text-brand-muted leading-relaxed max-w-md">
                      {feature.purpose}
                    </p>
                    <button
                      onClick={() => {
                        const isRegistered = localStorage.getItem('tcc_user_data');
                        navigate(isRegistered ? `/${feature.id}` : '/onboarding');
                      }}
                      className="inline-flex items-center gap-2 mt-8 font-mono text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors"
                    >
                      Explore Module <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                  <div className="absolute inset-0 bg-brand-accent mix-blend-multiply z-10 opacity-20" />
                  <div className="absolute inset-0 bg-brand-bg mix-blend-color z-10 opacity-60" />
                  <img
                    src={`https://picsum.photos/seed/${features[activeFeature].id}/800/1000?grayscale`}
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
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
          <div className="w-full lg:w-1/3 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 lg:pl-12 lg:pr-12 py-24 z-20 bg-brand-bg self-start">
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-sans font-black text-5xl sm:text-6xl tracking-tighter text-white">
                Work <br /> <span className="text-brand-accent">Gallery</span>
              </h2>
              <span className="font-mono text-sm text-brand-muted hidden sm:block">04 // PROJECTS</span>
            </div>
            <p className="font-mono text-brand-muted mb-12 leading-relaxed text-sm sm:text-base">
              The high-fidelity work that defines our community's standard of excellence.
            </p>
            <div className="flex flex-col gap-4 mb-16">
              {featuredProjects.map((proj, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const el = document.getElementById(`project-image-${idx}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative flex items-center gap-4 group w-40"
                >
                  <div className={`relative w-32 h-20 overflow-hidden transition-all duration-500 border border-brand-border ${
                    activeProject === idx ? 'opacity-100 border-brand-accent' : 'opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0'
                  }`}>
                    <img src={proj.thumb} alt={proj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {activeProject !== idx && <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-transparent transition-colors duration-300" />}
                  </div>
                  <div className={`w-2 h-2 shrink-0 transition-colors duration-300 ${activeProject === idx ? 'bg-brand-accent' : 'bg-transparent'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3 relative">
            {featuredProjects.map((proj, idx) => (
              <motion.div 
                key={idx} 
                id={`project-image-${idx}`}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="project-image-item w-full h-[50vh] sm:h-[70vh] lg:h-screen relative bg-brand-surface border-l border-b border-brand-border overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent mix-blend-multiply z-10 opacity-10 pointer-events-none" />
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-bg/90 via-brand-bg/40 to-transparent z-20">
                  <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white mb-2">{proj.title}</h3>
                  <p className="font-mono text-base text-brand-muted max-w-lg">{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Compass? Comparison Section */}
      <section id="why-compass" className="py-32 px-6 lg:px-12 w-full border-t border-brand-border">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="w-full lg:w-1/3">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-8 leading-[0.9] text-white">
                Why <br /><span className="text-brand-accent">Compass?</span>
              </h2>
              <p className="font-mono text-brand-muted mb-12 leading-relaxed">
                Navigating the noise with precision. We combine the depth of research with the speed of a degen community.
              </p>
              <div className="flex items-stretch h-14 w-full sm:w-64">
                <button className="flex-1 bg-brand-accent text-black px-8 font-mono text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all">Join Mission</button>
                <button className="aspect-square bg-brand-accent text-black border-l border-black/10 flex items-center justify-center hover:bg-white transition-all"><ArrowRight className="w-5 h-5"/></button>
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="bg-brand-surface border border-brand-border overflow-hidden">
              <div className="grid grid-cols-4 border-b border-brand-border">
                <div className="p-4 border-r border-brand-border"></div>
                <div className="p-4 border-r border-brand-border flex items-end"><span className="font-mono text-[9px] uppercase text-brand-muted">Legacy</span></div>
                <div className="p-4 border-r border-brand-border flex items-end"><span className="font-mono text-[9px] uppercase text-brand-muted">Paid Callers</span></div>
                <div className="p-4 bg-white flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent"/><span className="font-mono text-[9px] uppercase font-black text-black">Compass</span></div>
              </div>
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 border-b border-brand-border last:border-b-0">
                  <div className="p-4 border-r border-brand-border flex items-center"><span className="font-mono text-[9px] uppercase text-brand-muted">{row.label}</span></div>
                  <div className="p-4 border-r border-brand-border flex items-center"><span className="font-sans text-xs text-brand-muted/80">{row.legacy}</span></div>
                  <div className="p-4 border-r border-brand-border flex items-center"><span className="font-sans text-xs text-brand-muted/80">{row.paid}</span></div>
                  <div className="p-4 bg-white/95 flex items-center"><span className="font-sans text-xs font-bold text-black">{row.compass}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 lg:px-12 w-full border-t border-brand-border bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8">
            <h2 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase leading-[0.9] text-white">
               One Hub. <br /> <span className="text-brand-accent">Full Access.</span>
            </h2>
            <span className="font-mono text-xs uppercase text-brand-accent tracking-widest">// INTEGRATED MODULES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {serviceCards.map((card, i) => (
              <div key={i} onClick={() => {
                const isRegistered = localStorage.getItem('tcc_user_data');
                navigate(isRegistered ? card.link : '/onboarding');
              }} className="space-y-6 group cursor-pointer border-b border-brand-border pb-6 hover:border-brand-accent transition-colors">
                <TextGlitch text={card.title} hoverText={card.hover} className="font-mono !text-xs font-black uppercase tracking-widest text-white"/>
                <p className="font-mono text-xs text-brand-muted leading-relaxed group-hover:text-brand-text transition-colors">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 lg:px-12 border-t border-brand-border bg-brand-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-white">
              FAQ <br /> <span className="text-brand-accent">HINT</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Catalyst Section */}
      <section className="py-32 px-6 lg:px-12 border-t border-brand-border bg-brand-bg relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/5 -skew-x-12 transform origin-top translate-x-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="font-sans font-black text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-white transition-all hover:text-brand-accent cursor-default">
              Launch a <br /> mission.
            </h2>
            <div className="relative aspect-[4/3] w-full border border-brand-border bg-brand-surface overflow-hidden group">
               <div className="absolute inset-0 bg-brand-accent mix-blend-multiply opacity-0 group-hover:opacity-20 transition-all duration-700 z-10" />
               <img 
                src="/hub_commanders_minimalist.png" 
                alt="Hub Commanders" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
               />
               <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-4 bg-brand-bg border border-brand-border px-4 py-2 opacity-80 backdrop-blur-md">
                     <div className="w-2 h-2 bg-brand-accent animate-pulse rounded-full" />
                     <span className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">Coordinators Active</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Action Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full justify-between pt-12"
          >
            <div className="space-y-12">
               <h3 className="font-sans font-bold text-2xl sm:text-3xl uppercase tracking-tighter text-white leading-tight">
                  Schedule a 15-minute intel session or broadcast a signal. <span className="text-brand-muted">No gatekeepers.</span>
               </h3>

               <div className="space-y-6 pt-12 border-t border-brand-border/30">
                  <div className="space-y-1">
                     <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">Global Dispatch</p>
                     <a href="mailto:mission@compass.community" className="font-mono text-sm text-white hover:text-brand-accent transition-colors">mission@compass.community</a>
                  </div>
                  <p className="font-mono text-[10px] text-brand-muted uppercase tracking-widest leading-loose max-w-[200px]">
                     Empowering technically-vetted builders worldwide.
                  </p>
               </div>

               <div className="pt-16 space-y-8">
                  <button onClick={() => navigate('/onboarding')} className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-brand-accent transition-colors flex items-center gap-3">
                     Get Started <ArrowRight className="w-3 h-3" />
                  </button>
                  
                  <div className="flex">
                    <button className="bg-white text-black px-8 py-5 font-mono text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all active:scale-95">
                       Schedule Intel Session
                    </button>
                    <div className="bg-white border-l border-black/10 text-black px-5 flex items-center justify-center hover:bg-brand-accent transition-all cursor-pointer">
                       <Plus className="w-5 h-5" />
                    </div>
                  </div>
               </div>
            </div>

            <div className="mt-24">
               <p className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.4em] italic">
                  Let the <span className="text-white not-italic">Hub</span> handle it.
               </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-brand-border py-8 group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="w-full flex justify-between items-start gap-8">
        <TextGlitch text={question} hoverText="REVEAL INTEL" className="font-mono !text-xs sm:!text-sm font-black uppercase tracking-[0.2em] w-full text-white" />
        <div className={`w-6 h-6 flex items-center justify-center border border-brand-border transition-all mt-1 shrink-0 ${isOpen ? 'bg-brand-accent border-brand-accent text-black rotate-45' : 'bg-transparent text-brand-muted rotate-0'}`}>
           <span className="font-mono text-lg leading-none">+</span>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="font-mono text-xs text-brand-muted mt-6 uppercase tracking-widest leading-relaxed max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
