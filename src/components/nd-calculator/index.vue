<template>
<div>
    <template v-if="!displaymodel">
        <div class="nd-calculator-container" :class="{'nd-error':!isValid}">
            <div class="nd-title" >
                {{label}}<span v-if="unit">({{unit}})</span><span v-if="must" class="mustinput">(必填)</span>
            </div>
            <!-- input 组件不显示字数 -->
            <input
                  class="nd-calculator"
                  :id="id"
                  :class="classname"            
                  :style="textareastyle"
                  :name="name"
                  :placeholder="placeholder"
                  :readonly="readonly"

                  :displaymodel="displaymodel"

                  :min="min"
                  :max="max"

                  @input="$oninput"
                  @click="$onclick"
                  @focus="$onfocus"             
                  @blur="$onblur"
                  
                  v-el:input
                  v-model="value">
            <span class="nd-txt-error" 
                  v-show="!isValid">{{ validInfo }}</span>
        </div>
    </template>
    <template v-else>
        <div class="nd-cell weui_select_after">
            <div class="weui_cell_hd nd-cell-primary">
                <label class="nd-label">{{ label}}:</label>
            </div>
            <div class="nd-cell-right">{{ value }}</div>
            <input type="hidden" :value="value">
        </div>
    </template>
</div>
</template>


<style lang="scss" scoped>
    .nd-calculator-container {
        background-color: #fff;
        margin-bottom: 23px;
        border-bottom: 1px solid #eee;
    }

    .nd-title {
        font-size: 15px;
        margin-left:24px;
    }

    .nd-txt-con {
        position: relative;
        margin-left:5px;
        margin-right:5px;
    }

    .nd-calculator {
        width: 100%;
        margin-bottom:0px;
        padding: 8px 14px 8px 20px;
        height: 45px;
        border: 0;
        font-size: 15px;
        resize: none;  
    }

    .nd-showcount {
        margin-bottom: 26px;
    }

    .nd-txt-con .nd-num {
        position: absolute;
        bottom: 8px;
        right: 14px;
        color: rgba(0, 0, 0, 0.3);
    }

    .nd-txt-con .nd-num i {
        color: rgba(0, 0, 0, 0.6);
        font-style: normal;
        font-size: 14px;
    }

    .nd-error .nd-txt-con .nd-num ,
    .nd-error .nd-txt-con .nd-num i {
        color: red;
    }

    .nd-txt-error {
        position:absolute;
        right:65px;
        color:red;
    }

    .nd-receipt-header {
        background-color: #fff;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 7px;
    }

    .nd-receipt-txt {
        padding: 0 5px 14px;
    }

    .nd-lab {
        padding-top: 5px;
        height: 30px;
        line-height: 25px;
        color: #a0a0a0;
        font-size: 13px;
    }

    .nd-receipt-txt h3 {
        font-size: 13px;
        color: #313131;
        line-height: 25px;
        font-weight: 400;
        margin-bottom: 6px;  
        word-break: break-word;
    }

    .control-lab {
        padding-top: 5px;
        height: 30px;
        line-height: 25px;
        color: #a0a0a0;
        font-size: 13px;
    }

    .displaymodel label {
        padding-top: 5px;
        padding-left:5px;
        height: 30px;
        line-height: 25px;
        color: #a0a0a0;
        font-size: 13px;
    }

    .displaymodel span {
        padding-left:25px;
        display:block;
        font-size: 13px;
        color: #313131;
        line-height: 25px;
        font-weight: 400;
        margin-bottom: 6px;
        word-break: break-word;
    }

    .mustinput {
        color: red;
    }
</style>


