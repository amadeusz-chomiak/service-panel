import "@testing-library/jest-dom"
import { config } from "@vue/test-utils"
import { FocusTargetDirective } from "./src/directives/focusTarget"
config.global.directives = {
  "focus-target": FocusTargetDirective,
}
