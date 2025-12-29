import React from 'react';
import Projects from '../components/Projects.tsx';

const WorkPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-4xl animate-fade-up">
          <h1 className="text-[15vw] sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none text-zinc-900 mb-8">
            WORK<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-500 leading-relaxed max-w-2xl font-medium">
            A curation of high-performance digital solutions, ranging from financial ecosystems to AI-native interfaces. 
            Each project is a testament to technical precision and strategic design.
          </p>
        </div>
      </div>

      <Projects />

      <div className="max-w-7xl mx-auto px-6 mt-32 border-t border-zinc-100 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Our Standard</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              We don't just build websites. We architect digital assets that scale, perform, and convert. Every line of code is intentional.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Technologies</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Leveraging the most modern stacks including React, Next.js, Node.js, and advanced AI model integrations to ensure longevity.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Availability</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Midtech Solutions accepts a limited number of high-impact projects each quarter to ensure the founder's direct oversight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;