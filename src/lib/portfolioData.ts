export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export interface Project {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  linkedin: string;
  linkedinDisplay: string;
  location: string;
  copyright: string;
  builtIn: string;
}

export interface PortfolioData {
  about: {
    text: string;
    skills: SkillGroup[];
  };
  services: Service[];
  projects: Project[];
  contact: ContactInfo;
}

const STORAGE_KEY = 'portfolio_data_v1';

export const DEFAULT_DATA: PortfolioData = {
  about: {
    text: 'IT Engineer and AI graduate from Arab International University, based in Dubai. I design and deploy enterprise systems — ticketing platforms, asset management tools, HR dashboards, CRMs, and listing engines — while managing the full IT stack: networks, servers, cloud infrastructure, and everything in between. Currently IT Specialist at Rabdan Real Estate Development, UAE.',
    skills: [
      { label: 'Infrastructure', items: ['UniFi', 'VLANs', 'DHCP', 'DNS', 'VMware', 'Proxmox VE', 'Linux Server', 'Windows Server'] },
      { label: 'Cloud & Hosting', items: ['AWS', 'Microsoft Azure', 'cPanel', 'Hostinger', 'GoDaddy', 'Microsoft 365'] },
      { label: 'Systems & CRM', items: ['Salesforce', 'Zoho CRM', 'Freshdesk', 'Freshservice', 'Docker', 'SQL', 'API Integrations', 'GitHub'] },
      { label: 'AI & Dev', items: ['Python', 'AI Agents', 'Engati Chatbot', 'Postman', 'AnyDesk', 'TeamViewer'] },
    ],
  },
  services: [
    { number: '01', title: 'IT Infrastructure & Networking', description: 'Design and maintain full network infrastructure: switches, routers, VLANs, VoIP, CCTV, and structured cabling — ensuring secure, stable connectivity across all departments.' },
    { number: '02', title: 'Enterprise Systems Development', description: 'Build custom systems from scratch: ticketing platforms, asset management tools, HR dashboards, CRMs, and real estate listing engines — tailored to business operations.' },
    { number: '03', title: 'Web Development & Maintenance', description: 'Develop and maintain websites, landing pages, and virtual business cards — from initial setup and configuration to ongoing updates and performance optimisation.' },
    { number: '04', title: 'Cloud & Server Administration', description: 'Deploy and manage AWS, Azure, Proxmox VE, and Windows/Linux servers — handling backups, Active Directory, domain policies, security hardening, and uptime monitoring.' },
    { number: '05', title: 'AI & Chatbot Integration', description: 'Wire AI agents, chatbots, and automation flows into real products — from intelligent lookup systems and SEO/GEO tools to lead qualification bots and AI-powered dashboards.' },
  ],
  projects: [
    { number: '01', category: 'Web · Dev', name: 'Website', liveUrl: 'https://barber-website-and-booking-system.vercel.app/', col1Image1: '/projects/website/cover.png', col1Image2: '/projects/website/screen2.png', col2Image: '/projects/website/screen1.png' },
    { number: '02', category: 'Enterprise · HR', name: 'HR System', liveUrl: 'https://hr.psq.ae/#/demo', col1Image1: '/projects/hr-system/cover.png', col1Image2: '/projects/hr-system/screen1.png', col2Image: '/projects/hr-system/screen2.png' },
    { number: '03', category: 'Enterprise · IT', name: 'Asset Management', liveUrl: '#', col1Image1: '/projects/assets-management/cover.png', col1Image2: '/projects/assets-management/screen1.png', col2Image: '/projects/assets-management/screen2.png' },
    { number: '04', category: 'AI · Web', name: 'SEO & GEO Coach', liveUrl: 'https://ai-agent-frontend-two-eosin.vercel.app/', col1Image1: '/projects/seo-geo-coach/cover.png', col1Image2: '/projects/seo-geo-coach/screen1.png', col2Image: '/projects/seo-geo-coach/screen2.png' },
    { number: '05', category: 'Real Estate · Web', name: 'Listing System', liveUrl: 'https://listing.psq.ae/', col1Image1: '/projects/listing-system/cover.png', col1Image2: '/projects/listing-system/screen1.png', col2Image: '/projects/listing-system/screen2.png' },
    { number: '06', category: 'Enterprise · Web', name: 'Lookup System', liveUrl: 'https://lookup.psq.ae/login', col1Image1: '/projects/lookup-system/cover.png', col1Image2: '/projects/lookup-system/screen1.png', col2Image: '/projects/lookup-system/screen2.png' },
    { number: '07', category: 'Web · SaaS', name: 'Booking System', liveUrl: 'https://click-web-w3vy.vercel.app/', col1Image1: '/projects/booking-system/cover.png', col1Image2: '/projects/booking-system/screen1.png', col2Image: '/projects/booking-system/cover.png' },
    { number: '08', category: 'Enterprise · CRM', name: 'CRM System', liveUrl: 'https://psq-crm-frontend.vercel.app/', col1Image1: '/projects/crm-system/cover.png', col1Image2: '/projects/crm-system/screen1.png', col2Image: '/projects/crm-system/screen2.png' },
  ],
  contact: {
    email: 'emaadyahya4@gmail.com',
    whatsapp: '971566392647',
    whatsappDisplay: '+971 566 392 647',
    linkedin: 'https://www.linkedin.com/in/emad-yahya/',
    linkedinDisplay: 'in/emad-yahya',
    location: 'Dubai, UAE',
    copyright: '© 2026 Emad Yahya',
    builtIn: 'Built in Dubai, UAE',
  },
};

export function loadData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PortfolioData;
      return {
        about: { ...DEFAULT_DATA.about, ...parsed.about },
        services: parsed.services?.length ? parsed.services : DEFAULT_DATA.services,
        projects: parsed.projects?.length ? parsed.projects : DEFAULT_DATA.projects,
        contact: { ...DEFAULT_DATA.contact, ...parsed.contact },
      };
    }
  } catch {}
  return DEFAULT_DATA;
}

export function saveData(data: PortfolioData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