<script>
    import calcTextareaHeight from '../../utils/calcTextareaHeight';
    import validate from '../../utils/validate'

    export default {
        props: {
            // 标签
            label: {
                type:String,
                default: ''
            }, 

            value: '',              // 当前值
            defaultvalue: '',       // 默认值
            id: String,             // 组件id
            name: String,           // 组件名称
            classname: String,      // 组件样式
            placeholder: String,    // 占位符

            // 显示模式 
            displaymodel: {
                type: Boolean,
                default: false
            },

            // 单位
            unit:{
                type: String,
                default: ''
            },

            max: Number,                    // 最大值
            min: Number,                    // 最小值

            width: [String, Number],        // 组件宽度
            labelwidth: [String, Number],   // 标题宽度

            // 是否必填
            must:{
                type: Boolean,
                default: false
            },

            // 最大长度
            maxlen:{
                type: [Number, String],
                default:0
            },

            // 是否只读
            readonly: {
                type: Boolean,
                default: false
            },

            // 校验规则
            valid: {
                type: String,
                default:'number'
            },

            // 默认配置项,从model中获取
            config: {
                type: Object,
            },

            // 可计算字段
            computableFields: {
                type: Array,
                default () {
                    return [];
                }
            },

            // 表达式
            expression: {
                type: 'string',
                default: ''
            }
        },

        data () {
            return {
                compType: 'textbox',    // 焦点控制
                validInfo: '',          // 出错信息提示
                isValid: true           // 是否有效
            };
        },
        watch: {
            value (newVal, oldVal) {
                // 是否超出限制
                let isLimitLen = false;

                if (this.maxlen && this.value.length > this.maxlen) {
                    newVal = newVal.slice(0, this.maxlen);
                    isLimitLen = true;
                }

                // 新的赋值，需要在nextTick中重复赋值，而不能直接赋值，具体原因未查。或者也可在oninput中赋值。
                this.$nextTick(() => {
                    !isLimitLen || this.validValue();
                    this.value = newVal;
                    !isLimitLen || this.validValue();
                });

                this.$trigger({ newVal: newVal, oldVal: oldVal }, 'changeEvent');
            }
        },
        methods: {
            /**
             * 设置值
             * @param {string|number} 值
             * @return none
             */                
            setValue (val) {
                if(val != this.value){
                    this.value = val;
                    this.validValue();
                }
            },

            /**
             * 获取组件当前值
             * @return {string|number} 组件当前值
             */    
            getValue () {
                return this.value;
            },

            /**
             * 设置组件是否为编辑态
             * @param {boolean} 组件当前状态
             * @return none
             */    
            setDisplaymodel (model){
                this.displaymodel = model;
            },

            /**
             * 校验
             * @return none
             */    
            validValue () {
                var val = this.getValue().toString().trim();

                this.validInfo = validate(val, this.valid, this.message, this);
                this.isValid = this.validInfo == '' ? true : false;

                if (this.isValid) {
                    if (this.must === true && (val == null || val == '')) {
                        this.isValid = false;
                        this.validInfo = i18nJson.length_error + this.label;
                    } else {
                        if (this.max != '' && val > this.max) {
                            this.isValid = false;
                            this.validInfo = this.label + i18nJson.more_than_the_maximum_limit + this.max;
                        } else if (this.min != '' && val < this.min) {
                            this.isValid = false;
                            this.validInfo = this.label + i18nJson.below_the_minimum_limit + this.min;
                        }
                    }
                }
            },

            /**
             * 事件触发
             * @param {object} 事件对象
             * @param {string} 事件类型
             * @return none
             */    
            $trigger (ev, type) {
                if (typeof this[type] == 'function') {
                   this[type].call(this, ev, this, 'text');
                } else if (typeof this[type] == 'string' && this[type] != '') {
                   eval(this[type]);
                }
            },

            /**
             * 点击事件
             * @param {object} 事件对象
             * @return none
             */    
            $onclick (ev){
                this.$trigger(ev, 'clickEvent');
            },

            /**
             * 输入事件
             * @param {object} 事件对象
             * @return none
             */    
            $oninput (ev){
                this.$trigger(ev, 'inputvent');
            },

            /**
             * 获取焦点事件
             * @param {object} 事件对象
             * @return none
             */    
            $onfocus (ev){
                if (this.readonly) {
                    return true;
                }

                this.$trigger(ev, 'focusEvent');
            },

            /**
             * 失去焦点
             * @param {object} 事件对象
             * @return none
             */    
            $onblur (ev){
                this.validValue();
                this.$trigger(ev, 'blurEvent'); 
            },

            /**
             * 值更新
             * @param {object} 变化的值
             * @return none
             */ 
            updateValue (data) {
                var computableFields = this.computableFields;
                var calculatorArr = [];

                for (var i = 0, len = computableFields.length; i < len; i ++) { 
                    var item = computableFields[i];
                    
                    if (item.value !== '' || item.componentId !== '') {
                        var val = '';

                        if (item.value || item.value === 0) {
                            val = item.value;
                        } else {
                            if (item.componentId === data.id) {
                                val = data.value;
                                item.value = val;
                            }
                        }

                        if (val || val === 0) {
                            if (i !== 0) {
                                calculatorArr.push(item.operator);
                            }

                            calculatorArr.push(val);
                        } else {
                            return false;
                        }
                    }
                }

                this.expression = calculatorArr.join(' ');

                var value = eval(this.expression);

                if (value !== undefined) {
                    this.setValue(value); 
                }        
            }
        },
        computed: {
            /**
             * 计算函数
             * @param {object} 组件vm
             * @return {number} 文本长度
             */                
            count () {
                let len = 0;

                if (this.value) {
                    len = this.value.replace(/\n/g, 'aa').length
                }

                return len > this.maxlen ? this.maxlen : len;
            }
        },
        /**
         * 组件成功创建回调
         * @return none
         */            
        created(){
            // 为数字 代表必须的长度(会将覆盖maxlen)
            if (typeof this.must == 'number'){
                this.max = this.must;
            }

            // placeholder 默认值
            if (!this.placeholder){
                this.placeholder = '请输入运算结果';
            }

            if (this.defaultvalue){
                this.value = this.defaultvalue;
            }

            // 将this.config 属性挂载在vm上    
            Object.assign(this, this.config);

            this.$on('COMPONENT:TEXTBOX:CHANGE', function (data) {
                this.updateValue(data);
            });

            this.updateValue();
        }    
    }
</script>