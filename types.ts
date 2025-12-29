
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Web' | 'Mobile' | 'Design' | 'AI';
  imageUrl: string;
  link: string;
  github: string;
  year?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  icon: string;
  level: number; // 0-100
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
