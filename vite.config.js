import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import ViteWebfontDownload from 'vite-plugin-webfont-dl';
import Sitemap from 'vite-plugin-sitemap'
import { createHtmlPlugin } from 'vite-plugin-html'

export default {
  plugins: [
    ViteImageOptimizer({}),
    ViteWebfontDownload(
      [],
      {
        injectAsStyleTag: true,
        minifyCss: true,
        async: true,
        cache: true,
        proxy: false,
      }
    ),
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
