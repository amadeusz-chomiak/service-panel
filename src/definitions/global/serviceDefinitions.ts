import { createService } from "../definitionGenerator"

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
  price: {
    cost: "flexible",
    renew: "monthly",
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
  price: {
    cost: "paid",
    renew: "yearly",
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
  price: {
    cost: "flexible",
    renew: "monthly",
  },
})

export const Developer = createService({
  brand: {
    name: "developer",
    color: "#3e61a5",
    onColor: "white",
  },
  links: {},
  price: {
    cost: "paid",
    renew: "onDemand",
  },
})
