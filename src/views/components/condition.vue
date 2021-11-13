<template>
	<div id="condition" class="clearfix">
		<span class="title">已选条件：</span>
		<a-tag
			v-for="(value, key, tagIndex) in conditionData"
			:key="tagIndex"
			:visible="
				(conditionData.startTime === undefined || key !== 'startTime') &&
				(conditionData.pageSize === undefined || key !== 'pageSize') &&
				(conditionData.pageNum === undefined || key !== 'pageNum')
			"
		>
			{{ value }}
		</a-tag>
		<a-button v-if="show" type="primary" size="small" @click="reset">
			重置
		</a-button>
	</div>
</template>
<script>
export default {
  props: { conditionData: { type: Object, default: () => { return {} } } },
  data () {
    return {
      show: false
    }
  },
  watch: {
    conditionData: {
      handler: function (val) {
        Object.keys(val).length === 0 ? this.show = false : this.show = true
      },
      deep: true
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
<style lang="less" scoped>
div#condition {
	margin-top: 5px;
	.title {
		margin-right: 10px;
		font-weight: bolder;
	}
	.ant-tag {
		font-size: 14px;
		background: #4f94cd;
		color: white;
		line-height: 24px;
		border-radius: 4px;
		text-align: center;
	}
}
.ant-btn {
	background-color: grey;
	border: none;
	transition: none;
	&:hover {
		background-color: red;
	}
	&:active {
		background-color: none;
	}
}
</style>
