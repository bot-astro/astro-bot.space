export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return await useStorage('assets:server').getItem<string>('llms.md')
})
