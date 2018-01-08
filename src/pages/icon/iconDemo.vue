<template lang="pug">
  .page.page-icon
    icon-svg(name="customer")
</template>

<script>
  export default {
    name: 'iconDemo',
    data () {
      return {
        tableData: []
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../css/define'
  .page-icon
    display block
</style>
