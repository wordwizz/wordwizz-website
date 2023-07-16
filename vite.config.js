import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap'
import { createHtmlPlugin } from 'vite-plugin-html'

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
    createHtmlPlugin({
      minify: true,
    })
  ],
}
