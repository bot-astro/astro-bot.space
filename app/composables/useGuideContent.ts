// loads the guide in the current locale, falling back to English while it is not translated yet
// (matches on the stem because the path is lowercased by Nuxt Content, which breaks codes like en-US)
export default function useGuideContent(name: string) {
  const { locale } = useI18n()

  return useAsyncData(
    () => `${name}_${locale.value}`,
    async () =>
      (await queryCollection('content')
        .where('stem', '=', `${locale.value}/${name}`)
        .first()) ??
      (await queryCollection('content')
        .where('stem', '=', `en-US/${name}`)
        .first()),
    { watch: [locale] },
  )
}
