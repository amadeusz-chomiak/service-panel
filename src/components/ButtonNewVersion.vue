<template>
  <base-tooltip
    :show="tooltipShow"
    :right="tooltipRight"
    :text="tooltipText"
    :timeout="5000"
    @close="tooltipShow = false"
  >
    <template #default="slot">
      <button
        :aria-labelledby="slot ? slot.id : 'test-id'"
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
    </template>
  </base-tooltip>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed } from "vue"
import { useVersionControl } from "@/composable/useVersionControl"
import { useDefinitions } from "@/composable/useDefinitions"
export default defineComponent({
  props: {
    tooltipRight: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { skipWaiting: skip, skipping } = useVersionControl()
    const tooltipShow = ref(!skipping.value)

    const skipWaiting = () => {
      tooltipShow.value = false
      skip()
    }

    const { render } = useDefinitions()
    const tooltipText = computed(
      () => render.value.interface.controls.versionControl.tooltip,
    )

    return {
      skipWaiting,
      tooltipShow,
      tooltipText,
      skipping,
    }
  },
})
</script>
