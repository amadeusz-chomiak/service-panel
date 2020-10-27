import { Service } from "../definitionGenerators"

export const firebase = new Service({
  brand: {
    name: "firebase",
    description: "Server provider that combines site hosting, database, authentication, analytics and more",
    color: "#FFA000",
    onColor: "black",
  },
  links: new Map([
    [
      "dashboard",
      {
        description: "You'll find there all parts firebase",
        href: "https://console.firebase.google.com/"
      },
    ],
    [
      "pricing",
      {
        description: "You'll find detailed pricing",
        href: "https://firebase.google.com/pricing"
      },
    ],
  ]),
})

export const plausible = new Service({
  brand: {
    name: "plausible",
    description: "Simple and privacy-friendly alternative to Google Analytics",
    color: "#5850ec",
    onColor: "white",
  },
  links: new Map([
    [
      "dashboard",
      {
        description: "You'll find there analytics summary",
        href: "" //* specify Your href to show it
      },
    ],
    [
      "pricing",
      {
        description: "You'll find detailed pricing",
        href: "https://plausible.io/#pricing"
      },
    ],
  ]),
})

export const sanity = new Service({
  brand: {
    name: "sanity",
    description: "Sanity is the ultimate content platform that helps teams dream big and deliver quickly",
    color: "#f03e2f",
    onColor: "white",
  },
  links: new Map([
    [
      "dashboard",
      {
        description: "You can change site content from here",
        href: "" //* specify Your href to show it
      },
    ],
    [
      "pricing",
      {
        description: "You'll find detailed pricing",
        href: "https://www.sanity.io/pricing/compare"
      },
    ],
  ]),
})

