<template>
    <template v-if="!displaymodel">
      <div class="nd-cell" :class="{'weui_select_after':label, 'weui_cell_select':!displaymodel}" >
        <div class="weui_cell_hd" v-if="label" :class="{'nd-cell-primary':displaymodel}">
          <label for="" class="nd-label" >{{label}}</label>
        </div>
        <div class=" nd-cell-primary nd-cell-body nd-select-container" v-if="!displaymodel" >
            <div class="input-wrapper"   @click="toggleList($event)"  >
                <input class="ui-text" 
                       type="text" 
                       :placeholder="placeholder" 
                       :readonly="true" 
                       :id="id"

                       :disabled="!enable"
                       :name="name"
                       :value="text==''?placeholder:text" />
                <input class="ui-text form-filter" 
                       type="text"
                       v-show ="isShowOption"
                       ms-css-text-align="align"
                       ms-css-padding-left="label=='' ? 0 : labelwidth + 10"
                       v-if="filter"
                       @click="filterHander($event)"
                       v-model="filterText" />

            </div> 
    </template>
    <template v-else>
        <div class="nd-cell" :class="{'weui_select_after':label, 'weui_cell_select':!displaymodel}" >
            <div class="weui_cell_hd nd-cell-primary" >
                <label class="nd-label" >{{label}}</label>
            </div>
            <div class="nd-cell-right">{{text}}</div>
        </div>
    </template>
</template>
<script>
function inArrary(array, val){
    for(var i =0; i<array.length; i++){
        if(array[i] == val){
            return true;
        }
    }
    return false;
}

export default{
    props:{
        id:{
            type:[String]
        },
        label: {
            type:String,
            default:''
        },
         name: {
            type:String,
            default:''
         },
        enable: {
            type:Boolean,
            default:true
        },
        checkboxes:{
            type:Boolean,
            default:function(){return []}
        },
        must:{
            type: Boolean,
            default:false
        },
        displaymodel:{
            type:Boolean,
            default:false
        },
        ischecked:{
            type:Boolean,
            default:false
        },
        // width 暂时没用到
        width:{
          type:[String,Boolean]
        },
        // 只读
        readonly:{
          type:[String,Boolean]
        },
        // value:'',
        //外部参数
        //changeEvent: null,
        //checkEvent: null,
        config:{
            type:Object,
            default:function(){return {}}
        },
        value:{
            type:[String,Boolean,Number]
        }
    },
    data(){
        return {
            isValid:true,
            validInfo :'',

            // options:[ { label: '初中', ischecked: true, value: '2' },{ label: '高中', value: '3' },]
        }
    },
    computed:{
        selectValue: {
            set: function (val) {
                let vm = this;
                let textArr = [];
                let valArr = val ? (val+'').split(',') : [];
                for (var i = 0; i < this.checkboxes.length; i++) {
                    var checkbox = this.checkboxes[i];
                    if (inArrary(valArr, checkbox.value)) {
                        if (checkbox.ischecked == false) {
                            checkbox = (Object.assign({}, this.checkboxes[i], { ischecked: true}))                            
                            vm.checkboxes.$set(i, checkbox);
                            this.$trigger(checkbox, null, 'checkEvent');
                            this.$trigger(checkbox, null, 'changeEvent');
                            console.log('checked'+ checkbox.value);
                        }
                    } else {
                        if (checkbox.ischecked == true) {
                            checkbox = (Object.assign({}, this.checkboxes[i], { ischecked: false}))                            
                            vm.checkboxes.$set(i, checkbox);
                            this.$trigger(checkbox, null, 'changeEvent');
                        }
                    }
                }
                vm.value = val;
            },
            get: function () {
                var valArr = [];
                for (var i = 0; i < this.checkboxes.length; i++) {
                    if (this.checkboxes[i].ischecked) {
                        valArr.push(this.checkboxes[i].value);
                    }
                }
                return valArr.join(',');
            }
        },
        text:{
            get:function(){
                var text = '';
                for (var i = 0; i < this.checkboxes.length; i++) {
                    if (this.checkboxes[i].ischecked) {
                        text += this.checkboxes[i].label + ',';
                    }
                }
                if(text && text.length>0){
                    text = text.substring(0, text.length-1);
                }
                return text;
            }
        }
    },
    methods:{
        $trigger(checkbox, ev, type) {
            let vm = this;
            switch (type) {
                case 'checkEvent':
                    if (typeof checkbox.checkEvent == 'function') {
                        checkbox.checkEvent(ev, vm, checkbox);
                    }
                    break;
                case 'changeEvent':
                    if (typeof checkbox.changeEvent == 'function') {
                        checkbox.changeEvent(ev, vm, checkbox);
                    }
                    if (typeof vm.changeEvent == 'function' && checkbox.ischecked == true) {
                        vm.changeEvent(ev, vm, checkbox);
                    }
                    break;
                default: break;
            }
        },
        validValue(checkModel){
            let vm = this;
            let val = vm.getValue() || '';
            if (vm.must === true) {
                if(checkModel){
                    return (val == '' ? false : true);
                }else{
                    if (val == '') {
                        vm.isValid = false;
                        vm.validInfo = '请选择' + vm.label;
                        return false;
                    } else {
                        vm.validInfo = '';
                        vm.isValid = true;
                    }
                }    
            }
            return true;
        },
        toggleList(ev, idx){
            let vm = this;
            vm.$Items.setOption({  
                multiple:true, 
                label:vm.label, 
                setValue:vm.setValue,
                valuekey:'value', 
                textkey: 'label'
            });
            vm.$Items.showItems(vm.checkboxes, vm.value);
        },
        getData(){
            let vm = this;
            var data = {};
            for (var i = 0; i < vm.checkboxes.length; i++) {
                if (vm.checkboxes[i].ischecked) {
                    data = { label: vm.checkboxes[i].label, value: vm.checkboxes[i].value };
                    break;
                }
            }
            return data;
        },
        getValue(){
            return this.selectValue;
        },
        setValue(val){
            this.selectValue = val;
        }
    },
    created(){
        let vm = this;
        var options = Object.assign(this,this.config);
        var checkboxes = options.checkboxes;
        for (var i = 0; i < checkboxes.length; i++) {
            let curcheckbox = checkboxes[i];
            if (checkboxes[i].enable == undefined) {                
                Vue.set(this.checkboxes[i],'enable',true)
            }
            if (checkboxes[i].ischecked == undefined) {
                checkboxes[i].ischecked = false;
                Vue.set(this.checkboxes[i],'ischecked',false)
            }
        }
        // 这里的value 是传递属性，不能同时作为计算属性。所以在selectValue中设置value的值
        vm.selectValue = vm.value;       
    }
}
    
</script>

<style>

.nd-cells{
    position: relative;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
}

.nd-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    z-index: 1;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.nd-checkbox-label{
    margin-bottom: 0;
    padding: 8px 15px;
}

.ui-checkbox.disabled p{
    color:gainsboro;
}

</style>

