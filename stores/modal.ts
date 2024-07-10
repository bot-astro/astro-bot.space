export const useModalStore = defineStore('modal', () => {
  const modals = ref<ModalData[]>([])

  const activeModal = computed(() => modals.value[0])

  const push = (data: ModalData) => {
    modals.value.push(data)
  }

  const dismiss = () => {
    modals.value.shift()
  }

  return {
    modals,
    activeModal,

    push,
    dismiss
  }
})
