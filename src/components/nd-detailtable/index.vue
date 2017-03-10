<template>
    <div class="nd-detailtable-container">
        <h4 v-if="label">{{ label }}</h4>
        <p v-if="description">{{ description }}</p>
        <div class="nd-detailtable-rows" v-if="isEnable" v-bind:id="id">
            <div class="nd-detailtable-row"
                 v-for="cols in rows">
                <label>{{ label + ($index + 1) }}</label>
                <ul>
                    <li v-for="col in cols" 
                        v-if="col.componentId">
                        <div class="component-item" v-html="col.content"></div>
                    </li>
                </ul>
                <a class="ui-btn" v-if="$index > 0" @click="onDeleteRow($index)">删除</a>
            </div>
            <a class="ui-btn" @click="onAddRow">新增明细</a>
        </div>
        <div class="nd-detailtable-empty" v-if="!isEnable">未添加组件</div>         
    </div>
</template>

<style scoped>
    .nd-detailtable-container {
        
    }
</style>

<script>
export default {
    props:{
        id: 'default',

        // 标题
        label: {
            type: String,
            default: '明细子表'
        },

        // 描述
        description: {
            type: String,
            default: ''
        },

        // 列项
        cols: {
            type: Array,
            default () {
                return [];
            }
        },

        // 是否显示序号
        showSerial: {
            type: Boolean,
            default: false
        },

        config: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {
            rowsNum: 1,
            rows: [],
            content: '',
            isEnable: true
        };
    },
    methods:{
        /**
         * 添加行
         * @return none         
         */                      
        onAddRow: function () {
            this.rowsNum++;
            this.rebuild();
        },

        /**
         * 删除行
         * @param { number } 行下标
         * @return none         
         */                      
        onDeleteRow: function (idx) {
            if (idx > 0) {
                this.rows.splice(idx, 1);
                this.rowsNum --;
            }    

            this.rebuild();
        },      

        /**
         * 渲染 
         * @param {string} thisid
         * @return none
         */         
        render () {
            var data = {
                label: this.label,
                description: this.description,
                rows: rows,
                cols: this.cols.$model,
                showSerial: this.showSerial
            };

            this.content = _render(data);
        },

        /**
         * 检查组件是否有子组件，没有子组件则为不可用状态 
         * @return none
         */         
        checkEnableState () {
            var cols = this.cols;
            var isEnable = false;

            for (var i = cols.length - 1; i >= 0; i--) {
                if(cols[i].componentId) {
                    isEnable = true;
                }
            }

            this.isEnable = isEnable;            
        },

        /**
         * 构建行列数据
         * @return none
         */         
        buildRows () {
            for (var j = 0; j < this.rowsNum; j ++) {
                var cols = this.cols;
                var row = [];
                var _row = this.rows[j];

                if (_row) { 
                    continue;
                }

                for (var i = cols.length - 1; i >= 0; i--) {
                    function temp() {
                        var item = {};
                        var col = cols[i];
                        
                        if (col.componentId) {
                            item.componentId = col.componentId + '_' + j;
                            item.content = col.content.replace(col.componentId, item.componentId);
                            item.component = $.extend(true, {}, col.component.settings);

                            var webConfigFormat = 'config="' + item.componentId + '"';
                            var webIdFormat = '$id';

                            item.content = item.content.replace(webConfigFormat, ':config="' + item.componentId + '"');
                            item.content = item.content.replace(webIdFormat, 'id');

                            /**
                             * 值变化函数
                             * @param { object } 事件对象
                             * @param { object } 组件this
                             * @return none         
                             */              
                            item.component.changeEvent = function (val) {
                                item.component.defaultvalue = this.getValue();
                            };
                        }

                        row.push(item);
                    };

                    temp();
                }

                row.reverse();
                this.rows.push(row);
            }
        },

        /**
         * 构建
         * @return none
         */         
        build () {
            var detailtableVm = this;

            this.buildRows();

            var model = {};

            var rows = this.rows;

            for (var i = rows.length - 1; i >= 0; i--) {
                var row = rows[i]

                for (var j = row.length - 1; j >= 0; j--) {
                    model[row[j].componentId] = row[j].component;
                }
            }

            Vue.nextTick(function () {

                new Vue({
                    el:'#' + detailtableVm.id,
                    data () {
                        return model;
                    },
                    methods : {
                        /**
                         * 添加行
                         * @return none         
                         */                      
                        onAddRow: function () {
                            detailtableVm.rowsNum++;
                            detailtableVm.rebuild();
                        },
                        /**
                         * 删除行
                         * @param { number } 行下标
                         * @return none         
                         */                      
                        onDeleteRow: function (idx) {
                            if (idx > 0) {
                                detailtableVm.rows.splice(idx, 1);
                                detailtableVm.rowsNum --;
                            }    

                            detailtableVm.rebuild();
                        }                    
                    }
                });   
            });         
        },

        /**
         * 重新构建
         * @return none
         */         
        rebuild () {
            this.build();
        }        
    },
    /**
     * 组件成功创建回调
     * @return none
     */        
    created () {
        // 将this.config 属性挂载在vm上   
        Object.assign(this, this.config);      
    },

    /**
     * 文档插入回调
     * @return none
     */ 
    attached () {
        this.checkEnableState();
        this.build();        
    }
}

</script>

