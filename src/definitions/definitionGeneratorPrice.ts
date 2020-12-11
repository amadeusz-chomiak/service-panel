interface CostTranslation {
  /**
   * @description Always paid, without a free tier, may have a free trial
   */
  paid: string
  /**
   * @description Always free ex. open source
   */
  free: string
  /**
   * @description Flexible pricing with a free tier
   */
  flexible: string
}

interface RenewTranslation {
  /**
   * @description One time payment
   */
  never: string
  /**
   * @description Payment without automatic renewal
   */
  onDemand: string
  daily: string
  weekly: string
  monthly: string
  quarterly: string
  yearly: string
}

interface PriceOptionsBasic {
  cost: keyof CostTranslation
  renew: keyof RenewTranslation
}

export type PriceOptions =
  | PriceOptionsBasic
  | {
      cost: "free"
    }

export interface PriceOptionsLocalizeBasic extends Partial<PriceOptionsBasic> {
  localize: Price
}

export type PriceOptionsLocalize =
  | Required<PriceOptionsLocalizeBasic>
  | {
      cost: "free"
      localize: Price
    }

interface PriceOptionsTranslate {
  cost: string
  renew: string
}

export class Price {
  public readonly translate: {
    cost: (key: keyof CostTranslation) => string
    renew: (key: keyof RenewTranslation) => string
  }
  
  public readonly compose: (price: PriceOptions) => string
  
  constructor(translation: {
    cost: CostTranslation
    renew: RenewTranslation
    compose: (
      price: PriceOptionsTranslate,
      originalPrice: PartialOptionally<PriceOptionsBasic, 'renew'>
    ) => string
  }) {
    this.translate = {
      cost: key => translation.cost[key],
      renew: key => translation.renew[key],
    }

    this.compose = price => {
      if (price.cost === "free")
        return translation.compose(
          {
            cost: this.translate.cost(price.cost),
            renew: '',
          },
          {
            cost: price.cost,
          }
        )

      return translation.compose(
        {
          cost: this.translate.cost(price.cost),
          renew: this.translate.renew(price.renew),
        },
        {
          cost: price.cost,
          renew: price.renew,
        }
      )
    }
  }
}
