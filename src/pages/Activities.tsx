import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowUpRight, ArrowLeft, PenTool, Check } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const getMergedBlogs = () => {
  const mockPosts = [
    { id: 1, title: 'The Evolution of Web3 Identity', author: 'Compass Editorial', date: 'Mar 15, 2026', readTime: '5 min read', content: 'Web3 identity is moving beyond simple wallet addresses...' },
    { id: 2, title: 'Why African Devs are Building on L2s', author: 'Community Voice', date: 'Mar 10, 2026', readTime: '8 min read', content: 'Layer 2 scaling solutions are seeing adoption...' },
    { id: 3, title: 'Understanding Zero-Knowledge Proofs', author: 'Tech Team', date: 'Mar 05, 2026', readTime: '12 min read', content: 'Zero-knowledge proofs (ZKPs) are a cryptographic breakthrough...' },
  ];
  const livePosts = JSON.parse(localStorage.getItem('compass_global_blogs') || '[]');
  return [...livePosts, ...mockPosts];
};

export default function Activities() {
  const hasPostPermission = true;
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const syncBlogs = () => {
      setPosts(getMergedBlogs());
    };
    syncBlogs();
    window.addEventListener('storage', syncBlogs);
    return () => window.removeEventListener('storage', syncBlogs);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                <span className="text-brand-accent">Activities</span> <br /> & Blog
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Insights, recognition, and storytelling in Web3.
              </p>
            </div>
            {hasPostPermission && (
              <div className="flex gap-4">
                <Link to="/activities/new" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors border border-transparent flex items-center gap-2">
                  <PenTool className="w-4 h-4" /> Create Post
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-b border-brand-border pb-8 hover:border-brand-accent transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-brand-muted">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-brand-border rounded-full" />
                  <span>{post.readTime}</span>
                </div>
                <span className="bg-brand-surface text-brand-text px-3 py-1 font-mono text-xs uppercase tracking-widest self-start md:self-auto">
                  {post.author}
                </span>
              </div>
              <h3 className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tighter mb-6 group-hover:text-brand-accent transition-colors">
                {post.title}
              </h3>
              <Link to={`/activities/${post.id}`} className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-text group-hover:text-brand-accent transition-colors">
                Read Full Article <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogDetail() {
  const { id } = useParams();
  const allPosts = getMergedBlogs();
  const post = allPosts.find(p => p.id === Number(id)) || allPosts[0];

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
      <Link to="/activities" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article className="border border-brand-border bg-brand-surface p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex gap-4 mb-6">
            <span className="bg-brand-bg text-brand-accent border border-brand-accent/20 px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {post.author}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {post.date}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {post.readTime}
            </span>
          </div>

          <h1 className="font-sans font-black text-5xl sm:text-6xl uppercase tracking-tighter mb-12 border-b border-brand-border pb-12">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="font-mono text-xl leading-relaxed text-brand-text mb-8 border-l-4 border-brand-accent pl-6">
              {post.content}
            </p>
            {post.id === 1 && (
              <>
                <h3 className="font-sans font-black text-3xl uppercase tracking-tighter mt-12 mb-6 text-brand-text">The Problem with Current Systems</h3>
                <p className="font-mono text-lg leading-relaxed text-brand-muted mb-6">
                  Currently, your identity is fragmented across dozens of centralized platforms. You don't own your data, and you can be de-platformed at any time. In Web3, your wallet address acts as a primitive identifier, but it lacks nuance. It doesn't tell a story about who you are, what you've built, or what communities you belong to.
                </p>
                <h3 className="font-sans font-black text-3xl uppercase tracking-tighter mt-12 mb-6 text-brand-text">Enter Verifiable Credentials</h3>
                <p className="font-mono text-lg leading-relaxed text-brand-muted mb-6">
                  Verifiable Credentials (VCs) are digital proofs of your qualifications, achievements, or memberships. They are cryptographically signed by the issuer and can be verified by anyone without relying on a central database. This means you can prove you attended a specific hackathon, completed a course, or contributed to a protocol, all while maintaining privacy.
                </p>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export function CreateBlog() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Mock permission check - in a real app, redirect if not authorized
  const hasPostPermission = true;

  if (!hasPostPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-sans font-black text-4xl uppercase tracking-tighter mb-4 text-red-500">Access Denied</h1>
          <p className="font-mono text-brand-muted">You do not have permission to create blog posts.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const post = {
      id: Date.now(),
      title: formData.get('title'),
      author: formData.get('author'),
      content: formData.get('content'),
      status: 'PENDING',
      postedAt: new Date().toISOString()
    };

    const drafts = JSON.parse(localStorage.getItem('compass_user_blogs') || '[]');
    localStorage.setItem('compass_user_blogs', JSON.stringify([...drafts, post]));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
      <Link to="/activities" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12">
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-4">
          Create New Post
        </h1>
        <p className="font-mono text-sm text-brand-muted mb-12">
          Share your insights, tutorials, or community updates.
        </p>

        {submitted ? (
          <div className="bg-brand-bg border border-brand-border p-8 text-center">
            <Check className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-2">Post Submitted</h3>
            <p className="font-mono text-sm text-brand-muted mb-6">Your article has been submitted to the editorial team for review. You will be notified once published.</p>
            <button onClick={() => navigate('/activities')} className="bg-brand-surface text-brand-text border border-brand-border px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:border-brand-accent transition-colors">
              Return to Blog
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Post Title</label>
              <input required name="title" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="Enter a catchy title..." />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Author Name / Alias</label>
              <input required name="author" type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Compass Editorial" />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Content (Markdown supported)</label>
              <textarea required name="content" rows={15} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text resize-y font-mono" placeholder="Write your post content here..." />
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => navigate('/activities')} className="bg-brand-bg text-brand-text border border-brand-border px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:border-brand-accent transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Publish Post
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
