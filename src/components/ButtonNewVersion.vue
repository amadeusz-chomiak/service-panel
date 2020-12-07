<template>
  <base-tooltip
    :show="showTooltip"
    :right="tooltipRight"
    text="Switch to new version"
    :timeout="5000"
    @close="showTooltip = false"
  >
    <button
      :disabled="skipping"
      class="button button-primary p-3 sm:p-4 overflow-hidden"
      @click.once="skipWaiting"
    >
      <base-icon
        class="h-5 text-white"
        :class="{ 'animate-elevator': skipping }"
        :icon="skipping ? 'downloading' : 'download'"
      />
    </button>
  </base-tooltip>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed } from "vue"
import { useVersionControl } from "@/composable/useVersionControl"
export default defineComponent({
  props: {
    tooltipRight: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { skipWaiting: skip, skipping } = useVersionControl()
    const showTooltip = ref(!skipping.value)

    const skipWaiting = () => {
      showTooltip.value = false
      skip()
    }

    return {
      skipWaiting,
      showTooltip,
      skipping,
    }
  },
})
</script>
