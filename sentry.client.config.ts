import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "https://c8fa98f4930afc7e7efd47130269b770@o4508651914133504.ingest.us.sentry.io/4508651916820480",

  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      isEmailRequired: true,
      showBranding: false,
      //   themeLight: {
      //     foreground: "black",
      //     background: "white",

      //   },
      //   themeDark: {
      //     foreground: "white",
      //     background: "black",
      //   },
    }),
  ],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
