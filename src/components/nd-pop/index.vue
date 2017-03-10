<template>
    <div class="nd-pop-container">
        <div class="nd-pop-header"></div>
        <div class="nd-pop-content"></div>
    </div>
</template>

<style>
    
</style>

<script>
    export default {
        props:{
            /**
             * 组件name值
             */                
            name: String,
            /**
             * 标题
             */                
            label: '',
            /**
             * 标题宽度
             */                
            labelwidth: {
                type: Number,
                default: 120
            },
            /**
             * 宽度
             */                
            width: {
                type: [ String, Number ],
                default: '100%'
            },
            /**
             * 组件当前值
             */                
            value: '',
            /**
             * 是否必填
             */                
            must: {
                type: Boolean,
                default: false
            },
            /**
             * 是否只读
             */                
            readonly: {
                type: Boolean,
                default: false
            },
            /**
             * 默认值
             */            
            defaultvalue: Number,
            /**
             * 加载包裹标签的class
             */            
            classname: String
        },
        /**
         * 数据模型
         * @return { object } 数据模型
         */          
        data () {
            return {};
        },
        methods:{
            /**
             * 获取当前值
             * @return { number } 新的值
             */               
            getValue () {
                return this.value;
            },
            /**
             * 设置值
             * @params { number } 新的值  
             * @return none
             */               
            setValue (value) {
                this.value = value;
            },
            /**
             * 选中星星
             * @params { number } 星星的值
             * @return none
             */                
            onPick (val) {
                if (this.readonly) {
                    return false;
                }
                
                this.value = val;
            }
        },
        created () {
            if (this.defaultvalue) {
                this.setValue(defaultvalue);
            }
        }
    }
</script>

