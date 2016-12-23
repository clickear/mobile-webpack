<template>
  <div class="weui_cell" :class="{'weui_cell_warn': !valid}">
    <div class="weui_cell_hd">
      <label class="weui_label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title">{{title}}</label>
      <!-- <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc> -->
    </div>
     <div class="weui_cell_bd weui_cell_primary">
          <input v-input-timeformat intSize="2" floatSize="23"
          class="weui_input"
          :autocomplete="autocomplete"
          :autocapitalize="autocapitalize"
          :autocorrect="autocorrect"
          :spellcheck="spellcheck"
          :style="inputStyle"
          :type="type"
          :name="name"
          :pattern="pattern"
          :placeholder="placeholder"
          :readonly="readonly"
          v-model="value"
          @blur="blur"
          v-on:keypress="isNumber(event)"
          v-on:input="isInput(event)"
          v-el:input/>
      </div>
       <div class="weui_cell_ft">  
         <icon type="clear" v-show="showClear && value && !readonly" @click="clear"></icon>
         <!--   <icon class="vux-input-icon-warn" type="warn" title="{{!valid ? firstError : ''}}" v-show="!equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"></icon>
          <icon class="vux-input-icon-warn" type="warn" v-show="hasLengthEqual && dirty && equalWith && !valid"></icon>
          <icon type="success" v-show="equalWith && equalWith===value && valid"></icon> -->
          <slot name="right"></slot>
        </div>
      </div>
  </div>
</template>

<script>

 import Icon from '../icon'
  module.exports = {
    created() {
      console.log('component a created !');
    },
    data(){
      return {
        focus:false
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      placeholder: String,
      value: [String, Number],
      name: String,
      readonly: {
        type: Boolean,
        default: false
      },
      keyboard: String,
      inlineDesc: String,
      isType: String,
      min: Number,
      max: Number,
      showClear: {
        type: Boolean,
        default: true
      },
      equalWith: String,
      type: {
        type: String,
        default: 'text'
      },
      textAlign: String,
      // https://github.com/yisibl/blog/issues/3
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      spellcheck: 'false'
    },
    methods: {
      blur(){
        
      },clear(){    
        this.value = '' 
        this.focus = true
        this.$els.input.focus()
      },isNumber(evt){
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      },isInput(){
        this.$Message.info(vali.toFloat(this.value))


      }
    },
    computed:{
      labelWidth(){
        return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1;
      }
    },
    watch:{
      focus (newVal) {
        if (newVal) {
          
        }
      }
    },
    components:{Icon}
  }
</script>

<style lang='scss'>
@import '../../style/weui/widget/weui-cell/weui-access.scss';
@import '../../style/weui/widget/weui-cell/weui-cell_global.scss';
@import '../../style/weui/widget/weui-cell/weui-form/weui-form_common.scss';
@import '../../style/weui/widget/weui-cell/weui-form/weui-vcode.scss';
.vux-input-icon-warn.weui_icon_warn:before {
  font-size: 21px;
} 
body{
  background-color: #fbf9fe;
}/*
.weui_cell {
  position: relative;
}
.weui_cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left: 15px;
}
.weui_cell:first-child:before {
  display: none;
}
.weui_cells {
  margin-top: 1.17647059em;
  background-color: #FFFFFF;
  line-height: 1.41176471;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}
.weui_cells:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
.weui_cells:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.weui_cells_title {
  margin-top: .77em;
  margin-bottom: .3em;
  padding-left: 15px;
  padding-right: 15px;
  color: #888;
  font-size: 14px;
}
.weui_cells_title + .weui_cells {
  margin-top: 0;
}
.weui_cells_tips {
  margin-top: .3em;
  color: #888;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.weui_cell {
  padding: 10px 15px;
  position: relative;
  display: flex;
  align-items: center;
}
.weui_cell_ft {
  text-align: right;
  color: #888;
}
.weui_cell_primary {
  flex: 1;
}
.weui_label {
  color: #000;
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
}
.weui_input {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 1.41176471em;
  line-height: 1.41176471;
}
.weui_input::-webkit-outer-spin-button,
.weui_input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.weui_textarea {
  display: block;
  border: 0;
  resize: none;
  width: 100%;
  color: inherit;
  font-size: 1em;
  line-height: inherit;
  outline: 0;
}
.weui_textarea_counter {
  color: #B2B2B2;
  text-align: right;
}
.weui_cell_warn .weui_textarea_counter {
  color: #E64340;
}
.weui_toptips {
  display: none;
  position: fixed;
  -webkit-transform: translateZ(0);
  width: 100%;
  top: 0;
  line-height: 2.3;
  font-size: 14px;
  text-align: center;
  color: #FFF;
  z-index: 50000;
}
.weui_toptips.weui_warn {
  background-color: #E64340;
}
.weui_cells_form .weui_cell_warn {
  color: #E64340;
}
.weui_cells_form .weui_cell_warn .weui_icon_warn {
  display: inline-block;
}
.weui_cells_form .weui_cell_ft {
  font-size: 0;
}
.weui_cells_form .weui_icon_warn {
  display: none;
}
.weui_cells_form input,
.weui_cells_form textarea,
.weui_cells_form label[for] {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.weui_cells_title {
  margin-top: .77em;
  margin-bottom: .3em;
  padding-left: 15px;
  padding-right: 15px;
  color: #888;
  font-size: 14px;
}
.weui_cells_title + .weui_cells{
      margin-top: 0;
}
.weui_cell_primary{
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.weui_label{
    color: #000;
    display: block;
    width: 105px;
    word-wrap: break-word;
    word-break: break-all;

}
.weui_input{
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
}

.weui_cell_ft{
      text-align: right;
    color: #888;
}*/
</style>


