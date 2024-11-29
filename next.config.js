/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = require('./csp');
const redirects = require('./redirects');

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'momifa.com',
      'momifa-storage-bucket.s3.eu-west-2.amazonaws.com',
      'momifa-storage-bucket.s3.amazonaws.com', // Add this domain
      process.env.NEXT_PUBLIC_SERVER_URL?.replace(/https?:\/\//, ''),
    ].filter(Boolean), // Ensure no falsy values are included
  },  
  redirects,
  async headers() {
    const headers = [];

    // Prevent search engines from indexing the site if it is not live
    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      });
    }

    // Set the `Content-Security-Policy` header
    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    });

    // CORS headers configuration for API routes
    headers.push({
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*', // Change to specific domain if needed
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization',
        },
        {
          key: 'Access-Control-Allow-Credentials',
          value: 'true',
        },
      ],
    });

    return headers;
  },
};

module.exports = nextConfig;
