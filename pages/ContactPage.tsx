import React from 'react';
import Contact from '../components/Contact.tsx';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-zinc-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-4xl animate-fade-up">
          <h1 className="text-[12vw] sm:text-7xl md:text-9xl font-black tracking-tighter leading-none text-zinc-900 mb-10">
            CONNECT<span className="text-zinc-300">.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-500 leading-relaxed max-w-2xl">
            Ready to scale your digital presence? We bridge the gap between complex requirements and elegant technical execution.
          </p>
        </div>
      </div>

      <Contact />

      {/* The Process Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">The Partnership</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900">Our Process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discovery', desc: 'Detailed analysis of your technical goals and market position.' },
            { step: '02', title: 'Architecture', desc: 'Mapping out the stack and user-flow for maximum performance.' },
            { step: '03', title: 'Execution', desc: 'Founder-led development with consistent milestones and updates.' },
            { step: '04', title: 'Evolution', desc: 'Deployment, optimization, and scaling as your business grows.' },
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-white border border-zinc-200 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl font-black text-indigo-600/20 mb-6">{item.step}</div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <div className="max-w-7xl mx-auto px-6 mt-32 mb-10">
        <div className="p-12 md:p-20 bg-zinc-900 rounded-[3.5rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <p className="text-2xl md:text-4xl font-medium text-white tracking-tight leading-relaxed mb-10 italic">
              "We don't build for the present, we architect for the future of your company's digital life."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-black text-white">OO</div>
              <div className="text-left">
                <div className="text-white font-bold text-sm">Olamide Olanipekun</div>
                <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Founder, Midtech Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;