import type { UIMessage } from 'ai'

export interface AIProposalDiff {
  field: string
  before: string | null
  after: string | null
}

export interface AIProposal {
  id: string
  action: string
  summary: string
  diff: AIProposalDiff[]
  expiresAt: string
}

export type AIMessage = UIMessage<unknown, { proposal: AIProposal }>

export interface AIUsage {
  messagesUsed: number
  messagesLimit: number
  tokensUsed: number
  tokensLimit: number
  premium: boolean
  resetsAt: string
}

export type AIFormPage = 'generator' | 'interface' | 'template' | 'voice_role'

export interface AIFormFillRB {
  page: AIFormPage
  entityId?: string
  currentValues: object
  prompt: string
}

export interface AIFormFillResult {
  values: object
  changedFields: string[]
  message: string
}
