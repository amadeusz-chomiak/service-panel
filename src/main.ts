import { createApp } from "vue"

//? import SW
import "./registerServiceWorker"

//? import CSS
import "@/assets/css/index.css"

//? import global plugins
import router from "./router"
import store from "./store"

//? import global components
import App from "./App.vue"
import BaseCard from "@/components/BaseCard.vue"
import BaseIcon from "@/components/BaseIcon.vue"
import BaseTooltip from "@/components/BaseTooltip.vue"

import TransitionFade from "@/components/TransitionFade.vue"
import { FocusTargetDirective } from './directives/focusTarget'

//* create app
const app = createApp(App)
  
app.use(store)
app.use(router)

app.component('base-card', BaseCard)
app.component('base-icon', BaseIcon)
app.component('base-tooltip', BaseTooltip)

app.component('transition-fade', TransitionFade)

app.directive('focus-target', FocusTargetDirective)

app.mount("#app")
