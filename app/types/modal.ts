import type { Component } from 'vue'

export interface ModalData {
  component: Component
  data: Record<string, unknown>
}
