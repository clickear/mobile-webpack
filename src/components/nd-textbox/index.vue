<template>
  <div>
  <span>{{testCount}}</span>
    <template v-if="!displaymodel">
        <template v-if="multiple"> 
            <div class="nd-edit-content" :class="{'nd-error':!isValid}">
              <div class="nd-txt-title" >{{label}}<span v-if="unit">({{unit}})</span><span v-show="must" style="color:red"> (必填) </span></div>
                <div class="nd-txt-con">
                    <!-- maxlength 存在bug ，暂不使用 -->
                    <textarea
                      class="nd-text-area"
                      :id="id"
                      :class="{'nd-showcount':(lettercount && maxlen)}"        
                      :style="textareaStyle"
                      :name="name"
                      :must="must"
                      :placeholder="placeholder"
                      :readonly="readonly"
                      :displaymodel="displaymodel"
                      :min="min"
                      :autocomplete="autocomplete"
                      :autocapitalize="autocapitalize"
                      :autocorrect="autocorrect"
                      :spellcheck="spellcheck"

                      @input="$oninput"
                      @click="$onclick"
                      @focus="$onfocus"             
                      @blur="$onblur"
                      v-focus="isActive"
                      v-model="value"
                      >
                    </textarea>
                    <span class="nd-num" v-show="lettercount && maxlen" ><i>{{count}}</i>/{{maxlen}}</span>
                    <span class="nd-txt-error" v-show=" !isValid || !forceVlid " style="" >{{forceValidInfo || validInfo }}</span>
                </div>
              </dvi>
            </div>
        </template>
        <template v-else>
            <div class="nd-edit-content" :class="{'nd-error':!isValid}">
                <div class="nd-txt-title" >{{label}} <span v-if="unit">({{unit}})</span> <span v-show="must" style="color:red"> (必填) </span></div>
                <!-- input 组件不显示字数 -->
                <input
                      class="nd-text-area"
                      :id="id"         
                      :style="textareaStyle"
                      :name="name"
                      :must="must"

                      :placeholder="placeholder"
                      :readonly="readonly"

                      :displaymodel="displaymodel"

                      :min="min"
                      :autocomplete="autocomplete"
                      :autocapitalize="autocapitalize"
                      :autocorrect="autocorrect"
                      :spellcheck="spellcheck"

                      @input="$oninput"
                      @click="$onclick"
                      @focus="$onfocus"             
                      @blur="$onblur"
                      v-focus="isActive"
                      v-model="value"
                >
                <span class="nd-txt-error" v-show=" !isValid || !forceVlid " style="" >{{forceValidInfo || validInfo }}</span>
            </textarea>
            </div>
        </template>
    </template>
    <template v-else>
        <template v-if ="multiple">
          <div class="nd-receipt-header">
            <div class="nd-receipt-txt">
              <p class="nd-lab">{{label}}:</p>
              <h3>{{value}}</h3>
              <input type="hidden" :value="value">
            </div>
          </div>
        </template>
        <template v-else>
            <div class="nd-cell weui_select_after">
                <div class="weui_cell_hd nd-cell-primary">
                  <label class="nd-label">{{label}}:</label>
                 
                </div>
                <div class="nd-cell-right">{{value}}</div>
                <input type="hidden" :value="value">
            </div>
        </template>
    </template>
    </div>
</template>

<script>

import calcTextareaHeight from '../../utils/calcTextareaHeight';
import validate from '../../utils/validate'

