export type MediaType = 'PROFILE_AVATAR' | 'PROFILE_BANNER' | 'INTERFACE_IMAGE'

export interface Media {
  id: string
  type: MediaType
  file_name: string
  /**
   * public url of the media
   */
  url: string
  /**
   * epoch millis
   */
  created_at: number
}
