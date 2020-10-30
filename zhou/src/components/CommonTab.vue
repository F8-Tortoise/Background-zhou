<template>
  <div class="tabs">
    <el-tag
      :key="tag.name"
      size="small"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },

  methods: {
    ...mapMutations({
      close: "closeTab"
    }),
    handleClose(tag, index) {
      let length = this.tags.length - 1;
      this.close(tag);
      // 如果关闭的标签不是当前路由的话就不跳转‘
      if (tag.mame !== this.$route.name) {
        return;
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$route.push({ name: this.tags[index - 1].name });
      } else {
        // 否则继续向右边跳转
        this.$route.push({ name: this.tags[index].name });
      }
    },
    changeMenu(item) {
      // 通过名称进行路由跳转
      this.$router.push({ name: item.name });
      // 与其他页面进行联动
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
