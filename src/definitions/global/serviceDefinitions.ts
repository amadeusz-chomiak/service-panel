import { createService } from "../definitionGenerators"

export const Firebase = createService({
  brand: {
    name: "firebase",
    color: "#FFA000",
    onColor: "black",
  },
  links: {
    dashboard: "https://console.firebase.google.com/",
    pricing: "https://firebase.google.com/pricing",
  },
})

export const Plausible = createService({
  brand: {
    name: "plausible",
    color: "#5850ec",
    onColor: "white",
  },
  links: {
    pricing: "https://plausible.io/#pricing",
  },
})

export const Sanity = createService({
  brand: {
    name: "sanity",
    color: "#f03e2f",
    onColor: "white",
  },
  links: {
    pricing: "https://www.sanity.io/pricing/compare",
  },
})
