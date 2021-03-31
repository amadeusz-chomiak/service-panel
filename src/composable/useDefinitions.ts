import { computed } from "vue"
import {
  Renderer,
  // Service as CreateService,
  // Category as CreateCategory,
} from "@/definitions/definitionGenerator"
import * as category from "@/definitions/en/categoryDefinitions"
import * as service from "@/definitions/en/serviceDefinitions"
// import { price } from "@/definitions/en/priceDefinition"

//* If You need to create custom Service follow this example
// const customService = new CreateService({
//   brand: {
//     //* name of service
//     name: "service name",
//     //* additional description to clarify service use case for non technical users
//     description: "service description",
//     //* color of buttons and brand circle
//     color: "#fff", //? use hex format without alpha chanel
//     //* color of text on buttons
//     onColor: "black", //? prefer to use "black" or "white" keyword
//   },
//   links: {}, //? in case of custom service it's easier to define links via links function
//   price: {
//     //* cost of service
//     cost: "paid",
//     //* how often Your client need to pay it
//     renew: "monthly",
//     //* price localization class
//     localize: price,
//   },
// }) //? add links array
//   .links(() => [
//   {
//     //* text on a button of link
//     title: "link text",
//     //* description of a button link
//     description: "link description",
//     //* href of link
//     href: "https://",
//   },
// ])

//* if You need to create custom category follow this example
// const customCategory = new CreateCategory({
//   //* name displayed in navigation
//   name: 'custom',
//   //* additional description to clarify name for non technical users
//   description: 'description'
// })

//* create renderer instance, that will render config object
const renderer = new Renderer({
  //* options for rendering application header
  header: {
    //* h1 tag title
    //? change title from .env file in the root of the project
    title: process.env.VUE_APP_SHORT_NAME || "services",
    //* link to Your website
    link: {
      title: "amadeo.dev",
      href: "https://amadeo.dev",
    },
    //* new version available button
    versionControl: {
      tooltip: "switch to a new version",
      buttonLabel: "switch to a new version",
    },
    colorScheme: {
      buttonLabel: {
        changeToDarkMode: "change to the dark theme",
        changeToLightMode: "change to the light theme",
      },
    },
  },
})

//? adding order does matter. It'll create display order in UI
//* add contentEditor category to renderer
renderer.add(
  //* add sanity CMS with default links to category
  category.contentEditor.add(service.sanity("default-links"))
)

//* add analytics category to renderer
renderer.add(
  category.analytic
    //* add plausible analytics with default links to category
    .add(service.plausible("default-links"))
)

//* add search engine category to renderer
renderer.add(
  category.searchEngine
    //* add google search console with customized default link to category
    .add(
      service.googleSearchConsole(({ initialize }) => [
        initialize("dashboard", {
          href: "https://yourDashboard",
        }),
      ])
    )
    //* add microsoft bing webmaster tool with customized default link to category
    .add(
      service.microsoftBingWebmasterTool(({ initialize }) => [
        initialize("dashboard", {
          href: "https://yourDashboard",
        }),
      ])
    )
)

//* add server category to renderer
renderer.add(
  category.server.add(
    //* add firebase with default links to category
    service.firebase("default-links")
  )
)

//* add development category to renderer
renderer.add(
  //* add developer with custom mailto link to category
  category.development
    .add(
      service
        .developer(() => [
          {
            title: "send",
            description: "send email to me at help@amadeo.dev",
            href: "mailto:help@amadeo.dev",
          },
        ])
        //? modify brand name
        .brand({ name: "Amadeusz Chomiak" })
    )
    //* add github with custom project link to category
    .add(
      service.github(() => [
        {
          title: "project",
          description:
            "Check how Your site looks under the hood (require login)",
          href: "https://",
        },
      ])
    )
)

//? export composition function
export const useDefinitions = () => {
  return {
    //? renderer exports JSON like config object, that will be used to render UI
    //? render value is computed if You need to get it asynchronously as JSON from api
    render: computed(() => renderer.export()),
  }
}

//* typescript types
export type Render = ReturnType<Renderer["export"]>
export type Category = Render["categories"][number]
export type Service = Category["services"][number]
