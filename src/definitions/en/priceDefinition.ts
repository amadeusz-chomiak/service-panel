import { Price } from "../definitionGeneratorPrice"

export const price = new Price({
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
    if (originalPrice.renew) {
      if (originalPrice.cost === "flexible")
        return `${renew} paid service with a free tier`
      return `${renew} ${cost} service`
    }
    return `${cost} service`
  },
})