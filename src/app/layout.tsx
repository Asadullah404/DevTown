import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#06080e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://devtown.live'),
  title: {
    default: 'DevTown — Custom Websites, Web Applications & AI Automation',
    template: '%s | DevTown',
  },
  description:
    'DevTown is a premier software engineering studio. We build, scale, and automate high-performance websites, custom web applications, AI chatbots, and cloud workflows with guaranteed fixed-price quotes and 3–14 day delivery.',
  applicationName: 'DevTown',
  authors: [{ name: 'Asadullah', url: 'https://github.com/Asadullah404' }],
  generator: 'Next.js 14',
  keywords: [
    // Primary Creation Queries
    'make site',
    'make a website',
    'make web application',
    'build site',
    'build a website',
    'build web app',
    'create website',
    'create web application',
    'custom web application development',
    'full stack web development',
    'hire web developer',
    'hire full stack engineer',
    'hire Nextjs developer',
    'hire React developer',
    'hire Python developer',
    'freelance web developer',
    'productized web development',
    'fixed price web developer',
    'web development agency',
    'software engineering studio',
    // Primary Scaling Queries
    'scale site',
    'scale website',
    'scale web application',
    'scale web app to 100k users',
    'website scaling architecture',
    'high performance web development',
    'speed up website',
    'web app performance optimization',
    'Nextjs performance optimization',
    'scalable cloud architecture',
    'scalable database design',
    'PostgreSQL performance tuning',
    'Supabase scalable architecture',
    'Hostinger website scaling',
    'sub-second load time web app',
    'Core Web Vitals optimization',
    // AI & Automation Queries
    'AI automation agency',
    'AI workflow automation',
    'build AI chatbot',
    'custom AI agent development',
    'AI customer support bot',
    'automate business workflows',
    'LLM integration service',
    'OpenAI API integration developer',
    'Anthropic Claude developer',
    'LangChain automation developer',
    'AI content publishing engine',
    'WordPress AI automation pipeline',
    'automated lead qualification',
    'WhatsApp AI automation bot',
    'Python web automation',
    // Business & Product Queries
    'SaaS MVP development',
    'build SaaS MVP in 2 weeks',
    'custom client portal development',
    'enterprise business dashboard',
    'Stripe payment integration developer',
    'invoice management software',
    'internal business tools development',
    'turn idea into software',
    'fixed price software quote',
    'no hourly billing developer',
    'guaranteed timeline web developer',
    // Tech Stack Queries
    'Next.js 14 App Router developer',
    'React 18 developer',
    'TypeScript expert',
    'Tailwind CSS developer',
    'Python FastAPI developer',
    'Node.js backend developer',
    'Hostinger web app deployment',
    'Docker containerization developer',
    'Firebase web application developer',
    'REST API development',
  ],
  creator: 'DevTown',
  publisher: 'DevTown',
  category: 'technology',
  classification: 'Software Development & AI Automation Agency',
  alternates: {
    canonical: 'https://devtown.live',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devtown.live',
    siteName: 'DevTown',
    title: 'DevTown — Custom Websites, Web Applications, AI Automation & Scale',
    description:
      'Turn your business idea into working software. We build, scale, and automate high-performance websites, custom web applications, and AI pipelines with fixed quotes and rapid delivery.',
    images: [
      {
        url: 'https://devtown.live/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevTown — High-Performance Web & AI Engineering Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTown — Custom Websites, Web Applications, AI Automation & Scale',
    description:
      'We build, scale, and automate high-performance web applications and AI workflows. Fixed-price quotes, fast 3–14 day delivery, 100% code ownership.',
    images: ['https://devtown.live/og-image.png'],
    creator: '@Asadullah404',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebSite Schema
      {
        '@type': 'WebSite',
        '@id': 'https://devtown.live/#website',
        url: 'https://devtown.live',
        name: 'DevTown',
        alternateName: ['DevTown Live', 'DevTown AI & Web Engineering'],
        description:
          'High-performance websites, custom web apps, AI chatbots, and scalable workflows with fixed-price quotes and rapid delivery.',
        inLanguage: 'en-US',
      },

      // 2. ProfessionalService / Organization Schema
      {
        '@type': 'ProfessionalService',
        '@id': 'https://devtown.live/#organization',
        name: 'DevTown',
        url: 'https://devtown.live',
        logo: 'https://devtown.live/favicon.svg',
        image: 'https://devtown.live/og-image.png',
        description:
          'Productized software studio building custom websites, scalable web applications, AI chatbots, and business automation workflows with guaranteed fixed-price quotes.',
        priceRange: '$175 - $1200',
        openingHours: 'Mo-Su 00:00-24:00',
        telephone: '+923022111051',
        email: 'muhammad.asadullah.suhail@gmail.com',
        founder: {
          '@type': 'Person',
          name: 'Asadullah',
          url: 'https://github.com/Asadullah404',
          sameAs: ['https://github.com/Asadullah404'],
        },
        sameAs: [
          'https://github.com/Asadullah404',
          'https://github.com/Asadullah404/DevTown',
        ],
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Worldwide',
        },
        knowsAbout: [
          'Make Site and Web Application Architecture',
          'Scale Site and Cloud Performance Engineering',
          'Next.js 14 and React 18 Development',
          'Python AI and Autonomous LLM Agents',
          'Database Design and Optimization (PostgreSQL, Supabase)',
          'Hostinger, VPS and Cloud Deployment',
          'Workflow Automation and API Integrations',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Engineering Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'High-Converting Business Websites (Make & Scale)',
                description:
                  'Custom-designed responsive websites engineered with Next.js 14, sub-second load times, SEO optimization, and direct Hostinger deployment.',
              },
              price: '175.00',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Web Applications & Portals',
                description:
                  'Production-grade authenticated web portals with role-based access, databases, payment processing, and admin dashboards.',
              },
              price: '500.00',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Chatbots & Intelligent Assistants',
                description:
                  'Custom trained conversational AI agents with business knowledge bases, CRM integration, and automated human handoff.',
              },
              price: '250.00',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Workflow & Business Automation',
                description:
                  'End-to-end automation pipelines connecting webhooks, WhatsApp, email alerts, Google Sheets, and internal databases.',
              },
              price: '200.00',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Business Dashboards & Invoicing Systems',
                description:
                  'Internal operations dashboards with interactive charts, one-click PDF invoices, and inventory control.',
              },
              price: '400.00',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'API & Payment Integration Architecture',
                description:
                  'Secure Stripe/PayPal payment checkouts, third-party webhook receivers, and custom REST API endpoints.',
              },
              price: '150.00',
              priceCurrency: 'USD',
            },
          ],
        },
      },

      // 3. FAQPage Schema (Google Rich Snippets for SERP Expansion)
      {
        '@type': 'FAQPage',
        '@id': 'https://devtown.live/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do I need to have a design or technical specification ready to make a site?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not at all. You just need to explain what business outcome you want in plain English. DevTown handles the wireframes, technical architecture, and system design for you.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you deploy and scale my website onto my Hostinger hosting plan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, absolutely! We configure and deploy the website or application directly onto your Hostinger account, configure SSL certificates, custom domain DNS, and ensure 100% uptime with optimal caching and performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do milestone payments and fixed quotes work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To ensure total safety for both sides, projects are broken into milestones: an initial deposit to begin development (30–50%), followed by remaining milestones as you review and approve live working previews with zero hidden fees.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you ensure the site can scale as my traffic grows?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All applications are engineered using Next.js 14 static site pre-rendering, token-efficient database queries, and clean modular code architecture. This allows your website to handle 100,000+ monthly visits seamlessly without expensive server upgrades.',
            },
          },
        ],
      },

      // 4. Verified Software Applications ItemList
      {
        '@type': 'ItemList',
        '@id': 'https://devtown.live/#portfolio-items',
        name: 'Production Applications Built by DevTown',
        itemListElement: [
          {
            '@type': 'SoftwareApplication',
            position: 1,
            name: 'Autonomous AI Content & SEO Publishing Engine',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Windows, Linux, Cloud',
            offers: {
              '@type': 'Offer',
              price: '600.00',
              priceCurrency: 'USD',
            },
            url: 'https://github.com/Asadullah404/auto-blog-ai',
          },
          {
            '@type': 'SoftwareApplication',
            position: 2,
            name: 'Enterprise Business Dashboard & Management Portal',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '550.00',
              priceCurrency: 'USD',
            },
            url: 'https://github.com/Asadullah404/SMMC-PHARMACY-WEB',
          },
          {
            '@type': 'SoftwareApplication',
            position: 3,
            name: 'AI Video Localization & Voice Studio',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Linux, Cloud GPU',
            offers: {
              '@type': 'Offer',
              price: '1200.00',
              priceCurrency: 'USD',
            },
            url: 'https://github.com/Asadullah404/Ai_Video_Dubbing',
          },
          {
            '@type': 'SoftwareApplication',
            position: 4,
            name: 'High-Converting Local Leads Engine & CRM System',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '350.00',
              priceCurrency: 'USD',
            },
            url: 'https://github.com/Asadullah404/local-leads-site',
          },
        ],
      },
    ],
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="bg-[#06080e] text-slate-100 selection:bg-cyan-500/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  )
}
