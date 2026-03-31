import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit before completing
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-bg text-brand-text">
      <div className="font-sans font-black text-6xl uppercase tracking-tighter mb-4">
        Loading<span className="text-brand-accent">.</span>
      </div>
      <div className="w-64 h-1 bg-brand-border overflow-hidden">
        <div 
          className="h-full bg-brand-accent transition-all duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="font-mono text-xs text-brand-muted mt-4">
        {Math.min(progress, 100)}%
      </div>
    </div>
  );
}
