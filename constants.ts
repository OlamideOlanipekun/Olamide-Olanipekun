import { Project, Skill, Experience } from './types';

export const SOCIAL_LINKS = {
  github: 'https://github.com/OlamideOlanipekun',
  linkedin: 'https://www.linkedin.com/in/olamide-olanipekun-855856378/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  twitter: 'https://twitter.com/olamide_dev',
  email: 'mailto:olamideolanipekun75@gmail.com',
  whatsapp: 'https://wa.me/2349129997137'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'WaveCrest Financial',
    description: 'Corporate investment platform established to build trust for potential investors.',
    longDescription: 'WaveCrest Financial is a high-stakes financial services portal featuring real-time market data visualization and a secure user dashboard. Built to handle complex financial queries with sub-second response times, the platform focuses on accessibility and data security. I led the development of the front-end architecture using React and integrated it with a robust PHP back-end for secure transaction logging.',
    tags: ['React', 'PHP', 'Bootstrap', 'MySQL'],
    category: 'Web',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    link: 'https://wavecrestfinancial.net/',
    github: 'https://github.com/OlamideOlanipekun/wavecrest-finance'
  },
  {
    id: '2',
    title: 'Quantum FTX Chain',
    description: 'A robust blockchain explorer and crypto-asset platform interface.',
    longDescription: 'Quantum FTX Chain serves as a window into the decentralized world. It features a custom-built blockchain explorer that tracks transactions in real-time across multiple testnets. The UI was crafted with Tailwind CSS to ensure a futuristic yet functional aesthetic. I implemented Web3.js integrations to allow users to connect their wallets and view their asset balances directly.',
    tags: ['TypeScript', 'Next.js', 'Web3.js', 'Tailwind'],
    category: 'Web',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    link: 'https://quantumftxchain.com/',
    github: 'https://github.com/OlamideOlanipekun/quantum-chain'
  },
  {
    id: '3',
    title: 'Rocket English',
    description: 'Interactive EdTech platform for multi-lingual language acquisition.',
    longDescription: 'Rocket English is an immersive learning environment designed for students learning English as a second language. It features an interactive classroom with real-time video streaming, progress tracking using Firebase, and gamified quizzes. My role focused on creating a seamless user experience that works across all mobile devices, ensuring students can learn on the go.',
    tags: ['React', 'Firebase', 'Framer Motion'],
    category: 'Web',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop',
    link: 'https://rocketenglish.ru/',
    github: 'https://github.com/OlamideOlanipekun/rocket-english'
  },
  {
    id: '4',
    title: 'AI Persona Assistant',
    description: 'Custom LLM-powered chatbot for personalized brand interactions.',
    longDescription: 'Leveraging the Gemini API, this AI assistant acts as a digital brand ambassador. It is capable of understanding complex user intent and providing contextually relevant answers about products and services. I developed a specialized prompt engineering layer that ensures the AI maintains a consistent brand voice while preventing hallucinations.',
    tags: ['Gemini API', 'Node.js', 'React'],
    category: 'AI',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    link: '#',
    github: 'https://github.com/OlamideOlanipekun/ai-assistant-core'
  },
  {
    id: '5',
    title: 'Nova Mobile Wallet',
    description: 'A sleek, minimal cryptocurrency wallet design for iOS and Android.',
    longDescription: 'Nova is a mobile-first crypto wallet focusing on simplicity and security. The project involved creating a design system that could be easily translated from Figma into React Native components. I focused on the "Send/Receive" flow to make it as intuitive as possible for non-technical users, incorporating biometric authentication and multi-sig support.',
    tags: ['Figma', 'React Native', 'UI/UX'],
    category: 'Mobile',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    link: '#',
    github: 'https://github.com/OlamideOlanipekun/nova-wallet'
  },
  {
    id: '6',
    title: 'Echo Branding System',
    description: 'A complete visual identity and design system for a tech startup.',
    longDescription: 'Echo is a comprehensive design system built for scalability. I developed a set of atomic UI components, a custom iconography set, and a documented brand guideline. This project helped the startup maintain a consistent visual presence across their marketing site, mobile app, and printed collateral, significantly reducing design-to-development handoff time.',
    tags: ['Design System', 'Branding', 'Adobe CC'],
    category: 'Design',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    link: '#',
    github: 'https://github.com/OlamideOlanipekun/echo-branding'
  }
];

