/**
* @file   home.vue
* @author river
* @create 2017-05-16 13:44
*/

<template lang="pug">
  .page.page-home
      p (Vue2.0示例项目-多页签应用)
      p {{ totalAsset.name | match}}
</template>

<script>
  export default {
    name: 'assetView',
    data() {
      return {
        totalAsset: {
          name: 'json'
        }
      };
    },
    created() {
    },
    mounted () {
      this.$set(this.totalAsset, 'name', 'json2')
    },
    activated() {
    },
    methods: {
    },
  };
</script>

<style lang="stylus" scoped>
  @import '../css/define'
  .page-home
    display block
</style>
