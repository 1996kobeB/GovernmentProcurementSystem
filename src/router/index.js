import { createRouter, createWebHashHistory } from "vue-router";
import index from "../views/index.vue";
import detail from "./modules/detail";
const routes = [
	{
		path: "/",
		name: "index",
		component: index,
	},
	//...detail,
];

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
});

export default router;
