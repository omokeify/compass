import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowUpRight, PlayCircle, Check, X, Clock, BookOpen, Users } from 'lucide-react';

const courses = [
  { 
    id: 1, 
    title: 'Intro to Smart Contracts', 
    level: 'Beginner', 
    duration: '4 Weeks', 
    type: 'Live',
    description: 'Learn the fundamentals of writing, testing, and deploying smart contracts on Ethereum using Solidity. This course covers everything from basic syntax to common security pitfalls.',
    modules: ['Ethereum Basics', 'Solidity Fundamentals', 'Smart Contract Security', 'Deployment & Testing'],
    instructor: 'David O.',
    students: 1240
  },
  { 
    id: 2, 
    title: 'Advanced DeFi Mechanisms', 
    level: 'Advanced', 
    duration: '6 Weeks', 
    type: 'Recorded',
    description: 'Dive deep into the mechanics of decentralized finance. Understand how AMMs, lending protocols, and yield aggregators work under the hood.',
    modules: ['AMM Deep Dive', 'Lending & Borrowing Math', 'Flash Loans', 'Protocol Architecture'],
    instructor: 'Sarah Chen',
    students: 850
  },
  { 
    id: 3, 
    title: 'Web3 Community Management', 
    level: 'Intermediate', 
    duration: '3 Weeks', 
    type: 'Live',
    description: 'Master the art of building and scaling engaged communities in Web3. Learn tokenomics, governance, and effective communication strategies.',
    modules: ['Community Building 101', 'Tokenomics & Incentives', 'DAO Governance', 'Crisis Management'],
    instructor: 'Amara K.',
    students: 2100
  },
];

export default function TrainingProgram() {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  const handleEnroll = (id: number) => {
    if (!enrolledCourses.includes(id)) {
      setEnrolledCourses([...enrolledCourses, id]);
      setSelectedCourse(null); // Close modal after enrolling
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="border-b border-brand-border pt-32 pb-16 px-6 lg:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-3xl">
              <h1 className="font-sans font-black text-5xl sm:text-7xl tracking-tighter uppercase mb-6">
                Training <br /> <span className="text-brand-accent">Program</span>
              </h1>
              <p className="font-mono text-lg sm:text-xl text-brand-muted w-full leading-relaxed">
                Educational courses & certification. Upskill yourself for the decentralized future.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 lg:px-12 mt-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group border ${isEnrolled ? 'border-brand-accent' : 'border-brand-border hover:border-brand-accent'} bg-brand-surface p-8 transition-colors duration-300 flex flex-col cursor-pointer`}
                onClick={() => !isEnrolled && setSelectedCourse(course)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 bg-brand-bg border ${isEnrolled ? 'border-brand-accent text-brand-accent' : 'border-brand-border text-brand-muted'} flex items-center justify-center`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest">
                    {course.type}
                  </span>
                </div>
                <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-4">
                  {course.title}
                </h3>
                <div className="flex gap-4 font-mono text-xs uppercase tracking-widest text-brand-muted mb-8">
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(isEnrolled) return;
                    setSelectedCourse(course);
                  }}
                  disabled={isEnrolled}
                  className={`mt-auto w-full flex items-center justify-between border-t border-brand-border pt-4 font-mono text-sm font-bold uppercase tracking-widest transition-colors ${isEnrolled ? 'text-brand-accent' : 'text-brand-text group-hover:text-brand-accent'}`}
                >
                  {isEnrolled ? (
                    <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Enrolled</span>
                  ) : (
                    <>
                      View Details
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-surface border border-brand-border w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-brand-surface border-b border-brand-border p-6 flex justify-between items-center z-10">
              <h2 className="font-sans font-black text-2xl uppercase tracking-tighter">Course Details</h2>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="p-2 hover:bg-brand-bg transition-colors text-brand-muted hover:text-brand-text"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <PlayCircle className="w-3 h-3" /> {selectedCourse.type}
                </span>
                <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {selectedCourse.duration}
                </span>
                <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-3 h-3" /> {selectedCourse.level}
                </span>
                <span className="bg-brand-bg text-brand-text border border-brand-border px-3 py-1 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-3 h-3" /> {selectedCourse.students} Enrolled
                </span>
              </div>

              <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-6">
                {selectedCourse.title}
              </h1>

              <div className="mb-8">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-brand-muted mb-4">About This Course</h3>
                <p className="font-mono text-base leading-relaxed text-brand-text">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="mb-12">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-brand-muted mb-4">Course Modules</h3>
                <ul className="space-y-3">
                  {selectedCourse.modules.map((module, idx) => (
                    <li key={idx} className="flex items-center gap-4 border border-brand-border bg-brand-bg p-4">
                      <span className="font-sans font-black text-xl text-brand-accent w-8">{idx + 1}.</span>
                      <span className="font-mono text-sm">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-brand-border pt-8">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 bg-brand-bg border border-brand-border flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-muted" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">Instructor</p>
                    <p className="font-sans font-bold text-lg">{selectedCourse.instructor}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleEnroll(selectedCourse.id)}
                  className="w-full sm:w-auto bg-brand-accent text-black px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Confirm Enrollment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
