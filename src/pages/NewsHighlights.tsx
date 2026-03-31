import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, ArrowUpRight, ArrowLeft, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const newsItems = [
  { id: 1, title: 'Ethereum Dencun Upgrade Goes Live', category: 'Protocol', date: 'Mar 13, 2026', readTime: '4 min read', content: 'The highly anticipated Dencun upgrade has successfully activated on the Ethereum mainnet, introducing proto-danksharding (EIP-4844) to significantly reduce Layer 2 transaction fees.' },
  { id: 2, title: 'New African Web3 Fund Announces $50M Target', category: 'Funding', date: 'Mar 12, 2026', readTime: '3 min read', content: 'A new venture capital fund focused exclusively on African Web3 startups has announced a $50 million target for its inaugural fund, signaling strong institutional interest in the continent.' },
  { id: 3, title: 'Major Protocol Integrates Account Abstraction', category: 'Adoption', date: 'Mar 10, 2026', readTime: '5 min read', content: 'One of the leading DeFi protocols has fully integrated ERC-4337 account abstraction, allowing users to pay gas fees in stablecoins and recover lost accounts via social recovery.' },
];

export default function NewsHighlights() {
  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                News <br /> <span className="text-brand-accent">Highlights</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Curated Web3 news, protocol updates, and ecosystem developments.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border border-brand-border bg-brand-surface p-6 sm:p-8 hover:border-brand-accent transition-colors duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                  {item.category}
                </span>
                <div className="w-10 h-10 bg-brand-bg border border-brand-border flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-colors">
                  <Newspaper className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4 group-hover:text-brand-accent transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-brand-muted mt-auto pt-6 border-t border-brand-border">
                <span>{item.date}</span>
                <span className="w-1 h-1 bg-brand-border rounded-full" />
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.readTime}</span>
              </div>
              <Link to={`/news-highlights/${item.id}`} className="mt-6 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors">
                Read Full Story <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewsDetail() {
  const { id } = useParams();
  const article = newsItems.find(n => n.id === Number(id)) || newsItems[0];

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
      <Link to="/news-highlights" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to News
      </Link>

      <article className="border border-brand-border bg-brand-surface p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Newspaper className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex gap-4 mb-6">
            <span className="bg-brand-bg text-brand-accent border border-brand-accent/20 px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {article.category}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {article.date}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-sans font-black text-5xl sm:text-6xl uppercase tracking-tighter mb-12 border-b border-brand-border pb-12">
            {article.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="font-mono text-xl leading-relaxed text-brand-text mb-8 border-l-4 border-brand-accent pl-6">
              {article.content}
            </p>
            <p className="font-mono text-lg leading-relaxed text-brand-muted mb-6">
              The successful deployment marks a significant milestone in the network's roadmap towards scalability. By introducing "blobs" of data that are temporarily stored on the consensus layer, Layer 2 rollups can now post transaction data at a fraction of the previous cost.
            </p>
            <p className="font-mono text-lg leading-relaxed text-brand-muted mb-6">
              "This is the most significant upgrade since The Merge," stated a core developer. "We are already seeing L2 fees drop by up to 90%, which opens up entirely new use cases for on-chain applications that were previously priced out by gas costs."
            </p>
            <h3 className="font-sans font-black text-3xl uppercase tracking-tighter mt-12 mb-6 text-brand-text">What this means for builders</h3>
            <p className="font-mono text-lg leading-relaxed text-brand-muted mb-6">
              Developers building on Arbitrum, Optimism, Base, and other rollups will immediately benefit from these reduced costs. Applications involving micro-transactions, gaming, and high-frequency trading are expected to see the most significant growth in the coming months.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
