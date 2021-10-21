<template>
  <div>
    <span>{{ label }} </span>
    <div class="quicklySearch">
      <ul class="clearfix">
        <li
          v-for="(item, index) in sourceData"
          :key="index"
        >
          <a
            href="javascript:void(0)"
            :class="[currentIndex === index ? select : '']"
            @click="selectType(item, index)"
          >{{ item.type || item }}</a>
        </li>
      </ul>
      <div
        v-if="show"
        id="child"
      >
        <ul class="clearfix">
          <li class="second-item">
            ▷
          </li>
          <li
            v-for="(itemChild, indexChild) in sourceData[currentIndex].child"
            :key="indexChild"
          >
            <a
              href="javascript:void(0)"
              :class="[childCurrentIndex === indexChild ? select : '']"
              @click="selectChild(itemChild, indexChild)"
            >{{ itemChild }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    label: { type: String, default: '请选择' },
    sourceData: { type: Array, default: () => { return [] } }
  },
  emits: ['selectedType', 'selectedChild'],
  data () {
    return {
      currentIndex: 0,
      childCurrentIndex: -1,
      select: 'select',
      show: false
    }
  },
  computed: {
    ...mapState({
      resetTag: state => state.Purchase.resetTag
    })
  },
  watch: {
    resetTag: {
      handler: function (val) {
        this.currentIndex = 0
        this.childCurrentIndex = -1
        this.show = false
        this.$store.commit('Purchase/initTag')
      },
      deep: true
    }
  },

  methods: {
    selectType (item, index) {
      this.currentIndex = index
      typeof item === 'object' && item.child.length !== 0 ? this.show = true : this.show = false
      this.childCurrentIndex = -1
      this.$emit('selectedType', item)
    },
    selectChild (itemChild, indexChild) {
      this.childCurrentIndex = indexChild
      this.$emit('selectedChild', itemChild)
    }
  }

}
</script>
<style lang="less" scoped>
.clearfix {
	content: "";
	clear: both;
	display: block;
}
span {
  float: left;
}
.quicklySearch {
float: left;
width: 93%;
	ul {
		margin-bottom: 0;
		margin-left: 10px;
		padding: 0;
		list-style: none;
		line-height: 24px;
		li {
			margin-bottom: 10px;
			float: left;
			line-height: 24px;
			overflow: hidden;
			a {
				font-size: 14px;
				color: #039;
				text-align: center;
				height: 24px;
				padding: 5px 8px;
				transition: none;
				&:hover {
					background: #4f94cd;
					border-radius: 6px;
					color: white;
				}
			}
		}
	}
  .select {
  background: #4f94cd;
	border-radius: 6px;
	color: white;
  }
}
#child {
	border: 1px solid #e7e7e7;
	width: 562px;
	line-height: 25px;
	margin-left: 10px;
	margin-bottom: 10px;
	ul {
		margin-bottom: 0;
		li {
			padding: 3px 0px;
			margin: 5px 5px;
		}
	}
}
</style>
