import {
  Renderer,
  RendererInterfaceOptions,
} from "./definitionGeneratorRenderer"

const mockInterface: RendererInterfaceOptions = {
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
    //* skip to the main content link for keyboard users
    skipToMain: {
      title: "skip to the main content",
    },
  },
  controls: {
    //* Controls section heading for a11y only
    title: "Controls",
    //* new version available button
    versionControl: {
      tooltip: "switch to a new version",
    },
    //* change color scheme button aria-label for a11y only
    colorScheme: {
      buttonLabel: {
        changeToDarkMode: "change to the dark theme",
        changeToLightMode: "change to the light theme",
      },
    },
    //* change mobile navigation toggle button aria-label for a11y only
    navigation: { buttonLabel: "navigation menu" },
  },
}

describe("definitions/definitionGeneratorRenderer.ts", () => {
  it("export object with interface and categories", () => {
    const renderer = new Renderer(mockInterface)
    expect(renderer.export().categories).toBeTruthy()
    expect(renderer.export().interface).toBeTruthy()
  })

  it("export interface with direct copy of interface passed to it", () => {
    const renderer = new Renderer(mockInterface)
    expect(renderer.export().interface).toStrictEqual(mockInterface)
  })

  it("allow to change the interface", () => {
    const renderer = new Renderer(mockInterface)
    const interfaceChange = {
      header: {
        title: "title",
      },
    }
    renderer.interface(interfaceChange)
    const interfaceExpected = {
      ...mockInterface,
      ...{
        header: {
          ...interfaceChange.header,
          link: {
            title: "amadeo.dev",
            href: "https://amadeo.dev",
          },

          skipToMain: {
            title: "skip to the main content",
          },
        },
      },
    }
    expect(renderer.export().interface).toStrictEqual(interfaceExpected)
  })
})
