import { createStore } from "vuex";
import Purchase from "./modules/purchase";
export default createStore({
	modules: {
		Purchase,
	},
});
