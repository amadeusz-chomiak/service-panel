import { computed, ref, watch } from "vue"

type PrefersColorScheme = "light" | "dark"

const prefersColorScheme = ref<PrefersColorScheme>("light")

const isLight = computed(() => prefersColorScheme.value === "light")

const setColorScheme = (toLight: boolean) => {
  prefersColorScheme.value = toLight ? "light" : "dark"
}

const stateKey = "prefers-color-scheme"
const saveState = () => {
  if ("localStorage" in window)
    localStorage.setItem(stateKey, prefersColorScheme.value)
}
const loadState = () => {
  if ("localStorage" in window)
    return localStorage.getItem(stateKey) as PrefersColorScheme
}

const initializeFromPrefersColorScheme = () => {
  const localState = loadState()
  if (localState) {
    prefersColorScheme.value = localState
    return
  }

  if ("matchMedia" in window) {
    const matchPrefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    )

    prefersColorScheme.value = matchPrefersColorScheme.matches
      ? "dark"
      : "light"
  }
}

watch(isLight, isLight => {
  const root = document.documentElement
  const metaThemeColor = document.querySelector("head > meta[name='theme-color']")
  if (isLight) {
    root.classList.remove("dark")
    metaThemeColor?.setAttribute("content", "#b8cdea")
  } else {
    root.classList.add("dark")
    metaThemeColor?.setAttribute("content", "#011332")
  }
  saveState()
})

export const usePrefersColorScheme = () => ({
  isLight,
  setColorScheme,
  initializeFromPrefersColorScheme,
})
