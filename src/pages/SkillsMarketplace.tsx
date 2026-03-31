import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, User, ArrowUpRight, ArrowLeft, Star, Search, Check, ShieldAlert } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const gigs = [
  { id: 1, title: 'Smart Contract Auditor Needed', budget: '$2,000 - $5,000', type: 'Contract', skills: ['Solidity', 'Security', 'Auditing'], postedBy: 'DeFi Protocol X' },
  { id: 2, title: 'Frontend Dev for NFT Marketplace', budget: '$3,000/mo', type: 'Full-time', skills: ['React', 'Web3.js', 'Tailwind'], postedBy: 'ArtChain' },
  { id: 3, title: 'Technical Writer (DeFi)', budget: '$500/article', type: 'Freelance', skills: ['Writing', 'DeFi', 'Research'], postedBy: 'YieldAggregator' },
];

const sellers = [
  { id: 1, name: 'David O.', role: 'Senior Solidity Developer', rating: 4.9, reviews: 24, rate: '$80/hr', skills: ['Solidity', 'Hardhat', 'Ethers.js'], isVerified: true },
  { id: 2, name: 'Amara K.', role: 'Web3 UI/UX Designer', rating: 5.0, reviews: 18, rate: '$60/hr', skills: ['Figma', 'Prototyping', 'User Research'], isVerified: true },
];

