<template lang="pug">
  svg(version="1.1", class="gf-icon", :role="label ? 'img' : 'presentation'", :aria-label="label", :width="width", :height="height", :viewBox="box", :style="style", v-html="icon.xml")
</template>

<script>
  import { ICON_SVG_PARSER_REG } from '@/utils/regular'
  export default {
    name: 'GfIcon',
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: [Number, String],
        default: 10
      },
      label: String
    },
    data () {
      return {
        xml: null
      }
    },
    async created () {
      this.xml = await import(/* webpackMode: 'lazy-once', webpackChunkName: 'icon-svg' */ '@/assets/icons/' + this.name + '.svg')
    },
    computed: {
      baseSize () {
        let size = this.size
        size = typeof size === 'undefined' ? 1 : Number(size)
        if (isNaN(size) || size <= 0) {
          return 1
        }
        return size
      },
      icon  () {
        if (!this.xml) {
          return {
            width: 0,
            height: 0,
            xml: ''
          }
        }
        let res = this.xml.match(ICON_SVG_PARSER_REG)
        if (!res) {
          throw new Error('SVG 格式不正确')
        }
        let viewBox = res[1].split(' ')
        return {
          width: viewBox[2] || 0,
          height: viewBox[3] || 0,
          xml: res[2]
        }
      },
      box () {
        return `0 0 ${this.icon.width} ${this.icon.height}`
      },
      width () {
        return 1 * this.baseSize
      },
      height () {
        return 1 * this.baseSize
      },
      style () {
        if (this.baseSize === 1) {
          return false
        }
        return {
          fontSize: this.baseSize + 'px'
        }
      }
    },
    watch: {
      async name (val) {
        this.xml = await import(/* webpackMode: 'lazy-once', webpackChunkName: 'icon-svg' */ '@/assets/icons/' + this.name + '.svg')
      }
    }
  }
</script>

<style lang="stylus">
  .gf-icon
    display inline-block
    fill currentColor
</style>
