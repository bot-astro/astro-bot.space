const aiAssistants: Record<string, string> = {
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'perplexity.ai': 'perplexity',
  'claude.ai': 'claude',
  'gemini.google.com': 'gemini',
  'copilot.microsoft.com': 'copilot',
}

export const AI_REFERRER_KEY = 'ai_referrer'

// remembers for the whole visit if it started from an AI assistant, so invites can be attributed to it
// (ChatGPT links carry utm_source=chatgpt.com, the others only show up as the referrer)
export default defineNuxtPlugin(() => {
  const utmSource = new URLSearchParams(window.location.search).get(
    'utm_source',
  )
  let referrerHost = ''
  try {
    referrerHost = new URL(document.referrer).hostname
  } catch {
    // no referrer
  }

  const host = (utmSource ?? referrerHost).replace(/^www\./, '')
  const assistant = aiAssistants[host]
  if (!assistant) return

  try {
    sessionStorage.setItem(AI_REFERRER_KEY, assistant)
  } catch {
    // storage blocked, the invite just won't be attributed
  }
})
