const detail = () =>
	import("@/views/detail/detail.vue" /* webpackChunkName: "demo" */);
console.log(detail);
export default [
	{
		path: "/detail",
		name: "detail",
		component: detail,
	},
];
