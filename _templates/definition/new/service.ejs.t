---
to: src/definitions/<%= h.changeCase.camel(name) %>/serviceDefinitions.ts
---
import * as service from "../global/serviceDefinitions"
import { Price } from "../definitionGeneratorPrice"

const price = new Price({
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
    if (renew) {
      return `${renew} ${cost}`
    }
    return cost
  },
})

export const firebase = service
  .Firebase({
    brand: {
      description:
        "",
    },
    price: {
      localize: price,
    },
    links: {
      pricing: {
        title: "",
        description: "",
      },
      dashboard: {
        title: "",
        description: "",
      }
    }
  })

export const plausible = service
  .Plausible({
    brand: {
      description:
        "",
    },
    price: {
      localize: price,
    },
    links: {
      price: {
        title: "",
        description: "",
      }
    }
  })

export const sanity = service
  .Sanity({
    brand: {
      description:
        "",
    },
    price: {
      localize: price,
    },
    links: {
      price: {
        title: "",
        description: "",
      }
    }
  })

export const googleDomains = service.GoogleDomains({
  brand: {
    description: ""
  },
  price: {
    localize: price
  },
  links: {
    payments: {
      title: '',
      description: ''
    },
    dashboard: {
      title: '',
      description: ''
    }
  }
})

export const googleSearchConsole = service.GoogleSearchConsole({
  brand: {
    description: ""
  },
  price: {
    localize: price
  },
  links: {
    dashboard: {
      title: '',
      description: ''
    }
  }
})

export const microsoftBingWebmasterTool = service.MicrosoftBingWebmasterTool({
  brand: {
    description: ""
  },
  price: {
    localize: price
  },
  links: {
    dashboard: {
      title: '',
      description: ''
    }
  }
})

export const github = service.Github({
  brand: {
    description: ""
  },
  price: {
    localize: price
  },
  links: {
    dashboard: {
      title: '',
      description: ''
    }
  }
})
