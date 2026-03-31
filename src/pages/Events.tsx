import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowUpRight, ArrowLeft, Check } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const events = [
  { id: 1, title: 'Web3 Lagos Conference', date: 'April 15-17, 2026', location: 'Lagos, Nigeria', type: 'In-Person', description: 'The largest Web3 conference in West Africa, bringing together developers, founders, and investors to discuss the future of decentralized technologies on the continent. Features keynote speakers, workshops, and a massive hackathon.', speakers: ['Sarah Chen', 'Marcus Johnson'], capacity: 500, registered: 342 },
  { id: 2, title: 'DeFi Builders Hackathon', date: 'May 01-03, 2026', location: 'Online', type: 'Virtual', description: 'A 48-hour virtual hackathon focused on building the next generation of decentralized finance protocols. $50k in prizes available.', speakers: ['Elena Rodriguez'], capacity: 1000, registered: 890 },
  { id: 3, title: 'African Crypto Summit', date: 'June 10, 2026', location: 'Nairobi, Kenya', type: 'Hybrid', description: 'Exploring the regulatory landscape and adoption metrics of cryptocurrency across African nations.', speakers: ['David O.', 'Amara K.'], capacity: 300, registered: 150 },
];

export default function Events() {
  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                Web3 <br /> <span className="text-brand-accent">Events</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Discover and register for the biggest Web3 events across Africa and globally.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/events/new" className="bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors border border-transparent flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Submit Event
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border border-brand-border bg-brand-surface p-6 sm:p-8 hover:border-brand-accent transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-6">
                <div className="hidden sm:flex flex-col items-center justify-center w-24 h-24 bg-brand-bg border border-brand-border text-brand-accent shrink-0">
                  <span className="font-sans font-black text-2xl">{event.date.split(' ')[1].split('-')[0].replace(',','')}</span>
                  <span className="font-mono text-xs uppercase tracking-widest">{event.date.split(' ')[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-brand-bg text-brand-text border border-brand-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tighter mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-muted">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-4">
                <Link to={`/events/${event.id}`} className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-text hover:text-brand-accent transition-colors">
                  Register <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EventDetail() {
  const { id } = useParams();
  const event = events.find(e => e.id === Number(id)) || events[0];
  const [registered, setRegistered] = useState(false);

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
      <Link to="/events" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Calendar className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <div className="flex gap-4 mb-6">
            <span className="bg-brand-bg text-brand-accent border border-brand-accent/20 px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {event.type}
            </span>
            <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
              {event.date}
            </span>
          </div>

          <h1 className="font-sans font-black text-5xl sm:text-6xl uppercase tracking-tighter mb-6">
            {event.title}
          </h1>

          <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-brand-muted mb-12">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="font-mono text-lg leading-relaxed text-brand-muted">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12 border-y border-brand-border py-8">
            <div>
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Capacity</p>
              <p className="font-sans font-black text-3xl">{event.registered} / {event.capacity}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Speakers</p>
              <p className="font-sans font-bold text-xl">{event.speakers.join(', ')}</p>
            </div>
          </div>

          <button 
            onClick={() => setRegistered(true)}
            disabled={registered}
            className={`w-full py-6 font-mono text-lg font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3 ${registered ? 'bg-green-500 text-black' : 'bg-brand-accent text-black hover:bg-white'}`}
          >
            {registered ? (
              <><Check className="w-6 h-6" /> Registered Successfully</>
            ) : (
              'Register Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SubmitEvent() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/events');
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-24 pt-32 px-6 lg:px-12 max-w-3xl mx-auto">
      <Link to="/events" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <div className="border border-brand-border bg-brand-surface p-8 md:p-12">
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-4">
          Submit an Event
        </h1>
        <p className="font-mono text-sm text-brand-muted mb-12">
          Host a Web3 event? Add it to our community calendar. All submissions are reviewed by admins before publishing.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 p-8 text-center">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-sans font-black text-2xl text-green-500 uppercase tracking-tighter mb-2">Event Submitted</h3>
            <p className="font-mono text-sm text-brand-muted">Redirecting to events page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Event Title</label>
              <input required type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Web3 Lagos Conference" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Date</label>
                <input required type="date" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" />
              </div>
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Event Type</label>
                <select required className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text">
                  <option value="In-Person">In-Person</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Location (or Link if Virtual)</label>
              <input required type="text" className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text" placeholder="e.g. Lagos, Nigeria" />
            </div>
            <div>
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2 block">Description</label>
              <textarea required rows={5} className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-sm focus:border-brand-accent outline-none text-brand-text resize-none" placeholder="What is this event about?" />
            </div>
            <button type="submit" className="w-full bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Submit for Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
