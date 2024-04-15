export default (payload: MouseEvent) => {
  const target = payload.currentTarget as HTMLElement | null

  if (target !== null) {
    const rect = target.getBoundingClientRect()
    const x = payload.clientX - rect.left
    const y = payload.clientY - rect.top

    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
  }
}
