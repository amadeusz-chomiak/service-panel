---
to: src/definitions/<%= h.changeCase.camel(name) %>/priceDefinition.ts
---
import { Price } from "../definitionGeneratorPrice"

export const price = new Price({
  cost: {
    free: "",
    paid: "",
    flexible: "",
  },
  renew: {
    never: "",
    onDemand: "",
    daily: "",
    weekly: "",
    monthly: "",
    quarterly: "",
    yearly: "",
  },
  compose({ renew, cost }, originalPrice) {
    // compose price string based on translated renew and cost 
    if (originalPrice.renew) {
      return `${renew} ${cost}`
    }
    return `${cost}`
  },
})