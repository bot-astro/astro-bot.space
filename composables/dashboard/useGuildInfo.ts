export default function () {
  const guild_id = useGuildId()

  const guilds = useGuilds()
  const guild_info = computed(() => {
    return (guilds.data.value ?? [])
      .find(guild => guild.id === guild_id.value)
  })

  return guild_info
}