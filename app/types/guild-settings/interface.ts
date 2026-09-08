export interface GSInterface {
  channel_id: string;
  message_id: string;
  buttons: GSInterfaceButton[];
  embed_style: GSInterfaceEmbedStyle;
}

export interface GSInterfaceButton {
  /**
   * id = command that the button executes
   * TODO: figure out how to get the available commands and map them to a user readable name
   *
   * it contains query parameters too:
   * - interface=true if it's an interface button
   *
   * example: `vc-lock?interface=true`
   */
  id: string;
  name: string | null;
  emoji: string | null;
  /**
   * TODO: figure out how to get the available style keys and map them to colors
   * probably do this statically instead of making an api call
   */
  button_style_key: number;
  button_disabled: boolean;
  position: number[];
}

export interface GSInterfaceEmbedStyle {
  url: string | null;
  title: string | null;
  description: string | null;
  timestamp: number | null;
  /**
   * rgb integer representing the color
   */
  color: number;
  /**
   * thumbnail url
   */
  thumbnail: string | null;
  /**
   * image url
   */
  image: string | null;
  author_name: string | null;
  author_url: string | null;
  author_icon_url: string | null;
  footer: string | null;
  footer_icon_url: string | null;
}