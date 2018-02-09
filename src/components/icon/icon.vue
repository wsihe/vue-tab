<template lang="pug">
  svg(version="1.1", class="wu-icon", :role="label ? 'img' : 'presentation'", :aria-label="label", :width="width", :height="height", :viewBox="box", :style="style")
    use(:xlink:href="icon.id")
</template>

<script>
  export default {
    name: 'icon',
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
      this.xml = await import('@/assets/icons-svg/' + this.name + '.svg')
      console.log(this.xml)
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
            id: ''
          }
        }
        let viewBox = this.xml.default.viewBox.split(' ')
        return {
          width: viewBox[2] || 0,
          height: viewBox[3] || 0,
          id: '#' + this.xml.default.id
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
        this.xml = await import('@/assets/icons-svg/' + this.name + '.svg')
      }
    }
  }
</script>

<style lang="stylus">
  .wu-icon
    display inline-block
    fill currentColor
</style>
