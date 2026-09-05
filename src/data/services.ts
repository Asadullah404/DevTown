import { Service } from '../types'

export const SERVICES: Service[] = [
  {
    id: 'websites',
    title: 'High-Converting Business Websites',
    category: 'Websites & Landing Pages',
    description: 'Fast, responsive, and SEO-optimized business websites designed to turn cold visitors into paying inquiries. Built with modern web standards and 100/100 performance scores.',
    iconName: 'Globe',
    startingPrice: '$175 – $350',
    estimatedTime: '3 – 7 Days',
    deliverables: [
      'Custom modern responsive design',
      'High-converting copy layout & CTA buttons',
      'Mobile-first optimization',
      'On-page SEO & meta tags setup',
      'Contact form connected to WhatsApp / Email',
      'Hostinger deployment & SSL setup'
    ],
    accentColor: '#06b6d4',
  },
  {
    id: 'web-apps',
    title: 'Custom Web Applications & Portals',
    category: 'Full-Stack Software',
    description: 'Secure, scalable custom web applications with user authentication, databases, admin dashboards, and custom business logic tailored to your exact workflow.',
    iconName: 'LayoutGrid',
    startingPrice: '$500 – $1,200',
    estimatedTime: '7 – 18 Days',
    deliverables: [
      'React / TypeScript full-stack frontend',
      'Firebase / Supabase database architecture',
      'Secure user login & role-based permissions',
      'Custom interactive data tables & filters',
      'Automated transactional emails / notifications',
      'Deployment to your custom domain'
    ],
    accentColor: '#10b981',
  },
  {
    id: 'ai-solutions',
    title: 'Custom AI Chatbots & Assistants',
    category: 'Applied AI Solutions',
    description: 'AI customer-support chatbots and internal assistants trained on your company documentation, FAQs, and product catalog to answer queries 24/7.',
    iconName: 'Bot',
    startingPrice: '$250 – $550',
    estimatedTime: '4 – 9 Days',
    deliverables: [
      'Custom LLM system prompt & knowledge base',
      'Embeddable chat bubble widget for any site',
      'Context retention & conversation memory',
      'Lead capture & WhatsApp notification triggers',
      'Admin view of chat logs & user queries',
      'Free 30-day prompt fine-tuning'
    ],
    accentColor: '#8b5cf6',
  },
  {
    id: 'automation',
    title: 'Workflow & Business Automation',
    category: 'Operations & Pipelines',
    description: 'Automate repetitive daily tasks: scrape data, sync customer orders into spreadsheets, trigger instant WhatsApp alerts, and integrate disconnected software.',
    iconName: 'Zap',
    startingPrice: '$200 – $600',
    estimatedTime: '3 – 8 Days',
    deliverables: [
      'Python / Node.js automated background workers',
      'API webhooks & multi-platform connectors',
      'Google Sheets / CRM data synchronization',
      'Automated scheduled report generation',
      'Error notification & failure alerts',
      'One-click run launcher or cloud scheduler'
    ],
    accentColor: '#f59e0b',
  },
  {
    id: 'dashboards',
    title: 'Business Dashboards & Reporting',
    category: 'Analytics & Operations',
    description: 'Visual analytics panels, inventory control systems, and automated PDF invoice / Excel report generators that give you complete command over your operations.',
    iconName: 'BarChart3',
    startingPrice: '$400 – $900',
    estimatedTime: '6 – 14 Days',
    deliverables: [
      'Interactive visual revenue & activity charts',
      'One-click printable PDF invoice generator',
      'Excel (.xlsx) / CSV bulk export & import',
      'Live search, pagination, and multi-tier filtering',
      'Multi-role access (Admin vs. Staff)',
      'Real-time metrics & inventory warnings'
    ],
    accentColor: '#ec4899',
  },
  {
    id: 'integrations',
    title: 'API & Payment Gateway Integrations',
    category: 'System Connections',
    description: 'Connect your website to payment gateways (Stripe, PayPal), WhatsApp Business API, CRM systems, custom REST APIs, or third-party webhooks.',
    iconName: 'Cpu',
    startingPrice: '$150 – $350',
    estimatedTime: '2 – 5 Days',
    deliverables: [
      'Stripe / PayPal checkout & subscription webhooks',
      'WhatsApp Cloud API automated messaging',
      'Third-party REST API integration & testing',
      'Database sync & schema mapping',
      'Environment security & secret key encryption',
      'Full API documentation & test endpoints'
    ],
    accentColor: '#38bdf8',
  },
]
