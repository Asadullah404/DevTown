import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dev Studio — Custom Websites, Web Applications & AI Automation',
  description:
    'Turn your business idea into working software. High-performance websites, custom web apps, AI chatbots, and automated workflows with fixed-price quotes and fast delivery.',
  keywords: [
    'custom web application development',
    'AI automation agency',
    'fixed price web developer',
    'React TypeScript developer',
    'WordPress AI automation',
    'business dashboard development',
    'AI chatbot integration',
    'Hostinger web app deployment',
  ],
  authors: [{ name: 'Dev Studio' }],
  creator: 'Dev Studio',
  publisher: 'Dev Studio',
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
    url: 'https://devstudio.dev',
    title: 'Dev Studio — Custom Websites, Web Applications & AI Automation',
    description:
      'Turn your business idea into working software. High-performance websites, custom web apps, AI chatbots, and automated workflows with fixed-price quotes.',
    siteName: 'Dev Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Studio — Custom Websites, Web Applications & AI Automation',
    description:
      'Turn your business idea into working software. High-performance websites, custom web apps, AI chatbots, and automated workflows.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Dev Studio',
    image: 'https://devstudio.dev/favicon.svg',
    description:
      'Productized software studio building custom websites, web applications, AI chatbots, and business automation workflows with fixed-price quotes.',
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-24:00',
    knowsAbout: [
      'Web Development',
      'Artificial Intelligence',
      'React and TypeScript',
      'Python Automation',
      'Cloud Architecture',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'High-Converting Business Websites',
          },
          price: '175.00',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Web Applications & Portals',
          },
          price: '500.00',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Chatbots & Intelligent Assistants',
          },
          price: '250.00',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workflow & Business Automation',
          },
          price: '200.00',
          priceCurrency: 'USD',
        },
      ],
    },
  }

  return (
    <html lang="en" className="dark">
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground selection:bg-cyan-500/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  )
}
