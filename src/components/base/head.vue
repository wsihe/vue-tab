<template lang="pug">
  .navbar
    .navbar__logo
      a.logo(href='javascript:void(0)')
    .navbar__collapse
      .navbar__search
        wu-input(placeholder="请输入组件编号或组件名称" icon="search")
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        userName: '',
        userId: '',
        showMenu: false
      }
    },
    created () {
    },
    mounted () {
      // 获取用户信息
//      this.getUserInfo().then(() => {
//        this.userName = this.userInfo.userName
//        this.userId = this.userInfo.userId
//      })
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      ...mapMutations([
        'RECORD_LOGOUT'
      ]),
      focus (focused) {
        this.showMenu = focused === true || focused === 1
      },
      logout () {
        this.RECORD_LOGOUT()
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .navbar
    padding 0 20px
    &__logo
      float left
      height auto
      padding 2px 0 0
      .logo
        display block
        width 415px
        height 46px
        background url("../../assets/logo_vue.png") no-repeat
        background-size 60%
    &__search
      float right
      margin-top 15px
      width 220px
    .navbar-nav
      position relative
      float right
      .login-user
        display block
        margin-left 5px
        padding 21px 20px
        &.active
          background #E5E9F2
</style>
