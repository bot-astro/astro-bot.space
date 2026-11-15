export default function useHomeMagnetic(root: Ref<HTMLElement | null>) {
  const { gsap } = useHomeMotion()
  const cleanups: (() => void)[] = []

  function attach() {
    if (
      !root.value ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
      return

    root.value.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
      const x = gsap.quickTo(el, 'x', {
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })
      const y = gsap.quickTo(el, 'y', {
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })
      const move = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        x((e.clientX - (rect.left + rect.width / 2)) * 0.35)
        y((e.clientY - (rect.top + rect.height / 2)) * 0.35)
      }
      const leave = () => {
        x(0)
        y(0)
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      })
    })
  }

  function detach() {
    cleanups.splice(0).forEach((fn) => fn())
  }

  return { attach, detach }
}
