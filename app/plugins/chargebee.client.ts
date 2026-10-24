export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const script = document.createElement('script')
  script.src = 'https://js.chargebee.com/v2/chargebee.js'
  script.async = true
  script.onload = () => {
    Chargebee.init({ site: config.public.chargebee_site as string })
  }
  document.head.appendChild(script)
})
