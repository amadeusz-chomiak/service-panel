import { createService } from "../definitionGenerator"

export const Firebase = createService<"dashboard" | "pricing">({
  brand: {
    name: "firebase",
    color: "#FFA000",
    onColor: "black",
  },
  links: {
    dashboard: { href: "https://console.firebase.google.com/" },
    pricing: { href: "https://firebase.google.com/pricing" },
  },
  price: {
    cost: "flexible",
    renew: "monthly",
  },
})

export const Plausible = createService<"pricing">({
  brand: {
    name: "plausible",
    color: "#5850ec",
    onColor: "white",
  },
  links: {
    pricing: { href: "https://plausible.io/#pricing" },
  },
  price: {
    cost: "paid",
    renew: "yearly",
  },
})

export const Sanity = createService<"pricing">({
  brand: {
    name: "sanity",
    color: "#f03e2f",
    onColor: "white",
  },
  links: {
    pricing: { href: "https://www.sanity.io/pricing/compare" },
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

export const GoogleDomains = createService<"dashboard" | "payments">({
  brand: {
    name: "google domains",
    color: "#f8f9fa",
    onColor: "black",
  },
  links: {
    dashboard: { href: "https://domains.google.com/registrar/" },
    payments: { href: "https://domains.google.com/registrar/billing" },
  },
  price: {
    cost: "paid",
    renew: "yearly",
  },
})

export const GoogleSearchConsole = createService<"dashboard">({
  brand: {
    name: "google search console",
    color: "#455a64",
    onColor: "white",
  },
  price: {
    cost: "free",
  },
  links: {
    dashboard: { href: "https://search.google.com/search-console" },
  },
})

export const MicrosoftBingWebmasterTool = createService<"dashboard">({
  brand: {
    name: "microsoft bing webmaster tool",
    color: "#00809d",
    onColor: "white",
  },
  price: {
    cost: "free",
  },
  links: {
    dashboard: { href: "https://www.bing.com/webmasters" },
  },
})

export const Github = createService({
  brand: {
    name: "github",
    color: "#24292e",
    onColor: "white",
  },
  links: {},
  price: {
    cost: "free",
  },
})
