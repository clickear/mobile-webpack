<template>
  <template v-if="!readonly">

<!--     <div class="edit-content">
      <div class="txt-con">
          <span class="r">*</span>
          <textarea class="text-area" placeholder="请假原因" length="200"></textarea>
          <span class="num"><i>0</i>/200</span>
      </div>
    </div>
 -->
    <div class="nd-edit-content">
      <div class="nd-txt-title" >测试</div>
      <div class="nd-txt-con">
          <textarea
            class="nd-text-area"
            :class="{showcount:(showCounter && max)}"
            :autocomplete="autocomplete"
            :autocapitalize="autocapitalize"
            :autocorrect="autocorrect"
            :spellcheck="spellcheck"
            :placeholder="placeholder"
            :readonly="readonly"
            :name="name"
            v-model="value"
            :style="textareaStyle"
            :maxlength="max" v-el:textarea></textarea>
          <span class="nd-num" v-show="showCounter && max" ><i>{{count}}</i>/{{max}}</span>
      </div>
      <div></div>
    </div>

<!-- 
      <div class="weui_cells" :class="{'vux_no_group_title':!areatext}" style="margin-top:0;margin-bottom:15px;">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <div style="font-size: 14px;" v-html="areatext"></div>
            <textarea
            class="nd_text_area"
            style="border:inhirent"
            :autocomplete="autocomplete"
            :autocapitalize="autocapitalize"
            :autocorrect="autocorrect"
            :spellcheck="spellcheck"
            :placeholder="placeholder"
            :readonly="readonly"
            :name="name"
            v-model="value"
            :style="textareaStyle"
            :maxlength="max" v-el:textarea></textarea>
            <div class="weui_textarea_counter" v-show="showCounter && max"><span>{{count}}</span>/{{max}}</div>
          </div>
    </div> -->
  </template>
</template>

<script>

import calcTextareaHeight from '../../utils/calcTextareaHeight';

export default {
  props: {
    showCounter: {
      type: Boolean,
      default: true
    },
    max: Number,
    value: {
      type: String,
      default: ''
    },
    name: String,
    placeholder: String,
    readonly: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 1
    },
    cols: {
      type: Number,
      default: 0
    },
    height: Number,
    autosize: {
      type: Boolean,
      default: true 
    },

    areatext:{
      type:String,
      default:''
    },

    // https://github.com/yisibl/blog/issues/3
    autocomplete: 'off',
    autocapitalize: 'off',
    autocorrect: 'off',
    required:false,
    spellcheck: 'false'
  },
  data(){
    return {
      textareaStyle: {}
    }
  },
  watch: {
    value (newVal) {
      if (this.max && this.value.length > this.max) {
        this.value = newVal.slice(0, this.max)
      }

      this.$nextTick(() => {
          this.resizeTextarea();
      });

      this.$emit('on-change', this.value)
    }
  },
  methods:{
    resizeTextarea(){
      const autosize = this.autosize;
      if(!autosize) return false;
      const minRows = this.rows;
      const maxRows = this.cols;
      this.textareaStyle = calcTextareaHeight(this.$els.textarea,3,10);
    }
  },
  computed: {
    count () {
      let len = 0
      if (this.value) {
        len = this.value.replace(/\n/g, 'aa').length
      }
      return len > this.max ? this.max : len
    },
    showName(){
      if(this.required){
        return this.placeholder 
      }
    }
  },
  ready(){
    this.resizeTextarea();
  }
}
</script>

<style lang="scss">


.nd-edit-content{
    background-color: #fff;
    margin-bottom: 14px;
    border-bottom: 1px solid #eee;
}

.nd-txt-title{
  font-size: 16px;
  margin-left:24px;
}

.nd-txt-con{
  position: relative;
  margin-left:5px;
}

.nd-text-area{
    width: 100%;
    margin-bottom:0px;
    padding: 8px 14px 8px 20px;
    height: 85px;
    border: 0;
    font-size: 15px;
    resize: none;  
}

.showcount{
     margin-bottom: 26px;
}

.nd-edit-content .nd-txt-con .nd-num{
    position: absolute;
    bottom: 8px;
    right: 14px;
    color: rgba(0, 0, 0, 0.3);
}

.nd-edit-content .nd-txt-con .nd-num i{
    color: rgba(0, 0, 0, 0.6);
    font-style: normal;
    font-size: 14px;
}
</style>
