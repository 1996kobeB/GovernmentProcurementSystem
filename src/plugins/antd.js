import { app } from "@/plugins/app";
import {
	Button,
	Input,
	Form,
	Alert,
	message,
	Table,
	Tag,
	Layout,
	ConfigProvider,
} from "ant-design-vue";

import "@/assets/styles/antd.less";
console.log(app);
app
	.use(Button)
	.use(Input)
	.use(Form)
	.use(Alert)
	.use(message)
	.use(Table)
	.use(Tag)
	.use(Layout)
	.use(ConfigProvider);
