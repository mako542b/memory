/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    distDir: 'build',
    output: 'export',
    // Optional: Add a trailing slash to all paths `/about` -> `/about/`
    // trailingSlash: true,
    assetPrefix: 'https://mako542b.github.io/memory-game',
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',
  }
   
  module.exports = nextConfig