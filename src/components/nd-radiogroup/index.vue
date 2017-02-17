
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
            type:String
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
        radios:{
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
        width:{
            type:[String,Boolean]
        },
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
                for (var i = 0; i < this.radios.length; i++) {
                    var radio = this.radios[i];
                    if (inArrary(valArr, radio.value)) {
                        if (radio.ischecked == false) {
                            radio = (Object.assign({}, this.radios[i], { ischecked: true}))                            
                            vm.radios.$set(i, radio);
                            this.$trigger(radio, null, 'checkEvent');
                            this.$trigger(radio, null, 'changeEvent');
                            console.log('checked'+ radio.value);
                        }
                    } else {
                        if (radio.ischecked == true) {
                            radio = (Object.assign({}, this.radios[i], { ischecked: false}))                            
                            vm.radios.$set(i, radio);
                            this.$trigger(radio, null, 'changeEvent');
                        }
                    }
                }
                vm.value = val;
            },
            get: function () {
                var valArr = [];
                for (var i = 0; i < this.radios.length; i++) {
                    if (this.radios[i].ischecked) {
                        valArr.push(this.radios[i].value);
                    }
                }
                return valArr.join(',');
            }
        },text:{
            get:function(){
                var text = '';
                for (var i = 0; i < this.radios.length; i++) {
                    if (this.radios[i].ischecked) {
                        text += this.radios[i].label + ',';
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
        $trigger(radio, ev, type) {
            let vm = this;
            switch (type) {
                case 'checkEvent':
                    if (typeof radio.checkEvent == 'function') {
                        radio.checkEvent(ev, vm, radio);
                    }
                    break;
                case 'changeEvent':
                    if (typeof radio.changeEvent == 'function') {
                        radio.changeEvent(ev, vm, radio);
                    }
                    if (typeof vm.changeEvent == 'function' && radio.ischecked == true) {
                        vm.changeEvent(ev, vm, radio);
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
                    return (val == '' ? false :true);
                }else{
                    if (val == '') {
                        vm.isValid = false;
                        vm.validInfo = '请选择' + vm.label;
                        return false;
                        //todo 
                       // vm.validInfo = i18nJson['please_select'] + vm.label;
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
           // var radio = vm.radios[idx];
            //if (vm.enable && radio.enable) {
                vm.$Items.setOption({  
                    multiple:false, 
                    label:vm.label, 
                    setValue:vm.setValue,
                    valuekey:'value', 
                    textkey: 'label'
                });
                console.log(vm.radios + 'selectVlaue'+ vm.selectValue)
                vm.$Items.showItems(vm.radios, vm.selectValue);

                /*
                for (let  i = 0; i < vm.radios.length; i++) {
                    let curRadio = vm.radios[i];
                    if (idx == i) {
                        vm.$trigger(radio, ev, 'checkEvent');
                        if (curRadio.ischecked == false) {
                            curRadio = (Object.assign({}, this.radios[i], { ischecked: true}))
                            //Vue.set(this.radios[i],'ischecked',true)
                            vm.radios.$set(i, curRadio);

                            vm.$trigger(radio, ev, 'changeEvent');
                        }
                    } else {
                        if (curRadio.ischecked == true) {
                            curRadio = (Object.assign({}, this.radios[i], { ischecked: false}))
                            curRadio.ischecked = false;
                            //Vue.set(this.radios[i],'ischecked',false)
                            vm.radios.$set(i, curRadio);
                            vm.$trigger(vm.radios[i], ev, 'changeEvent');
                        }
                    }
                }
                if (vm.validInfo != '') {
                    vm.validValue(null);
                }*/
            //}
        },
        getData(){
            let vm = this;
            var data = {};
            for (var i = 0; i < vm.radios.length; i++) {
                if (vm.radios[i].ischecked) {
                    data = { label: vm.radios[i].label, value: vm.radios[i].value };
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
        },
        setDisplaymodel(model){
            this.displaymodel = model;
        }

    },
    created(){
        let vm = this;
        var options = Object.assign(this,this.config);
        var radios = options.radios;

        for (var i = 0; i < radios.length; i++) {
            let curRadio = radios[i];
            if (radios[i].enable == undefined) {                
                //curRadio = (Object.assign({}, this.radios[i], { enable: true}))
                Vue.set(this.radios[i],'enable',true)
                //vm.radios.$set(i, curRadio);
            }
            if (radios[i].ischecked == undefined) {
                radios[i].ischecked = false;
                //curRadio = (Object.assign({}, this.radios[i], { ischecked: false}))
                Vue.set(this.radios[i],'ischecked',false)
                //vm.radios.$set(i, curRadio);
            }
        }
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
.nd-radio-label{
    margin-bottom: 0;
    padding: 8px 15px;
}

.ui-radio.disabled p{
    color:gainsboro;
}

</style>