export default {
    created(){
        // 为数字 代表必须的长度(会将覆盖maxlen)
        // if(typeof this.must == 'number'){
        //   this.max = this.must;
        // }
        // placeholder 默认值
        // if(!this.placeholder){
        //   this.placeholder = '请输入'+ this.label +(this.max>0 ? '('+ this.maxlen +'个字)':'')
        // }
        if(this.defaultvalue){
          this.value = this.defaultvalue;
        }

        // 将this.config 属性挂载在vm上    
        Object.assign(this,this.config);

        // this.$dispatch('FORWARD:OVERALL', {
        //     event: 'COMPONENT:TEXTBOX:CHANGE',
        //     data: {
        //       id: this.id,
        //       value: this.value
        //     }
        // });
    },
    props: {
    // 标签
    label: {
      type:String,
      default:''
    }, 
    defaultvalue:[null],
    id: String,
    name: String,
    classname: '', 
    placeholder: '',
    // 显示模式 
    displaymodel: {
      type: Boolean,
      default: false
    },
    // 是否多行文字，input和textarea切换
    multiple: {
      type: Boolean,
      default: false
    },
    // 数字统计
    lettercount: {
      type:Boolean,
      default: true,
    },
    // 单位
    unit:{
        type:String,
        default:''
    },

    max: Number,
    min: Number,

    width:[String,Number],
    height: [String,Number],
    labelwidth:[String,Number],
    autosize: {
        type: Boolean,
        default: true 
    },
    // 也可为数字 代表必须的长度(会将覆盖maxlen)
    must:{
      type: [Boolean,String,Number],
      default: true
    },
    // 最大长度
    maxlen:{
      type: [Number,String],
      default:0
    },
    readonly: {
      type: Boolean,
      default: false
    },
    // 校验规则
    valid:{
        type:[Boolean,String,Number],
        default:''
    },
    //默认配置项,从model中获取
    config:{
      type: Object,
    },
    // https://github.com/yisibl/blog/issues/3
    autocomplete: 'off',
    autocapitalize: 'off',
    autocorrect: 'off',
    spellcheck: 'false'

    },

    data(){
        return {
            // 焦点控制
            focalize:false,
            compType:'textbox',

            // 是否激活
            isActive:false,

            // 出错信息提示
            validInfo:'',

            // 定时隐藏消失
            forceVlid:true,
            forceValidInfo:'',

            isValid:true,

            textareaStyle: {},
            value:''
        }
    },
    watch: {
        value (newVal, oldVal) {
            // 是否超出限制
            let isLimitLen = false;
            if (this.maxlen && this.value.length > this.maxlen) {
                newVal = newVal.slice(0, this.maxlen)
                isLimitLen = true;
            }
            // 新的赋值，需要在nextTick中重复赋值，而不能直接赋值，具体原因未查。或者也可在oninput中赋值。
            this.$nextTick(() => {
                !isLimitLen || this.validValue();
                this.value = newVal;
                !isLimitLen || this.validValue();
                this.resizeTextarea();
            });

            this.$trigger({ newVal: newVal, oldVal: oldVal }, 'changeEvent');

            // this.$dispatch('FORWARD:OVERALL', {
            //     event: 'COMPONENT:TEXTBOX:CHANGE',
            //     data: {
            //       id: this.id,
            //       value: newVal
            //     }
            // });
        }
    },
    methods:{
        setValue(val){
            if(val != this.value){
                this.value = val;
                //this.validValue();
            }
        },
        getValue(){
          return this.value;
        },
        resizeTextarea(){
          const autosize = this.autosize;
          if(!autosize) return false;
          // 并且要为多选
          if(this.$refs.textarea && this.multiple){
            this.textareaStyle = calcTextareaHeight(this.$refs.textarea, 3, 10);
          }
        },
        setDisplaymodel( model ){
            this.displaymodel = model;
        },
        validValue(checkModel){
            let vm = this;
            var val = vm.getValue() || '';
            let validInfo = validate(val, vm.valid, vm.message, vm);
            let isValid = validInfo == '' ? true : false;

            if (isValid) {
                // 1秒后自动消失
                if (vm.maxlen && val.replace('/n','aa').length > vm.maxlen) {
                    vm.forceVlid = false;
                    vm.forceValidInfo = vm.label + '字数已达上限';

                    clearTimeout(this.click);

                    this.click = setTimeout(function(){
                        vm.forceVlid = true;
                        vm.forceValidInfo = '';
                    },1000);

                    return;
                }

                if (vm.must === true && (val == null || val == '')) {
                    isValid = false;
                    validInfo = '请填写' + vm.label;
                } else if (typeof vm.must == 'number' && val.length != vm.must) {
                    isValid = false;
                    validInfo = vm.label + '输入必须为' + vm.must +'个字';
                }  else if (vm.valid.indexOf('int') != -1 || vm.valid.indexOf('float') != -1 || vm.valid.indexOf('number') != -1) {
                    if (vm.max != '' && val > vm.max) {
                        isValid = false;
                        validInfo = vm.label + '超过限制'+ vm.max;
                    } else if (vm.min != '' && val < vm.min) {
                        isValid = false;
                        validInfo = vm.label + '最小输入' + vm.min;
                    }
                } 
            }
            if(!checkModel){
                vm.isValid = isValid;
                vm.validInfo = validInfo;
            }
            return isValid;
        },

        // 获取焦点
        focus(){
            let vm = this;

            vm.isActive = true;

            Vue.nextTick(function () {
                // var els = vm.$refs.textarea || vm.$refs.input;
                // els.focus();
            });
        },

        // 内部接口事件
        $trigger (ev, type) {
            if (typeof this[type] == 'function') {
               this[type].call(this, ev, this, 'text');
            } else if (typeof this[type] == 'string' && this[type] != '') {
               eval(this[type]);
            }
        },
        $onclick(ev){
            var vm = this;
            var els = vm.$refs.textarea || vm.$refs.input;
            this.isActive = false;
            this.isActive = true;
            // 如果为
            if(!vm.displaymodel && els){
              setTimeout(function(){ UtilHelper.mockScrollIntoView(els) },100)
            }
            this.$trigger(ev, 'clickEvent');
        },
        $oninput(ev){
            // if (this.maxlen && this.value.length > this.maxlen) {
            //     this.value = this.value.slice(0, this.maxlen);
            //     //this.$refs.textarea.value = this.value;
            // }
            this.$trigger(ev, 'inputvent');
        },
        $onfocus(ev){
            if (this.readonly) {
                return true;
            }
            this.isActive = true;
            this.$trigger(ev, 'focusEvent');
        },
        $onblur(ev){
            this.isActive = false;
            this.validValue();
            this.$trigger(ev, 'blurEvent'); 
        }
    },
    computed: {
        count () {
          let len = 0
          if (this.value) {
            len = this.value.replace(/\n/g, 'aa').length
          }
          return len > this.maxlen ? this.maxlen : len
        },
        testCount(){
          return  this.$store.state.testCount;
        }
    },
    mounted(){
      let vm = this;
      Vue.nextTick(function(){
        vm.resizeTextarea();
      });
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
  font-size: 15px;
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

.control-lab{
    padding-top: 5px;
    height: 30px;
    line-height: 25px;
    color: #a0a0a0;
    font-size: 13px;
}
.nd-textbox-container.displaymodel label{
    padding-top: 5px;
    padding-left:5px;
    height: 30px;
    line-height: 25px;
    color: #a0a0a0;
    font-size: 13px;
}
.nd-textbox-container.displaymodel span{
    padding-left:25px;
    display:block;
    font-size: 13px;
    color: #313131;
    line-height: 25px;
    font-weight: 400;
    margin-bottom: 6px;
    word-break: break-word;
}




</style>
