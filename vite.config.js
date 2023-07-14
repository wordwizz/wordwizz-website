import Sitemap from 'vite-plugin-sitemap'

export default {
  plugins: [
    Sitemap({
      hostname: "https://wordwizz.in/",
      exclude: ["/php"],
      outDir: "dist",
      generateRobotsTxt: true,
      robots: [{ userAgent: '*', allow: '/', disallow: '/php' }],
    }),
  ],
}
