<template>
	<a-layout>
		<a-layout-header>
			<span>{{ title }}</span>
		</a-layout-header>
		<a-layout-content>
			<div id="search" class="clearfix">
				<Selector
					label="选择地区："
					:source-data="area"
					@selectedType="selectedArea"
					@selectedChild="selectedAreaChild"
				/>
				<!-- <Selector
					label="信息类型："
					:source-data="msg"
					@selectedType="selectedMsg"
					@selectedChild="selectedMsgChild"
				/> -->
				<Selector
					label="选择时间："
					:source-data="time"
					@selectedType="selectedTime"
				/>
				<Condition :condition-data="queryParams" @reset="reset" />
			</div>
			<a-table
				id="table"
				:columns="columns"
				:data-source="dataSource"
				:pagination="pagination"
				:loading="loading"
				:row-key="
					(record, index) => {
						return index;
					}
				"
			>
				<template #projectTitle="{ text, record }">
					<a @click="handleJump(record)">{{ text }}</a>
				</template>
			</a-table>
		</a-layout-content>
	</a-layout>
</template>
<script>
	import Selector from "./components/selector.vue";
	import Condition from "./components/condition.vue";
	import { postAction } from "@/api/index.js";
	import { area, msg } from "./dataList.js";
	import dayjs from "dayjs";

	export default {
		components: { Selector, Condition },
		data () {
			return {
				title: "政府采购数据展示系统",
				area,
				msg,
				queryParams: {},
				time: ["不限", "近一周", "近一个月", "近三个月", "近半年", "近一年"],
				loading: false,
				dataSource: [],
				pagination: {
					defaultCurrent: 1,
					pageSize: 30,
					pageSizeOptions: ["10", "20", "30", "40"],
					showSizeChanger: true,
					showQuickJumper: true,
					total: 0,
					style: {
						position: "relative",
						right: "50%",
						transform: "translate(50%)",
					},
					showTotal: (total, range) => {
						return range[0] + "-" + range[1] + " 共" + total + "条";
					},
				},
				columns: [
					{
						title: "序号",
						dataIndex: "id",
						align: "center",
						width: "150px",
						customRender: (t) => {
							return `${t.index + 1}`;
						},
					},
					{
						title: "日期",
						dataIndex: "time",
						ellipsis: true,
						align: "left",
						width: "150px",
					},
					{
						title: "地区",
						dataIndex: "areaName",
						align: "left",
						width: "150px",
						ellipsis: true,
					},
					{
						title: "招标采购标题",
						dataIndex: "projectTitle",
						align: "left",
						ellipsis: true,
						slots: { customRender: "projectTitle" },
					},
				],
			};
		},
		watch: {
			queryParams: {
				handler: function (val) {
					this.loadData();
				},
				deep: true,
			},
		},
		async created () {
			await this.loadData();
			// 获取下拉子项
			this.renderChild(this.area, this.dataSource, "areaName", "address");
			this.renderChild(
				this.msg,
				this.dataSource,
				"projectType",
				"procurementType"
			);
		},
		methods: {
			async loadData () {
				this.loading = true;
				const params = this.getParmas();
				await postAction("/post/area", params).then((res) => {
					if (res.status === 200) {
						// 渲染列表
						this.dataSource = res.data;
						console.log(this.dataSource);
					}
				});
				this.loading = false;
			},
			selectedArea (item) {
				Reflect.set(this.queryParams, "areaName", item.type);
				if (item.type === "全国")
					Reflect.deleteProperty(this.queryParams, "areaName");
				Reflect.deleteProperty(this.queryParams, "address");
			},
			selectedAreaChild (item) {
				Reflect.set(this.queryParams, "address", item);
				// Reflect.deleteProperty(this.queryParams, "areaName");
			},
			selectedMsg (item) {
				Reflect.set(this.queryParams, "projectType", item.type);
				if (item.type === "全部")
					Reflect.deleteProperty(this.queryParams, "projectType");
				Reflect.deleteProperty(this.queryParams, "procurementType");
			},
			selectedMsgChild (item) {
				Reflect.set(this.queryParams, "procurementType", item);
				Reflect.deleteProperty(this.queryParams, "projectType");
			},
			selectedTime (item) {
				Reflect.set(this.queryParams, "timeChoose", item);
				let time;
				switch (item) {
					case "近一周":
						time = this.timeCount(1, "week");
						break;
					case "近一个月":
						time = this.timeCount(1, "month");
						break;
					case "近三个月":
						time = this.timeCount(3, "month");
						break;
					case "近半年":
						time = this.timeCount(6, "month");
						break;
					case "近一年":
						time = this.timeCount(1, "year");
						break;
					default:
				}
				Reflect.set(this.queryParams, "startTime", time);
				if (item === "不限") {
					Reflect.deleteProperty(this.queryParams, "startTime");
					Reflect.deleteProperty(this.queryParams, "timeChoose");
				}
			},
			// 获取post的参数
			getParmas () {
				const params = JSON.parse(JSON.stringify(this.queryParams));
				// params.pageSize = this.pagination.pageSize;
				// params.pageNum = this.pagination.defaultCurrent;
				Reflect.deleteProperty(params, "timeChoose");
				return params;
			},
			// 重置
			reset () {
				this.queryParams = {};
				this.loadData();
				this.$store.commit("Purchase/reset");
			},
			// obj是用于渲染的对象，data是后端传来的数据对象，根据父选项typeField，将子选项childField的值存入obj并渲染
			renderChild (obj, data, typeField, childField) {
				for (const i in data) {
					for (const j in obj) {
						if (
							data[i][typeField] === obj[j].type &&
							data[i][childField] &&
							obj[j].child.indexOf(data[i][childField]) === -1
						) {
							obj[j].child.push(data[i][childField]);
						}
					}
				}
			},
			// 计算开始时间
			timeCount (long, feature) {
				const now = dayjs();
				let time = now.subtract(long, feature);
				time = `${Number(time.$y)}-${Number(time.$M + 1)}-${Number(time.$D)}`;
				time = dayjs(time).format("YYYY-MM-DD");
				return time;
			},
			// 跳转至详情页
			handleJump (recored) {
        console.log(recored)
				// const routeData = this.$router.resolve({
				// 	path: "/detail",
				// 	query: {
				// 		id,
				// 	},
				// });
				window.open(recored.projectUrl, "_blank");
			},
		},
	};
</script>
<style lang="less" scoped>
.clearfix {
	content: "";
	clear: both;
	display: block;
}
.ant-layout {
	background: white;
}
.ant-layout-header {
	width: 100%;
	background: white;
	text-align: center;
	margin: 10px 0;
	position: relative;
	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: black;
		letter-spacing: 5px;
		font-size: 32px;
		font-weight: bold;
	}
}
.ant-layout-content {
	background: white;
	width: 1100px;
	margin: 0 auto;
	div#search {
		width: 100%;
		border: #ddd 1px solid;
		border-radius: 4px;
		margin: 0 auto;
		padding: 20px;
		margin-bottom: 20px;
	}
}
</style>
