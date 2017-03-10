<template>
    <div class="nd-datepicker-container">
        <label class="nd-txt-title">
            {{ label }}<span ms-if="must"> (必填) </span>
        </label>
        <!-- input 组件不显示字数 -->
        <input name="reason"
               class="nd-datepicker-input"
               :placeholder="placeholder"
               @click="open"
               v-model="value"
               :readonly="readonly" 
               v-if="enable">     
        <input name="reason"
               class="nd-datepicker-input"
               :placeholder="placeholder"
               v-model="value"
               disabled="disabled" 
               v-else>                                  
        <span class="nd-txt-error" style="display: none;"></span>
    </div>
</template>

<style scoped>
    .nd-datepick{
        background-color: #fff;
    }

    .nd-datepick .tit{
        margin: 0 14px;
        margin-top: 5px;
        font-size: 15px;
        color: #535353;
        text-align: center;
    }

    .nd-typerow{
        height: 37px;
        padding: 10px 0;
        line-height: 16px;
        border-bottom: 1px dotted #dcdcdc;
        color: #313131;
        font-size: 13px;
    }

    .nd-typerow .nd-conent{
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
        	default: 'yyyy-MM-dd HH:mm'
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

        // 默认值
        defaultvalue: {
            type: String,
            default: ''
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
	data () {
		return {
			datepicker: null,
            value: '',
            valid: true
		}
	},

    /**
     * 已创建
     * @return none
     */      
    ready (){
        Object.assign(this, this.config);

        let self = this;

        this.value = this.defaultvalue;

        this.datepicker = new Datepicker({
            defaultvalue: this.defaultvalue,
            min: this.min,
            max: this.max,
            displayformat: this.displayformat,
            valueformat: this.valueformat,
            showtime: this.showtime,
            onChange: function (val) {
                self.value = val;
            }
        });

        this.$watch('max', function (nv, ov) {
            this.datepicker.setMax(nv);
        });

        this.$watch('min', function (nv, ov) {
            this.datepicker.setMin(nv);
        });
    },
	methods: {
        /**
         * 获取当前值
         * @return none
         */          
		getValue () {
            return this.value;
		},

        /**
         * 设置当前值
         * @param {string} 设置新的值
         * @return none
         */  
        setValue (value) {
            this.value = value;
            this.datepicker.setValue(value);
        },

        /**
         * 打开日期选择
         * @param {event} 事件对象
         * @return none
         */  
        open (e) {
            this.datepicker.open();
            e.target.blur();
        }
	}
}
</script>