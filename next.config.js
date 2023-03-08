/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  images: {
    domains: [ 'lh3.googleusercontent.com' ]
  }
}
