import * as service from "../global/serviceDefinitions"

export const firebase = service
  .Firebase({
    brand: {
      description:
        "Server provider that combines site hosting, database, authentication, analytics and more",
    },
  })
  .link("initialize", "dashboard", {
    title: "dashboard",
    description: "You'll find there all parts firebase",
  })
  .link("initialize", "pricing", {
    title: "pricing",
    description: "You'll find detailed pricing",
  })

export const plausible = service
  .Plausible({
    brand: {
      description:
        "Simple and privacy-friendly alternative to Google Analytics",
    },
  })
  .link("initialize", "pricing", {
    title: "pricing",
    description: "You'll find detailed pricing",
  })

export const sanity = service
  .Sanity({
    brand: {
      description:
        "Sanity is the ultimate content platform that helps teams dream big and deliver quickly",
    },
  })
  .link("initialize", "pricing", {
    title: "pricing",
    description: "You'll find detailed pricing",
  })
