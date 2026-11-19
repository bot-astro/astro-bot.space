import type { AIFormFillRB, AIFormFillResult, AIUsage } from '~/types/ai'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let messages_used = 3

export const mock_ai_usage = async (): Promise<AIUsage> => ({
  messagesUsed: messages_used,
  messagesLimit: 100,
  tokensUsed: messages_used * 1800,
  tokensLimit: 500000,
  premium: false,
  resetsAt: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(),
})

export const mock_ai_apply_proposal = async (): Promise<void> => {
  await sleep(600)
}

export const mock_ai_form_fill = async (
  form_fill_rb: AIFormFillRB,
): Promise<AIFormFillResult> => {
  await sleep(800)
  messages_used++

  const values: Record<string, unknown> = {
    generator: { default_name: '🎮 Gaming | {username}', user_limit: 5 },
    interface: {
      embed_style: {
        ...(form_fill_rb.currentValues as { embed_style?: object }).embed_style,
        title: 'Manage your voice channel',
      },
    },
    template: { name: 'Chill', vc_name: 'Chill | {username}', vc_limit: 8 },
    voice_role: { permanent: true },
  }
  const changed_fields: Record<string, string[]> = {
    generator: ['default_name', 'user_limit'],
    interface: ['embed_style'],
    template: ['name', 'vc_name', 'vc_limit'],
    voice_role: ['permanent'],
  }

  return {
    values: values[form_fill_rb.page] as object,
    changedFields: changed_fields[form_fill_rb.page]!,
    message: `Mock reply for "${form_fill_rb.prompt}". Review the highlighted fields and save when you are happy.`,
  }
}

export const mock_ai_chat_fetch: typeof fetch = async (_input, init) => {
  const body = JSON.parse(String(init?.body ?? '{}')) as {
    messages?: { parts?: { type: string; text?: string }[] }[]
  }
  const last_text =
    body.messages?.at(-1)?.parts?.find((p) => p.type === 'text')?.text ?? ''

  const encoder = new TextEncoder()
  const send = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    chunk: object | '[DONE]',
  ) =>
    controller.enqueue(
      encoder.encode(
        `data: ${chunk === '[DONE]' ? chunk : JSON.stringify(chunk)}\n\n`,
      ),
    )

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      await sleep(400)
      messages_used++

      if (last_text.toLowerCase().includes('limit')) {
        send(controller, {
          type: 'error',
          errorText:
            'You reached the monthly AI message limit of this server. Upgrade to Ultimate for a higher limit.',
        })
        send(controller, '[DONE]')
        controller.close()
        return
      }

      send(controller, { type: 'start', messageId: crypto.randomUUID() })
      send(controller, { type: 'text-start', id: 't1' })
      const reply = `Sure, here is what I would change for "${last_text}". Check the diff and approve it if it looks right.`
      for (const word of reply.split(' ')) {
        send(controller, { type: 'text-delta', id: 't1', delta: `${word} ` })
        await sleep(40)
      }
      send(controller, { type: 'text-end', id: 't1' })
      send(controller, {
        type: 'data-proposal',
        data: {
          id: crypto.randomUUID(),
          action: 'update_generator',
          summary: 'Update the generator "Create VC"',
          diff: [
            { field: 'User limit', before: 'Not set', after: '5' },
            {
              field: 'Channel name',
              before: '{username}',
              after: '🎮 Gaming | {username}',
            },
          ],
          expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        },
      })
      send(controller, { type: 'finish' })
      send(controller, '[DONE]')
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream',
      'x-vercel-ai-ui-message-stream': 'v1',
    },
  })
}
