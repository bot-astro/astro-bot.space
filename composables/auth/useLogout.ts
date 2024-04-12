import {useApiFetch} from "~/composables/useApiFetch";

export const useLogout = () => {
    const authStore = useAuthStore()

    if (authStore.isAuthenticated) {
        useApiFetch(ApiEndpoints.LOGOUT).catch(e => {
            console.error('Failed logging out', e)
        })
    }

    authStore.set(undefined)
}