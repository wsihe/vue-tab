<template>
  <svg class="icon" :class="iconClass">
    <!--<use :xlink:href="Icons[name]"></use>-->
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  import Icons from 'assets/icons-svg'

  export default {
    name: 'icon-svg',
    props: {
      name: {
        type: String,
        required: true,
        default: '',
        validator (val) {
          return Icons[val]
        }
      }
    },
    data () {
      return {
        Icons: Icons,
        iconClass: `icon-${this.name}`
      }
    },
    computed: {
      iconName () {
        return `#icon-${this.name}`
      },
      svgClass () {
        if (this.name) {
          return `svg-icon-${this.name}`
        } else {
          return 'svg-icon'
        }
      }
    }
  }
</script>
