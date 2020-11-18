import * as service from "../global/serviceDefinitions"
import { Price } from "../definitionGeneratorPrice"

const price = new Price({
  cost: {
    free: "darmowa",
    paid: "płatna",
    flexible: "darmowa w limicie, potem płatna",
  },
  renew: {
    never: "jednorazowo",
    onDemand: "na zlecenie",
    daily: "co dziennie",
    weekly: "co tydzień",
    monthly: "co miesiąc",
    quarterly: "co kwartał",
    yearly: "co rok",
  },
  compose({ renew, cost }) {
    if (renew) {
      return `Usługa ${cost} ${renew}`
    }
    return cost
  },
})

export const firebase = service
  .Firebase({
    brand: {
      description:
        "Stworzony przez Google, wielozadaniowy serwer, zapewnia hosting, bazę danych, analitykę i wiele więcej",
    },
    price: {
      localize: price,
    },
  })
  .links("initialize", "dashboard", {
    title: "panel kontrolny",
    description: "dowiesz się o wszystkich aspektach usługi (wymaga logowania)",
  })
  .links("initialize", "pricing", {
    title: "cennik",
    description: "dowiesz się o aktualnych cenach",
  })

export const plausible = service
  .Plausible({
    brand: {
      description: "Prosta i przyjazna RODO, analityka",
    },
    price: {
      localize: price,
    },
  })
  .links("initialize", "pricing", {
    title: "cennik",
    description: "dowiesz się o aktualnych cenach",
  })

export const sanity = service
  .Sanity({
    brand: {
      description: "System CMS dzięki któremu z łatwością zmienisz treść strony",
    },
    price: {
      localize: price,
    },
  })
  .links("initialize", "pricing", {
    title: "cennik",
    description: "Dowiesz się o aktualnych cenach",
  })

  export const developer = service
  .Developer({
    brand: {
      name: "Amadeusz Chomiak",
      description: "Stwórzmy Twoją część internetu! Jeśli potrzebujesz pomocy, napisz do mnie",
    },
    price: {
      localize: price,
    },
  })
  
