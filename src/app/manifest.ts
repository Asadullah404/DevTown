import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevTown — Custom Web & AI Engineering Studio',
    short_name: 'DevTown',
    description:
      'High-performance websites, custom web apps, AI chatbots, and scalable workflows with fixed-price quotes and fast delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06080e',
    theme_color: '#06080e',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
