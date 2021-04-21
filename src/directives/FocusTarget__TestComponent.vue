<template>
  <!-- Test simple query -->
  <button id="test-id-1" v-focus-target="{ query: '#test-id-2' }"></button>
  <button></button>
  <button id="test-id-2" v-focus-target="{ query: '#test-id-1' }"></button>
  <button></button>

  <!-- Test disabled query -->
  <button
    id="test-id-3"
    v-focus-target="{ query: '#test-id-1', enable: false }"
  ></button>
  <button id="test-id-4"></button>

  <!-- Test back argument -->
  <button id="test-id-5"></button>
  <button id="test-id-6" v-focus-target:back="{ query: '#test-id-7' }"></button>
  <button id="test-id-7"></button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { FocusTargetDirective } from "./focusTarget"
export default defineComponent({
  directives: { "focus-target": FocusTargetDirective },
})
</script>
