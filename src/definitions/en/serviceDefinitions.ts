import * as service from "../global/serviceDefinitions"
import { Price } from "../definitionGeneratorPrice"

const price = new Price({
  cost: {
    free: "free",
    paid: "paid",
    flexible: "", // handled in compose function
  },
  renew: {
    never: "one time",
    onDemand: "on demand",
    daily: "daily",
    weekly: "weekly",
    monthly: "monthly",
    quarterly: "quarterly",
    yearly: "yearly",
  },
  compose({ renew, cost }, originalPrice) {
    if (renew) {
      if (originalPrice.cost === "flexible")
        return `${renew} paid service with a free tier`
      return `${renew} ${cost} service`
    }
    return cost
  },
})

export const firebase = service
  .Firebase({
    brand: {
      description:
        "Server provider that combines site hosting, database, authentication, analytics and more",
    },
    price: {
      localize: price,
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
    price: {
      localize: price,
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
    price: {
      localize: price,
    },
  })
  .link("initialize", "pricing", {
    title: "pricing",
    description: "You'll find detailed pricing",
  })
