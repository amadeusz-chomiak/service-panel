import { Renderer } from "../definitionGeneratorRenderer"

export const renderer = new Renderer({
  //* options for rendering application header
  header: {
    //* h1 tag title
    //? change title from .env file in the root of the project
    title: process.env.VUE_APP_SHORT_NAME || "services",
    //* link to Your website
    link: {
      title: "Go to website",
      href: "/",
    },
    //* skip to the main content link for keyboard users
    skipToMain: {
      title: "skip to the main content",
    },
  },
  controls: {
    //* Controls section heading for a11y only
    title: "controls",
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
})