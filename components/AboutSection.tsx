import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const FALLBACK_FOUNDER_IMAGE = '/assets/founder.jpg';

const AboutSection: React.FC = () => {
  const [founderImage, setFounderImage] = useState<string>(FALLBACK_FOUNDER_IMAGE);

  useEffect(() => {
    const fetchFounderImage = async () => {
      try {
        const { data: files } = await supabase.storage.from('assets').list('', { search: 'founder' });
        if (files && files.length > 0) {
          const founderFile = files.find(f => f.name.startsWith('founder.'));
          if (founderFile) {
            const { data } = supabase.storage.from('assets').getPublicUrl(founderFile.name);
            if (data?.publicUrl) {
              setFounderImage(data.publicUrl + '?t=' + Date.now());
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch founder image', error);
      }
    };
    fetchFounderImage();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 animate-fade-up">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-indigo-600"></span>
              <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em]">The Manifesto</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] text-zinc-900 mb-8">
              Precision <br />
              Beyond <br />
              <span className="text-zinc-300">The Code.</span>
            </h2>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 max-w-fit">
              <img
                src={founderImage}
                alt="Olamide Olanipekun"
                className="w-10 h-10 rounded-xl object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest leading-tight">Olamide Olanipekun</span>
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Founder & Technical Director</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10 animate-fade-up [animation-delay:200ms]">
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mb-8">
              I am a results-driven Website Developer and emerging AI professional with strong experience building responsive, scalable, and user-centric web applications. I specialize in translating business requirements into clean, maintainable code that delivers measurable value.
            </p>
            <p className="text-base text-zinc-500 leading-relaxed max-w-2xl mb-8">
              My expertise spans front-end and back-end development using modern technologies such as <strong className="text-zinc-900">HTML, CSS, JavaScript, React, PHP, and Node.js</strong>, alongside database-driven systems with MySQL. Integrated with a strong focus on <strong className="text-zinc-900">AI adoption</strong>, I design intelligent features and automate workflows to enhance user experience and business efficiency.
            </p>
            <div className="pt-6">
              <Link
                to="/about"
                className="group inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900 hover:text-indigo-600 transition-colors"
              >
                Read our story
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;