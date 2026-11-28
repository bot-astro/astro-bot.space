const legalPages: Record<string, string> = {
  '/privacy': 'privacy-policy.md',
  '/terms': 'terms-of-service.md',
  '/refund-policy': 'refund-policy.md',
}

// pages written in markdown, AI agents get the source instead of the html
function markdownSource(path: string) {
  if (path === '/') return { storage: 'assets:server', key: 'llms.md' }
  if (legalPages[path])
    return { storage: 'assets:content', key: legalPages[path] }

  const article = path.match(/^\/articles\/([a-z0-9-]+)$/)
  if (article)
    return { storage: 'assets:content', key: `articles/${article[1]}.md` }

  const guide = path.match(/^\/guides\/([a-z-]+)$/)
  if (guide)
    return {
      storage: 'assets:content',
      key: `guides/en-US/${guide[1]}.md`,
    }
}

// frontmatter becomes a title and intro, so the markdown reads like the page
function withTitle(markdown: string) {
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---\n/)
  if (!frontmatter) return markdown

  const field = (name: string) =>
    frontmatter[1]!
      .match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]
      ?.trim()
      .replace(/^['"]|['"]$/g, '')
  const title = field('title')
  const description = field('description')
  const body = markdown.slice(frontmatter[0].length).trim()
  if (body.startsWith('# ')) return body
  return [title && `# ${title}`, description, body].filter(Boolean).join('\n\n')
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') return

  const source = markdownSource(getRequestURL(event).pathname)
  if (!source) return

  appendResponseHeader(event, 'Vary', 'Accept')
  if (!getRequestHeader(event, 'accept')?.includes('text/markdown')) return

  const markdown = await useStorage(source.storage).getItem<string>(source.key)
  if (!markdown) return

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  return withTitle(markdown)
})
