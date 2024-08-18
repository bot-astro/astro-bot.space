export default function () {
  const route = useRoute()
  const guild_id = ref(route.params.guild_id as string | undefined)

  watch(() => route.params, (params) => {
    guild_id.value = params.guild_id as string | undefined
  })

  return guild_id
}