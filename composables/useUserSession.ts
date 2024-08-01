import {CookieKeys} from "assets/config/CookieKeys";
import type {UserSession} from "~/types/auth";

export default function() {
  const cookie = useCookie<UserSession | undefined>(CookieKeys.USER_SESSION)
  const state = useState(CookieKeys.USER_SESSION, () => cookie.value);

  return {
    data: cookie,
    set: (userSession: UserSession) => cookie.value = userSession,
    clear: () => cookie.value = undefined
  }
}