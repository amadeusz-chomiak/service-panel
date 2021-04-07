<template>
  <div class="relative">
    <transition-fade>
      <div
        v-show="show"
        class="absolute cursor-pointer after-arrow after-arrow-primary-700 dark:after-arrow-primary-600 bottom-full shadow-sm mb-3 rounded-full px-4 py-2 bg-primary-700 dark:bg-primary-600"
        :class="tooltipClasses"
        data-testid="tooltip"
        @click="closeTooltip"
      >
        <p :id="id" class="text-white first-letter:uppercase whitespace-nowrap">
          {{ text }}
        </p>
      </div>
    </transition-fade>
    <slot :id="id" />
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed, watch } from "vue"
import { useId } from "@/composable/useId"

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
    },
    right: {
      type: Boolean,
    },
    timeout: {
      type: Number,
      default: 0,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const tooltipClasses = computed(() =>
      props.right
        ? ["right-0", "after-arrow-right"]
        : ["left-0", "after-arrow-left"]
    )

    const closeTooltip = () => emit("close")
    let timeout: NodeJS.Timeout
    watch(
      () => props.show,
      show => {
        if (show) {
          if (props.timeout) timeout = setTimeout(closeTooltip, props.timeout)
        } else if (timeout) clearTimeout(timeout)
      },
      {
        immediate: true,
      }
    )

    const { id } = useId()

    return { tooltipClasses, closeTooltip, id }
  },
})
</script>
