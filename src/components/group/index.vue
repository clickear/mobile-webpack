<template>
  <div>
    <div class="weui_cells_title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <div class="weui_cells" :class="{'vux-no-group-title':!title}" :style="{marginTop: gutter}">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: String
  }
}
</script>

<style>

.weui_cells_title {
    margin-top: .77em;
    margin-bottom: .3em;
    padding-left: 15px;
    padding-right: 15px;
    color: #888;
    font-size: 14px;
}
.weui_cells{
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}



</style>
