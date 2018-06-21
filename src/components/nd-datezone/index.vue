<template>
    <div class="nd-datezone-container">
        <div class="nd-datezone-start">
            <label class="nd-txt-title">
                开始时间<span ms-if="must"> (必填) </span>
            </label>
            <!-- input 组件不显示字数 -->
            <input name="reason"
                   class="nd-datezone-input nd-datezone-input-start"
                   :placeholder="placeholder"
                   @click="openStart"
                   v-model="valueStart"
                   readonly="readonly" 
                   v-if="enable">     
            <input name="reason"
                   class="nd-datezone-input nd-datezone-input-start"
                   :placeholder="placeholder"
                   v-model="valueStart"
                   disabled="disabled" 
                   v-else>                                  
            <span class="nd-txt-error" style="display: none;"></span>
        </div>
        <div class="nd-datezone-end">
            <label class="nd-txt-title">
                结束时间<span ms-if="must"> (必填) </span>
            </label>
            <!-- input 组件不显示字数 -->
            <input name="reason"
                   class="nd-datezone-input nd-datezone-input-end"
                   :placeholder="placeholder"
                   @click="openEnd"
                   v-model="valueEnd"
                   readonly="readonly" 
                   v-if="enable">     
            <input name="reason"
                   class="nd-datezone-input nd-datezone-input-end"
                   :placeholder="placeholder"
                   v-model="valueEnd"
                   disabled="disabled" 
                   v-else>                                  
            <span class="nd-txt-error" style="display: none;"></span>
        </div>    
    </div>
</template>

<style type="text/css">
.nd-datepick {
    background-color: #fff;
}

.nd-datepick .tit {
    margin: 0 14px;
    margin-top: 5px;
    font-size: 15px;
    color: #535353;
    text-align: center;
}

.nd-typerow {
    height: 37px;
    padding: 10px 0;
    line-height: 16px;
    border-bottom: 1px dotted #dcdcdc;
    color: #313131;
    font-size: 13px;
}

.nd-typerow .nd-conent {
        font-size: 13px;
}

</style>

<script>
import Datepicker from '../../lib/datepicker2'

export default{
    props:{
        // 组件id
        id:String,

        // 标题
        label: String,

        // 组件name值
        name: String,

        // 组件类名
        classname: String,

        // 占位符
        placeholder: {
            type: String,
            default: '请选择时间'
        },

        // 日期显示格式
        displayformat: {
            type: String,
            default: 'yyyy-MM-dd HH:mm'
        },

        // 日期值的格式
        valueformat: {
            type: String,
            default: 'yyyy-MM-dd hh:mm'
        },

        // 必填
        must: {
            type: Boolean,
            default: false
        },

        // 是否可用
        enable: {
            type: Boolean,
            default: true
        },

        // 是否显示时间
        showtime:{
            type: Boolean,
            default: false
        },

        // 最大值
        max: {
            type: String,
            default: '2050-03-21 00:00'
        },

        // 最小值
        min: {
            type: String,
            default: '1970-03-21 00:00'
        },

        // 默认开始时间
        defaultstartvalue: {
            type: String,
            default: '1970-03-21 00:00'
        },

        // 默认结束时间
        defaultendvalue: {
            type: String,
            default: '1970-03-21 00:00'
        },

        // 外部传入的配置项
        config:{
            type: Object,
            default: function(){ return {}; }
        }
    },

    /**
     * 返回数据模型
     * @param {object} 数据模型
     * @return none
     */      
    data(){
        return {
            datepickerStart: null,
            datepickerEnd: null,
            valueStart: '',
            valueEnd: ''
        }
    },

    /**
     * 已创建
     * @return none
     */      
    created (){
        Object.assign(this, this.config);

        let self = this;

        this.valueStart = this.defaultstartvalue;
        this.valueEnd = this.defaultendvalue;

        this.datepickerStart = new Datepicker({
            defaultvalue: this.defaultstartvalue,
            min: this.min,
            max: this.valueEnd || this.max,
            displayformat: this.displayformat,
            valueformat: this.valueformat,
            showtime: this.showtime,
            onChange: function (val) {
                self.valueStart = val;
                self.datepickerEnd.setMin(val);
            }
        });

        this.datepickerEnd = new Datepicker({
            defaultvalue: this.defaultendvalue,
            min: this.valueStart || this.min,
            max: this.max,
            displayformat: this.displayformat,
            valueformat: this.valueformat,
            showtime: this.showtime,
            onChange: function (val) {
                self.valueEnd = val;
                self.datepickerStart.setMax(val);
            }
        });

        this.$watch('max', function (nv, ov) {
            this.datepickerEnd.setMax(nv);

            if (!this.valueEnd) {
                this.datepickerStart.setMax(nv);
            }
        });

        this.$watch('min', function (nv, ov) {
            this.datepickerStart.setMin(nv);

            if (!this.valueStart) {
                this.datepickerEnd.setMin(nv);
            }
        });
    },
    methods:{
        /**
         * 设置当前值
         * @param {string} 组件开始的值
         * @param {string} 组件结束的值 
         * @return none
         */  
        setValue (sVal, eVal) {
            this.valueStart = sVal;
            this.valueEnd = eVal;

            this.datepickerStart.setValue(sVal);
            this.datepickerEnd.setValue(eVal);
        },

        /**
         * 获取当前值
         * @return none
         */          
        getValue () {
            return {
                start: this.valueStart,
                end: this.valueEnd
            };            
        },

        /**
         * 打开开始日期选择
         * @param {event} 事件对象  
         * @return none
         */  
        openStart (e) {
            e.target.blur();
            this.datepickerStart.open();
        },

        /**
         * 打开结束日期选择
         * @param {event} 事件对象 
         * @return none
         */  
        openEnd (e) {
            e.target.blur();
            this.datepickerEnd.open();
        }
    }
}

</script>