import * as service from "../global/serviceDefinitions"
import { price } from './priceDefinition'

export const firebase = service.Firebase({
  brand: {
    description:
      "Server provider that combines site hosting, database, authentication, analytics and more",
  },
  price: {
    localize: price,
  },
  links: {
    dashboard: {
      title: "dashboard",
      description: "You'll find there all parts of firebase",
    },
    pricing: {
      title: "pricing",
      description: "You'll find detailed pricing",
    },
  },
})

export const plausible = service.Plausible({
  brand: {
    description: "Simple and privacy-friendly alternative to Google Analytics",
  },
  price: {
    localize: price,
  },
  links: {
    pricing: {
      title: "pricing",
      description: "You'll find detailed pricing",
    },
  },
})

export const sanity = service.Sanity({
  brand: {
    description:
      "Sanity is the ultimate content platform that helps teams dream big and deliver quickly",
  },
  price: {
    localize: price,
  },
  links: {
    pricing: {
      title: "pricing",
      description: "You'll find detailed pricing",
    },
  },
})

export const developer = service.Developer({
  brand: {
    description: "I'll help You upgrade this website",
  },
  price: {
    localize: price,
  },
  links: {},
})

export const googleDomains = service.GoogleDomains({
  brand: {
    description: "Simple domain provider, with no string attached"
  },
  price: {
    localize: price
  },
  links: {
    payments: {
      title: "payments",
      description: "Check Your spendings",
    },
    dashboard: {
      title: 'dashboard',
      description: "You'll find there details of Your domains"
    }
  }
})

export const googleSearchConsole = service.GoogleSearchConsole({
  brand: {
    description: "Allow this site to be found in Google"
  },
  price: {
    localize: price
  },
  links: {
    dashboard: {
      title: 'dashboard',
      description: "Check how the site is doing on Google search engine"
    }
  }
})

export const microsoftBingWebmasterTool = service.MicrosoftBingWebmasterTool({
  brand: {
    description: "Allow this site to be found in Bing"
  },
  price: {
    localize: price
  },
  links: {
    dashboard: {
      title: 'dashboard',
      description: "Check how the site is doing on Bing search engine"
    }
  }
})

export const github = service.Github({
  brand: {
    description: "Place for all of the code of the site"
  },
  price: {
    localize: price
  },
  links: {}
})