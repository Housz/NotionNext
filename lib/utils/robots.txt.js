import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { normalizeSiteUrl } from '@/lib/sitemap-utils'
import fs from 'fs'

export function generateRobotsTxt(props) {
  const { siteInfo, NOTION_CONFIG } = props
  const LINK = normalizeSiteUrl(
    siteConfig('LINK', siteInfo?.link || BLOG.LINK, NOTION_CONFIG)
  )

  const content = `# Default crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Major search engines
User-agent: Googlebot
User-agent: Bingbot
User-agent: Baiduspider
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# AI search and user-directed retrieval
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# AI model and grounding crawlers
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Canonical sitemap
Sitemap: ${LINK}/sitemap.xml
`

  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // Vercel runtime is read-only; this succeeds during the build step.
  }
}
