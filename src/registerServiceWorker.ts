if (process.env.NODE_ENV === "production") {
  try {
    ;(async () => {
      if ("serviceWorker" in navigator) {
        const { Workbox, messageSW } = await import("workbox-window")
        const { useVersionControl } = await import(
          "./composable/useVersionControl"
        )
        const { setSkipWaiting } = useVersionControl()
        const wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)

        wb.addEventListener("waiting", event => {
          setSkipWaiting(async () => {
            const waitingServiceWorker = event.sw
            if (waitingServiceWorker) {
              await messageSW(waitingServiceWorker, {
                action: "skipWaiting",
                type: "SKIP_WAITING",
              })
              setSkipWaiting()
            }
          })
        })

        wb.addEventListener("controlling", event => {
          if (event.isUpdate) {
            location.reload()
          }
        })

        wb.register()
      }
    })()
  } catch (error) {
    console.error(error)
  }
}