export const SKILLS: Skill[] = [
  { 
    name: 'React / Next.js', 
    category: 'Frontend', 
    icon: '⚛️', 
    level: 92,
    tags: ['Server Components', 'Hooks', 'Vite', 'App Router']
  },
  { 
    name: 'TypeScript', 
    category: 'Frontend', 
    icon: '🔷', 
    level: 88,
    tags: ['Generic Types', 'Interface Design', 'Static Analysis']
  },
  { 
    name: 'PHP / MySQL', 
    category: 'Backend', 
    icon: '🐘', 
    level: 90,
    tags: ['Laravel', 'REST APIs', 'Query Optimization']
  },
  { 
    name: 'Node.js', 
    category: 'Backend', 
    icon: '🟢', 
    level: 85,
    tags: ['Express', 'Auth Systems', 'Microservices']
  },
  { 
    name: 'Tailwind / Bootstrap', 
    category: 'Frontend', 
    icon: '🎨', 
    level: 95,
    tags: ['Design Systems', 'Responsive UI', 'Custom Config']
  },
  { 
    name: 'AI Engineering', 
    category: 'Tools', 
    icon: '🤖', 
    level: 82,
    tags: ['Gemini API', 'Prompt Design', 'RAG Patterns']
  },
  { 
    name: 'Git / CI/CD', 
    category: 'Tools', 
    icon: '🌿', 
    level: 90,
    tags: ['Workflow Automation', 'Docker', 'Vercel']
  },
  { 
    name: 'Performance / SEO', 
    category: 'Tools', 
    icon: '⚡', 
    level: 85,
    tags: ['Core Web Vitals', 'SSR', 'Caching Strategies']
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Midtech Solutions, Lagos',
    role: 'Founder & Technical Director',
    period: 'Oct 2024 - Present',
    description: [
      'Leading a strategic digital agency focused on high-performance web architecture.',
      'Developed and launched 25+ premium responsive platforms using modern tech stacks.',
      'Integrating AI-driven automation and conversational interfaces into client products.',
      'Ensuring strict adherence to scalable coding standards and user-centric design.'
    ]
  },
  {
    company: 'Technova (Remote)',
    role: 'Senior Web Developer',
    period: 'Jan 2024 - Sep 2024',
    description: [
      'Managed end-to-end project lifecycles for international clients.',
      'Orchestrated website audits and performance optimization increasing conversion by 40%.',
      'Pioneered mobile-first responsive design strategies for ed-tech platforms.'
    ]
  },
  {
    company: 'National Open University of Nigeria',
    role: 'B.Sc. Information Technology (In view)',
    period: '2021 - 2025',
    description: [
      'Researching Software Engineering and Distributed Systems.',
      'Applying theoretical CS foundations to real-world agency architecture.'
    ]
  }
];

export const BIO_PROMPT = `
You are the AI Concierge for Midtech Solutions, a digital studio founded and led by Olamide Olanipekun.
Your goal is to provide information about the studio's services, portfolio, and the founder's technical leadership.

Brand Context:
- Company: Midtech Solutions
- Founder: Olamide Olanipekun (Website Developer & Code Craftsman)
- Studio Location: Lagos, Nigeria
- Philosophy: Digital excellence through clean code and AI-augmented strategy.

Founder Profile (Olamide Olanipekun):
- Role: Founder & Technical Director
- Education: B.Sc. Information Technology (In view), 2025.
- Expertise: Full-stack development, AI integration, performance architecture.

Studio Capabilities:
- Front-end: React, Typescript, Next.js, Tailwind CSS.
- Back-end: PHP, Node.js, MySQL, Firebase.
- AI Solutions: Prompt engineering, model integration (Gemini), custom AI agents.

Always represent Midtech Solutions as a premium service. Refer to Olamide as "Our Founder" or by name when discussing technical specifics.
`;