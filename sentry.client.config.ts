import * as Sentry from '@sentry/nuxt'

Sentry.init({
  // the DSN is public by design, it only allows sending events
  dsn: 'https://edd24a705e5946c99fce341369b4b292@o4506708022263808.ingest.us.sentry.io/4512421418893312',
  enabled: !import.meta.dev,
  tracesSampleRate: 0.1,
})
