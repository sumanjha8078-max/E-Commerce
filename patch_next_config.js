const fs = require('fs');
let content = fs.readFileSync('next.config.ts', 'utf8');

content = content.replace(
  /const nextConfig: NextConfig = \{/,
  `const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'e-commerce-lac-sigma-69.vercel.app',
          },
        ],
        destination: 'https://greedycart.vercel.app/:path*',
        permanent: true,
      },
    ]
  },`
);

fs.writeFileSync('next.config.ts', content);
