<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { useGrants } from '~/data/astro/query/useGrants'

definePageMeta({
  middleware: 'auth',
})

const { t, te, locale } = useI18n()
const { toast } = useToast()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.connected_apps.title') }),
  meta: [
    { name: 'description', content: t('meta.connected_apps.description') },
  ],
}))

const { data: grants, error, isPending: is_pending } = useGrants()
const { mutate: revoke_grant, isPending: revoke_grant_loading } =
  useRevokeGrantMutation()

const scope_label = (scope: string) => {
  const key = `connected_apps.scopes.${scope.replace(':', '_')}`
  return te(key) ? t(key) : scope
}

const disconnect = (grant_id: string) =>
  revoke_grant(grant_id, {
    onError: () =>
      toast({
        description: t('connected_apps.disconnect_error'),
        variant: 'destructive',
      }),
  })
</script>

<template>
  <div class="container mt-4 flex flex-col items-center px-4">
    <div class="group-setting flex w-full flex-col text-center md:text-start">
      <span class="text-xl font-semibold">{{
        $t('connected_apps.title')
      }}</span>
      <span class="text-secondary text-sm">{{
        $t('connected_apps.subtitle')
      }}</span>
    </div>

    <div v-if="is_pending" class="mt-4 flex w-full justify-center">
      <IconLoading />
    </div>
    <div
      v-else-if="error"
      class="bordered-destructive text-destructive mt-4 flex w-full justify-center rounded-md p-4"
    >
      {{ $t('common.error_generic') }}
    </div>
    <div
      v-else-if="grants && grants.length > 0"
      class="mt-4 flex w-full flex-col gap-4"
    >
      <div
        v-for="grant in grants"
        :key="grant.id"
        class="group-setting flex flex-col justify-between gap-4 md:flex-row md:items-center"
      >
        <div class="flex flex-col gap-1">
          <span class="font-semibold">{{ grant.client_name }}</span>
          <div class="flex flex-wrap gap-2">
            <Badge v-for="scope in grant.scopes" :key="scope">
              {{ scope_label(scope) }}
            </Badge>
          </div>
          <span class="text-secondary text-sm">
            {{
              $t('connected_apps.connected_on', {
                date: new Date(grant.created_at).toLocaleDateString(locale),
              })
            }}
            ·
            {{
              grant.last_used_at
                ? $t('connected_apps.last_used', {
                    date: new Date(grant.last_used_at).toLocaleDateString(
                      locale,
                    ),
                  })
                : $t('connected_apps.never_used')
            }}
          </span>
        </div>

        <AlertDialog>
          <AlertDialogTrigger>
            <ButtonDestructive :loading="revoke_grant_loading">
              {{ $t('connected_apps.disconnect') }}
            </ButtonDestructive>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{{
                $t('connected_apps.disconnect_confirm_title', {
                  name: grant.client_name,
                })
              }}</AlertDialogTitle>
              <AlertDialogDescription>
                {{ $t('connected_apps.disconnect_confirm_description') }}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{{ $t('common.go_back') }}</AlertDialogCancel>
              <AlertDialogAction
                :destructive="true"
                :loading="revoke_grant_loading"
                @click="disconnect(grant.id)"
              >
                {{ $t('connected_apps.disconnect') }}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    <div v-else class="mt-32 flex flex-col items-center gap-2 text-center">
      <span class="text-xl font-semibold">{{ $t('connected_apps.none') }}</span>
      <span class="text-secondary text-sm">{{
        $t('connected_apps.none_description')
      }}</span>
    </div>
  </div>
</template>
