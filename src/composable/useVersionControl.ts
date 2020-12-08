import { computed, ref, readonly } from "vue"

type SkipWaiting = () => Promise<void>
const skipServiceWorkerWaiting = ref<SkipWaiting>()
const skipping = ref(false)
 
export const useVersionControl = () => {
  const setSkipWaiting = (to?: SkipWaiting) => {
    skipServiceWorkerWaiting.value = to
  }
  const serviceWorkerWaiting = computed(()=> !!skipServiceWorkerWaiting.value)
  const skipWaiting = () => {
    skipping.value = true
    return skipServiceWorkerWaiting.value?.()
  }

  return {
    setSkipWaiting,
    skipWaiting,
    serviceWorkerWaiting: serviceWorkerWaiting,
    skipping: readonly(skipping)
  }
}
