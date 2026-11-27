import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'

let registered = false

export default function useHomeMotion() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)
    registered = true
  }

  const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return { gsap, ScrollTrigger, SplitText, reducedMotion }
}
