/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Fully pre-renders static HTML for lightning-fast Google SEO crawling & 100% Hostinger compatibility
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
