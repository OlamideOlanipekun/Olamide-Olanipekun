import React from 'react';
import founderImage from '../assets/founder.png';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="max-w-5xl animate-fade-up">
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-10">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Established 2024</span>
          </div>
          <h1 className="text-[15vw] sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none text-zinc-900 mb-12">
            CORE<span className="text-zinc-300">.</span><br />
            LOGIC<span className="text-zinc-300">.</span><br />
            VISION<span className="text-zinc-300">.</span>
          </h1>
          <p className="text-xl sm:text-3xl text-zinc-500 leading-tight max-w-3xl font-medium">
            Midtech Solutions is a high-performance digital studio architecting the future of web ecosystems.
          </p>
        </div>
      </section>

      {/* The Founder Section */}
      <section className="bg-zinc-50 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-100/50 -skew-x-12 translate-x-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-up">
              <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em] mb-8">The Founder</h2>
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 leading-[0.9]">
                  Olamide <br />
                  Olanipekun<span className="text-zinc-300">.</span>
                </h3>
              </div>
              <div className="space-y-6 text-zinc-600 text-lg leading-relaxed">
                <p>
                  As an Information Technology scholar at the National Open University of Nigeria, Olamide bridges the gap between academic computer science and commercial engineering.
                </p>
                <p>
                  With a focus on full-stack architecture and AI integration, he founded Midtech Solutions to provide a high-stakes alternative to generic digital agencies. His work is defined by precision, scalability, and a commitment to clean, maintainable code.
                </p>
              </div>
            </div>
            <div className="relative animate-fade-up [animation-delay:200ms]">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-200 shadow-3xl relative group border-8 border-white">
                <img
                  src={founderImage}
                  alt="Olamide Olanipekun - Founder"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-60"></div>

                {/* Visual Label */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Technical Director</span>
                  </div>
                </div>
              </div>

              {/* Floating Stat */}
              <div className="absolute -bottom-10 -left-10 p-10 bg-white border border-zinc-200 rounded-[2.5rem] shadow-3xl hidden md:block group">
                <div className="text-4xl font-black text-indigo-600 mb-1 tracking-tighter group-hover:scale-110 transition-transform">B.Sc.</div>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Info Tech (In View)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Our DNA</h2>
            <p className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900">Engineering with Intent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Technical Rigor', desc: 'No shortcuts. We prioritize strict typing, modular architecture, and comprehensive documentation in every build.' },
              { title: 'AI Integration', desc: 'We treat AI as a core component, not an afterthought, building native LLM integration layers into modern software.' },
              { title: 'Strategic Scaling', desc: 'Every solution is architected to handle the next 10x growth phase of your business, ensuring technical longevity.' }
            ].map((value, idx) => (
              <div key={idx} className="p-10 border border-zinc-200 rounded-[3rem] hover:border-indigo-600/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-xl mb-10 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  {idx === 0 ? '⚡' : idx === 1 ? '🤖' : '📈'}
                </div>
                <h4 className="text-2xl font-black text-zinc-900 mb-4 tracking-tighter">{value.title}</h4>
                <p className="text-zinc-500 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="p-16 md:p-24 bg-zinc-900 rounded-[4rem] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter">Ready to architect?</h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-6 px-14 py-6 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl"
          >
            Start Project Brief
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;