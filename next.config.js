/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['ipfs.infura.io'],
//   },
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   },
// }

// const dedicatedEndPoint = 'tjgnftmp.infura-ipfs.io'

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: dedicatedEndPoint,
//         port: '',
//         pathname: '/ipfs/**',
//       },
//     ],
//   },
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.infura.io'],
  },
}
