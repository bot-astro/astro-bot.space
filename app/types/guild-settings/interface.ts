export interface GSInterface {
  channel_id: string
  message_id: string
  buttons: GSInterfaceButton[]
  embed_style: GSInterfaceEmbedStyle
}

export interface GSInterfaceButton {
  id: string
  name: string | null
  emoji: string | null
  button_style_key: number
  button_disabled: boolean
  /**
   * action row (0-4) and position in the row (0-4)
   */
  position: { first: number; second: number }
  /**
   * defaults to the id
   */
  field_value: string
}

export interface GSInterfaceEmbedStyle {
  url: string | null
  title: string | null
  description: string | null
  timestamp: number | null
  /**
   * color as a signed argb integer, the alpha is ignored by Discord
   */
  color: number
  /**
   * thumbnail url
   */
  thumbnail: string | null
  /**
   * image url
   */
  image: string | null
  author_name: string | null
  author_url: string | null
  author_icon_url: string | null
  footer: string | null
  footer_icon_url: string | null
}
