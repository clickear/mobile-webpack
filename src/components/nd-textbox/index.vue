<template>
  <template v-if="!readonly">
    <div class="nd-edit-content" :class="{'nd-error':!isValid}">
      <div class="nd-txt-title" >{{areatext}}<span v-show="required" style="color:red"> (必填) </div>
      <div class="nd-txt-con">
          <textarea
            class="nd-text-area"
            :class="{'nd-showcount':(showCounter && max)}"
            :autocomplete="autocomplete"
            :autocapitalize="autocapitalize"
            :autocorrect="autocorrect"
            :spellcheck="spellcheck"
            :placeholder="placeholder"
            :readonly="readonly"
            :name="name"
            v-model="value"
            :required="required"
            :style="textareaStyle"
            :maxlength="max"
            v-el:textarea></textarea>
          <span class="nd-num" v-show="showCounter && max" ><i>{{count}}</i>/{{max}}</span>
          <span class="nd-txt-error" v-show=" !isValid " style="" >{{firstError}}</span>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="nd-receipt-header">
      <div class="nd-receipt-txt">
        <p class="nd-lab">请假理由：</p>
        <h3>{{value}}</h3>
      </div>
    </div>
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
    readonly: {
      type: Boolean,
      default: true
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
    required:{
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
    spellcheck: 'false'
  },
  data(){
    return {
      compType:'textbox',
      textareaStyle: {},
      errorMsg:'',
      isError:false,
      firstError:'',
      isValid:true 
    }
  },
  watch: {
    value (newVal) {
      // if (this.max && this.value.length > this.max) {
      //   this.value = newVal.slice(0, this.max)
      // }
      this.$nextTick(() => {
        this.resizeTextarea();
      });

      // if(this.value != newVal){
        this.validValue();
      // }


      if (this.max && this.value.length > this.max) {
        this.value = newVal.slice(0, this.max)
      }
      this.$emit('on-change', this.value)
    },
    isValid () {
      this.getError()
    }
  },
  methods:{
    getValue(){
      return this.value;
    },
    resizeTextarea(){
      const autosize = this.autosize;
      if(!autosize) return false;
      const minRows = this.rows;
      const maxRows = this.cols;
      if(this.$els.textarea){
        this.textareaStyle = calcTextareaHeight(this.$els.textarea,1,10);
      }

    },
    getError () {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
      if(this.$els.textarea){
        this.$els.textarea.focus()
      }
    },
    validValue(){
      this.errors = {};
      if (!this.value && !this.required) {
        this.isValid = true
        return
      }

      if (!this.value && this.required) {
        this.isValid = false
        this.errors.required = '请填写' + this.areatext;
        return
      }

      // const validator = validators[this.isType]
      // if (validator) {
      //   this.valid = validator[ 'fn' ](this.value)
      //   if (!this.valid) {
      //     this.errors.format = validator[ 'msg' ] + '格式不对哦~'
      //     return
      //   } else {
      //     delete this.errors.format
      //   }
      // }

      // if (this.min) {
      //   if (this.value.length < this.min) {
      //     this.errors.min = this.$interpolate('最少应该输入{{min}}个字符哦')
      //     this.valid = false
      //     this.getError()
      //     return
      //   } else {
      //     delete this.errors.min
      //   }
      // }

      if (this.max) {
        if (this.value.replace(/\n/g, 'aa').length > this.max) {
          this.errors.max = '最多可以输入{{max}}个字符哦';
          this.isValid = false
          this.forceShowError = true
          return
        } else {
          this.forceShowError = false
          delete this.errors.max
        }
      }
      this.isValid = true
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
    placeholder(){
      return '请输入'+ this.areatext +(this.max>0 ? '('+ this.max +'个字)':'')
    }
  },
  events:{
    'form-check': function valid(){
      //必填验证
      this.validValue();

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
    margin-bottom: 23px;
    border-bottom: 1px solid #eee;
}

.nd-txt-title{
  font-size: 13px;
  margin-left:24px;
}

.nd-txt-con{
  position: relative;
  margin-left:5px;
  margin-right:5px;
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

.nd-showcount {
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

.nd-error .nd-txt-con .nd-num ,
.nd-error .nd-txt-con .nd-num i{
  color:red;
}

.nd-txt-error{
  position:absolute;
  right:65px;
  color:red;
}


.nd-receipt-header {
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 7px;
}

.nd-receipt-txt{
  padding: 0 5px 14px;
}

.nd-lab{
    padding-top: 5px;
    height: 30px;
    line-height: 25px;
    color: #a0a0a0;
    font-size: 13px;
}

.nd-receipt-txt h3{
  font-size: 13px;
  color: #313131;
  line-height: 25px;
  font-weight: 400;
  margin-bottom: 6px;  
  word-break: break-word;
}

</style>
