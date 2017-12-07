<template lang="pug">
  .page
    h2 Select
    .demo-content
      wu-select(v-model="value4" placeholder="搜索城市...", showSearch, remote, :remote-method="remoteMethod", :loading="loading")
        wu-option(:value="item.value", :label="item.value", :key="index", v-for="(item, index) in options")
 </template>

<script>
  export default {
    data () {
      return {
        value: '',
        value1: '北京',
        value2: '广州',
        value3: '',
        value4: '',
        loading: false,
        components: [],
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        options: []
      }
    },
    watch: {
    },
    methods: {
      remoteMethod (val) {
        if (val !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            const list = this.cityList.map(item => {
              return {
                value: item.value,
                label: item.value
              }
            })
            this.options = list.filter(item => item.label.toLowerCase().indexOf(val.toLowerCase()) > -1)
          }, 1000)
        } else {
          this.options = []
        }
      }
    }
  }
</script>

<style lang="stylus">
  .demo-content .wu-select
    width 200px
</style>

