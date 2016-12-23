<template>
  <i class="{{className}}"></i>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    className () {
      return `weui-icon weui-icon-${this.type}`
    }
  }
}
</script>

<style lang="scss">


@import '../../style/weui/icon/weui-icon_font.scss';


.weui-icon-clear:before {
  color: #B2B2B2;
  font-size: 14px;
}
</style>
