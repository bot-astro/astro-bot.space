export interface GSTemplate {
  id: string;
  /**
   * the user-facing name of the template itself
   */
  name: string;
  /**
   * the IDs of the generators which can use this template<br>
   * if null, all generators can use this template<br>
   * **if empty, no generators can use this template**
   */
  enabled_generator_ids: string[] | null;
  vc_name: string | null;
  vc_limit: number | null;
  vc_bitrate: number | null;
  vc_region: string | null;
}