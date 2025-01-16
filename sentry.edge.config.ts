import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "https://c8fa98f4930afc7e7efd47130269b770@o4508651914133504.ingest.us.sentry.io/4508651916820480",

  tracesSampleRate: 1,
  debug: false,
})