export default function SkillsMarketplace() {
  const [activeTab, setActiveTab] = useState<'gigs' | 'talent'>('gigs');
  const [gigsList, setGigsList] = useState<any[]>([]);
  const [sellersList, setSellersList] = useState<any[]>([]);

  useEffect(() => {
    const syncMarket = () => {
      const mockGigs = [
        { id: 1, title: 'Smart Contract Auditor Needed', budget: '$2,000 - $5,000', type: 'Contract', skills: ['Solidity', 'Security', 'Auditing'], postedBy: 'DeFi Protocol X' },
        { id: 2, title: 'Frontend Dev for NFT Marketplace', budget: '$3,000/mo', type: 'Full-time', skills: ['React', 'Web3.js', 'Tailwind'], postedBy: 'ArtChain' },
        { id: 3, title: 'Technical Writer (DeFi)', budget: '$500/article', type: 'Freelance', skills: ['Writing', 'DeFi', 'Research'], postedBy: 'YieldAggregator' },
      ];
      const mockSellers = [
        { id: 1, name: 'David O.', role: 'Senior Solidity Developer', rating: 4.9, reviews: 24, rate: '$80/hr', skills: ['Solidity', 'Hardhat', 'Ethers.js'], isVerified: true },
        { id: 2, name: 'Amara K.', role: 'Web3 UI/UX Designer', rating: 5.0, reviews: 18, rate: '$60/hr', skills: ['Figma', 'Prototyping', 'User Research'], isVerified: true },
      ];

      const liveGigs = JSON.parse(localStorage.getItem('compass_global_gigs') || '[]');
      const liveSellers = JSON.parse(localStorage.getItem('compass_global_sellers') || '[]');

      setGigsList([...liveGigs, ...mockGigs]);
      setSellersList([...liveSellers, ...mockSellers]);
    };

    syncMarket();
    window.addEventListener('storage', syncMarket);
    return () => window.removeEventListener('storage', syncMarket);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                Skills <br /> <span className="text-brand-accent">Marketplace</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Connect with top Web3 talent or find your next high-paying gig.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/skill-marketplace/new-gig" className="bg-brand-surface text-brand-text border border-brand-border px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:border-brand-accent transition-colors flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4" /> Post a Gig
              </Link>
              <Link to="/skill-marketplace/become-seller" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors border border-transparent flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="flex gap-8 border-b border-brand-border mb-8">
          <button 
            onClick={() => setActiveTab('gigs')}
            className={`pb-4 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'gigs' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-brand-muted hover:text-brand-text'}`}
          >
            Find Work (Gigs)
          </button>
          <button 
            onClick={() => setActiveTab('talent')}
            className={`pb-4 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'talent' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-brand-muted hover:text-brand-text'}`}
          >
            Hire Talent
          </button>
        </div>

        {activeTab === 'gigs' ? (
          <div className="flex flex-col gap-6">
            {gigsList.map((gig, index) => (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border border-brand-border bg-brand-surface p-6 sm:p-8 hover:border-brand-accent transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-brand-bg text-brand-text border border-brand-border px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                      {gig.type}
                    </span>
                    <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                      {gig.postedBy}
                    </span>
                  </div>
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4">
                    {gig.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {gig.skills.map(skill => (
                      <span key={skill} className="bg-brand-bg text-brand-muted px-2 py-1 font-mono text-xs border border-brand-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-4 shrink-0">
                  <span className="font-mono text-lg font-bold text-brand-accent">
                    {gig.budget}
                  </span>
                  <button className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors">
                    Apply Now <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sellersList.filter(s => s.isVerified).map((seller, index) => (
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border border-brand-border bg-brand-surface p-6 sm:p-8 hover:border-brand-accent transition-colors duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-1 flex items-center gap-2">
                      {seller.name}
                      {seller.isVerified && (
                        <span className="bg-brand-accent text-black px-1.5 py-0.5 text-[10px] tracking-widest uppercase font-mono flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </h3>
                    <p className="font-mono text-sm text-brand-muted">{seller.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-lg font-bold text-brand-accent block">{seller.rate}</span>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-mono text-xs">{seller.rating} ({seller.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {seller.skills.map(skill => (
                    <span key={skill} className="bg-brand-bg text-brand-muted px-2 py-1 font-mono text-xs border border-brand-border">
                      {skill}
                    </span>
                  ))}
                </div>
                <Link to={`/skill-marketplace/profile/${seller.id}`} className="mt-auto flex items-center justify-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-text border border-brand-border py-4 hover:bg-brand-bg transition-colors w-full">
                  View Profile <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PostGig() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const gig = {
      id: Date.now(),
      title: formData.get('title'),
      budget: formData.get('budget'),
      type: formData.get('type'),
      skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
      description: formData.get('description'),
      status: 'PENDING',
      postedBy: 'Builder ' + Math.floor(Math.random() * 1000), // In real app from auth
      appliedAt: new Date().toISOString()
    };

    const apps = JSON.parse(localStorage.getItem('compass_gig_applications') || '[]');
    localStorage.setItem('compass_gig_applications', JSON.stringify([...apps, gig]));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-3xl mx-auto">
      <Link to="/skill-marketplace" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12">
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-4">
          Post a Gig
        </h1>
        <p className="font-mono text-sm text-brand-muted mb-12">
          Find the perfect Web3 talent for your project.
        </p>

        {submitted ? (
          <div className="bg-brand-bg border border-brand-border p-8 text-center">
            <Check className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-2">Gig Submitted</h3>
            <p className="font-mono text-sm text-brand-muted mb-6">Your gig has been submitted for admin review. You will be notified once published to the marketplace.</p>
            <button onClick={() => navigate('/skill-marketplace')} className="bg-brand-surface text-brand-text border border-brand-border px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:border-brand-accent transition-colors">
              Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Gig Title</label>
              <input required name="title" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Smart Contract Auditor Needed" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Budget</label>
                <input required name="budget" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. $2,000 - $5,000" />
              </div>
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Job Type</label>
                <select required name="type" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text">
                  <option value="Contract">Contract</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Required Skills (comma separated)</label>
              <input required name="skills" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Solidity, React, Security" />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Description</label>
              <textarea required name="description" rows={5} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text resize-none" placeholder="Describe the project and requirements..." />
            </div>
            <button type="submit" className="w-full bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Post Gig
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function BecomeSeller() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const application = {
      id: Date.now(),
      name: 'Builder ' + Math.floor(Math.random() * 1000), // In real app, get from auth
      role: formData.get('role'),
      rate: formData.get('rate'),
      exp: formData.get('exp'),
      skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
      bio: formData.get('bio'),
      portfolio: formData.get('portfolio'),
      status: 'PENDING',
      appliedAt: new Date().toISOString()
    };

    const apps = JSON.parse(localStorage.getItem('compass_seller_applications') || '[]');
    localStorage.setItem('compass_seller_applications', JSON.stringify([...apps, application]));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-3xl mx-auto">
      <Link to="/skill-marketplace" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12">
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-4">
          Become a Seller
        </h1>
        <p className="font-mono text-sm text-brand-muted mb-8">
          Create your profile and start offering your Web3 services to the community.
        </p>

        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 mb-12 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
          <div>
            <h4 className="font-mono text-sm font-bold text-yellow-500 uppercase tracking-widest mb-1">Admin Verification Required</h4>
            <p className="font-mono text-xs text-brand-muted leading-relaxed">
              To maintain the quality of our marketplace, all seller profiles must be reviewed and verified by an admin before they appear publicly.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-brand-bg border border-brand-border p-8 text-center">
            <Check className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-2">Application Submitted</h3>
            <p className="font-mono text-sm text-brand-muted mb-6">Your profile is currently under review by our admin team. You will be notified once verified.</p>
            <button onClick={() => navigate('/skill-marketplace')} className="bg-brand-surface text-brand-text border border-brand-border px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:border-brand-accent transition-colors">
              Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Full Name / Alias</label>
              <input required name="name" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. David O." />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Professional Title</label>
              <input required name="role" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Senior Solidity Developer" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Hourly Rate</label>
                <input required name="rate" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. $80/hr" />
              </div>
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Years of Experience</label>
                <input required name="exp" type="number" min="0" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. 3" />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Top Skills (comma separated)</label>
              <input required name="skills" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Solidity, Hardhat, Ethers.js" />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Bio / About Me</label>
              <textarea required name="bio" rows={5} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text resize-none" placeholder="Tell clients about your experience and what you can build..." />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Portfolio Link</label>
              <input required name="portfolio" type="url" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="https://github.com/yourusername" />
            </div>
            <button type="submit" className="w-full bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Submit for Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function SellerProfile() {
  const { id } = useParams();
  const sellers = [
    { id: 1, name: 'David O.', role: 'Senior Solidity Developer', rating: 4.9, reviews: 24, rate: '$80/hr', skills: ['Solidity', 'Hardhat', 'Ethers.js'], isVerified: true },
    { id: 2, name: 'Amara K.', role: 'Web3 UI/UX Designer', rating: 5.0, reviews: 18, rate: '$60/hr', skills: ['Figma', 'Prototyping', 'User Research'], isVerified: true },
  ];
  const liveSellers = JSON.parse(localStorage.getItem('compass_global_sellers') || '[]');
  const allSellers = [...liveSellers, ...sellers];
  const seller = allSellers.find(s => s.id === Number(id)) || allSellers[0];

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
      <Link to="/skill-marketplace" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <User className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 border-b border-brand-border pb-8">
            <div>
              <h1 className="font-sans font-black text-5xl sm:text-6xl uppercase tracking-tighter mb-4 flex items-center gap-4">
                {seller.name}
                {seller.isVerified && (
                  <span className="bg-brand-accent text-black px-2 py-1 text-xs tracking-widest uppercase font-mono flex items-center gap-1">
                    <Check className="w-4 h-4" /> Verified
                  </span>
                )}
              </h1>
              <p className="font-mono text-xl text-brand-muted">{seller.role}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="font-mono text-3xl font-bold text-brand-accent">{seller.rate}</span>
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-1 border border-yellow-500/20">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-mono text-sm font-bold">{seller.rating} ({seller.reviews} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">About</h3>
            <p className="font-mono text-lg leading-relaxed text-brand-muted">
              I am a highly experienced Web3 professional specializing in building secure and scalable decentralized applications. With a strong background in smart contract development and auditing, I have helped multiple DeFi protocols launch safely on mainnet.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Skills</h3>
            <div className="flex flex-wrap gap-4">
              {seller.skills.map(skill => (
                <span key={skill} className="bg-brand-bg text-brand-text px-4 py-2 font-mono text-sm border border-brand-border">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <button className="w-full bg-brand-accent text-black px-8 py-6 font-mono text-lg font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3">
            Hire {seller.name.split(' ')[0]} <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
