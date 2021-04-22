<template>
  <button
    class="button button-primary p-3 sm:p-4 mr-1 sm:mr-3"
    data-testid="toggle-color-scheme"
    :aria-label="label"
    @click="setColorScheme(!isLight)"
  >
    <base-icon class="h-5 text-white" :icon="isLight ? 'sun' : 'moon'" />
  </button>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed } from "vue"
import { usePrefersColorScheme } from "@/composable/usePrefersColorScheme"
import { Render } from "@/composable/useDefinitions"

export default defineComponent({
  props: {
    render: {
      required: true,
      type: Object as () => Render,
    },
  },
  setup(props) {
    const { isLight, setColorScheme } = usePrefersColorScheme()
    const renderButtonLabels = computed(
      () => props.render.interface.controls.colorScheme.buttonLabel,
    )
    const label = computed(() =>
      isLight.value
        ? renderButtonLabels.value.changeToDarkMode
        : renderButtonLabels.value.changeToLightMode,
    )

    return { isLight, setColorScheme, label }
  },
})
</script>
