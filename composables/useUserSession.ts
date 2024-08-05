import {CookieKeys} from "assets/config/CookieKeys";
import type {UserSession} from "~/types/auth";

export default function() {
  const cookie = useCookie<UserSession | null>(CookieKeys.USER_SESSION)
  const state = useState(CookieKeys.USER_SESSION, () => cookie.value);

  watch(state, () => { cookie.value = state.value }, { deep: true });

  return {
    data: state,
    set: (userSession: UserSession) => state.value = userSession,
    clear: () => state.value = null
  }
}