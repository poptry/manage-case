import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import router from "@/router/index.js";
if (process.env.NODE_ENV === "development") {
  require("./mock"); // 注意用 require()
}
const app = createApp(App);
app.use(router).use(Antd).mount("#app");
