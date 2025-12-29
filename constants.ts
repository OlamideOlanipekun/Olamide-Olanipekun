
import { Project, Skill, Experience } from './types';

export const SOCIAL_LINKS = {
  github: 'https://github.com/olamideolanipekun',
  linkedin: 'https://linkedin.com/in/olamide-olanipekun',
  twitter: 'https://twitter.com/olamide_dev',
  email: 'mailto:olamideolanipekun75@gmail.com'
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
    github: 'https://github.com/olamideolanipekun/wavecrest-finance'
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
    github: 'https://github.com/olamideolanipekun/quantum-chain'
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
    github: 'https://github.com/olamideolanipekun/rocket-english'
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
    github: 'https://github.com/olamideolanipekun/ai-assistant-core'
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
    github: 'https://github.com/olamideolanipekun/nova-wallet'
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
    github: 'https://github.com/olamideolanipekun/echo-branding'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', icon: '⚛️', level: 92 },
  { name: 'TypeScript', category: 'Frontend', icon: '🔷', level: 88 },
  { name: 'PHP / MySQL', category: 'Backend', icon: '🐘', level: 90 },
  { name: 'Node.js', category: 'Backend', icon: '🟢', level: 85 },
  { name: 'Tailwind / Bootstrap', category: 'Frontend', icon: '🎨', level: 95 },
  { name: 'AI Engineering', category: 'Tools', icon: '🤖', level: 82 },
  { name: 'Git / Version Control', category: 'Tools', icon: '🌿', level: 90 },
  { name: 'Performance / SEO', category: 'Tools', icon: '⚡', level: 85 },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Morthtech Solutions, Lagos',
    role: 'Front-End and Back-End Developer',
    period: 'Oct 2024 - Present',
    description: [
      'Developed and launched 25+ responsive websites using HTML5, CSS3, JavaScript and PHP.',
      'Improved site performance (load times) and cross-device compatibility.',
      'Trained junior developers and introduced modern coding standards and workflows.',
      'Managed deployments and basic hosting/domain configuration.'
    ]
  },
  {
    company: 'Technova (Remote)',
    role: 'Web Developer',
    period: 'Jan 2024 - Present',
    description: [
      'Managed client projects from concept to deployment with a mobile-first approach.',
      'Performed website audits and fixed bugs; improved load times by up to 50%.',
      'Provided post-launch support and client training.'
    ]
  },
  {
    company: 'National Open University of Nigeria',
    role: 'B.Sc. Information Technology (In view)',
    period: '2021 - 2025',
    description: [
      'Focusing on Software Engineering, Data Structures, and Information Security.',
      'Maintaining academic excellence while building a professional portfolio.'
    ]
  }
];

export const BIO_PROMPT = `
You are the AI Assistant for Olamide Olanipekun, a professional Website Developer and Code Craftsman.
Your goal is to answer questions about Olamide's skills, projects, and availability.

Profile:
- Name: Olamide Olanipekun
- Location: Lagos, Nigeria
- Title: Website Developer | Code Craftsman | AI Proficiency
- Email: olamideolanipekun75@gmail.com
- Phone: 08065373055
- Education: B.Sc. Information Technology (In view), 2025 - National Open University of Nigeria.

Key Skills:
- Front-end: HTML5, CSS3, JavaScript, Bootstrap, Tailwind, React, Typescript, Next.js.
- Back-end: PHP, Node.js, MySQL.
- AI Skills: Prompt engineering, AI automation, AI model integration (Gemini, OpenAI, HuggingFace, LangChain).
- Tools: Git, Hosting management, SEO fundamentals.

Featured Projects:
- WaveCrest Financial (Investment & Financial Services)
- Quantum FTX Chain (Crypto & Blockchain Platform)
- Rocket English (Online Education Platform)

Certifications:
- HTML/CSS Essentials (CISCO)
- Web Development (University of Leeds)
- Software Development (The Open University)
- Data Analysis (HP Life)

Tone: Professional, knowledgeable, and helpful. Guide users to contact Olamide for project inquiries.
`;
