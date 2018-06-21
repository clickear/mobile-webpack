<template>
    <div class="nd-evaluate-container"  
         :class="[{ readonly: readonly }, classname]"
         :style="{width: width}">
        <label class="control-label" 
               :style="{'width': labelwidth}">
            {{ label }}<b class="mustselect" v-if="must"></b>：
        </label>
        <ul class="nd-evaluate-stars-wrapper">
            <li class="star" 
                :class="{'active': value >= 1}"
                @click="onPick(1)"></li>
            <li class="star" 
                :class="{'active': value >= 2}"
                @click="onPick(2)"></li>
            <li class="star" 
                :class="{'active': value >= 3}"
                @click="onPick(3)"></li>
            <li class="star" 
                :class="{'active': value >= 4}"
                @click="onPick(4)"></li>
            <li class="star" 
                :class="{'active': value >= 5}"
                @click="onPick(5)"></li>
        </ul>
    </div>
</template>

<style>
    .nd-evaluate-container {
        position: relative;
        line-height: 20px;
        margin-bottom: 14px;
        padding: 0px 15px; 
        display: -webkit-box;
        display: -ms-flexbox;        
        display: flex;  
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .nd-evaluate-container .control-label {
        word-wrap: break-word;
        word-break: break-all;        
        font-size: 15px;
        color: #000;
    }

    .nd-evaluate-container .mustselect {
        color: #FE5A65;
        font-weight: normal;
        font-size: 12px;
        margin-left: 5px;
        vertical-align: 1px;
    }

    .nd-evaluate-container .mustselect:before {
        content: '(必填)';
    }

    .nd-evaluate-container:after {
        content: '';
        display: block;
        clear: both;   
    }

    .nd-evaluate-container .control-label {
        display: block;
        margin-left: 8px;
        text-align: right;
        color: #999;
    }
    
    .nd-evaluate-stars-wrapper {
        display: block;
        padding: 4px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;        
        font-size: 0;            
    }

    .nd-evaluate-stars-wrapper li {
        display: inline-block;
        height: 20px;
        width: 26px;
        margin: 0;
        cursor: pointer;
        vertical-align: middle;
    }

    .nd-evaluate-stars-wrapper .clear {
        width: 30px;
        font-size: 15px;
        text-align: center;
    }

    .nd-evaluate-stars-wrapper .clear a {
        color: maroon;
    }

    .nd-evaluate-stars-wrapper .star {
        background: url(/static/img/star.png);
        background-position: 1px -1px;        
    }

    .nd-evaluate-stars-wrapper .star.hover,
    .nd-evaluate-stars-wrapper .star.active {
        background-position: 97px 99px;
    }

    .nd-evaluate-container.readonly .star {
        cursor: no-drop!important;
    }

    .nd-evaluate-container.vertically {
        display: block;
    }

    .nd-evaluate-container.vertically .nd-evaluate-stars-wrapper {
        float: none;
        padding: 0 22px;
    }
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

