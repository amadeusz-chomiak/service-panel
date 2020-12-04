import { computed, ref, readonly } from "vue"

type SkipWaiting = () => Promise<void>
const skipWaiting = ref<SkipWaiting>()
 
export const useVersionControl = () => {
  const setSkipWaiting = (to?: SkipWaiting) => {
    skipWaiting.value = to
  }
  const serviceWorkerWaiting = computed(()=> !!skipWaiting.value)

  return {
    setSkipWaiting,
    skipWaiting,
    serviceWorkerWaiting: serviceWorkerWaiting,
  }
}
