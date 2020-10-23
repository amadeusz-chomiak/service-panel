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
import BaseText from "@/components/BaseText.vue"

//* create app
const app = createApp(App)
  
app.use(store)
app.use(router)

app.component('BaseCard', BaseCard)
app.component('BaseText', BaseText)

app.mount("#app")
