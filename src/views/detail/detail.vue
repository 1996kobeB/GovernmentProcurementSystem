<template>
  <div>
    <div v-html="html" />
  </div>
</template>
<script>
import { getAction } from "@/api/index.js";
export default {
  data () {
    return {
      html: "",
    };
  },
  created () {
    this.getById(this.$route.query.id);
  },
  methods: {
    getById (id) {
      getAction("/apiGet", { id }).then((res) => {
        if (res.data.code === "200" && res.data.data) {
          this.html = res.data.data.projectDetail;
        }
      });
    },
  },
};
</script>
