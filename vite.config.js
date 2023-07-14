import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap'

export default {
  plugins: [
    ViteImageOptimizer({}),
    Sitemap({
      hostname: "https://wordwizz.in/",
      exclude: ["/php"],
      outDir: "dist",
      generateRobotsTxt: true,
      robots: [{ userAgent: '*', allow: '/', disallow: '/php' }],
    }),
  ],
}
