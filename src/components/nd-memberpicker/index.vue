/* 职员组件 */

<template>
     <div class="receipt-add">
        <h3 v-if="label">{{label}} <span v-show="must" style="color:red"> (必填)</span></h3>
        <div style="display:inline">
            <div class="avatar"  v-for="(row,index) in items" :name="row.code" >
                  <ximg :xsrc="getSrc(row.code)" @click="look(row.code)"></ximg>
                  <span class="name">{{ row.name }}</span>
                  <ins v-if="!displaymodel" class="icon-del" @click="del(index)"></ins>
            </div>
        </div>
       <a v-if="!displaymodel && (multiple || items.length==0 )" class="fn-btn-add" href="javascript:;" @click="add"></a>
    </div>
</template>

<script>

function _interface(){}

export default {
    props:{
        //外部属性
        label: '',
        name: '',
        value: '',
        text: '',
        classname: '',
        usertemplate: '',
        textFormat: '@name(@code)',
        displaymodel: false,
        multiple: { //是否多选
            type:Boolean,
            default:false
        },         
        enable: true,
        must: {
            type:Boolean,
            default:false
        },
        depcode: '',
        excludeperson: '',      //排除人员
        state: 1,               //状态(0/1/2， 未激活/在职/离职)
        width: '100%',
        labelwidth: 120,
        defaultvalue: '',       // 默认值

        $i18n: {},              // 国际化

        //外部参数
        changeEvent: null,
        //pickEvent: null,

        //外部方法
        getData: _interface,
        setData: _interface,
        setValue: _interface,

        //内部方法
        onSelected: _interface,
        togglePicker: _interface,
        removeData: _interface,

        //view属性
        dataSelect: [],         //已选人员
        
        items:{
            type:Array,
            default:function(){return []}
        },

        config:{
            type:Object,
            default:function(){return {}}
        }

    },
    created(){
        Object.assign(this,this.config);
        let vm = this;

        // 查看模式
        if(this.displaymodel && this.value){
            let personArr = this.value.split(',');
            for(let index in personArr){
                vm.items.push({name:personArr[index],code:personArr[index]});
            }
            UtilHelper.getPersonArrayByPersonId(this.value,function(personArr){
                vm.items = [].concat(personArr);
            });
        }
    },
    data(){
        return {
            isValid:true,
            validInfo :'',
        }
    },
    methods : {
        getValue(){
            let vm = this;
            return UtilHelper.getCodeString(vm.items);
        },
        getText(){
            let vm = this;
             return UtilHelper.getNameString(vm.items);
        },
        add(){
            let vm = this;
            // 多选
            if(vm.multiple){
                SopNative.getSelectMultiplePerson(vm.items,vm.excludeperson,function(personArr){
                    vm.items = personArr;
                })
            }else{ // 单选
                SopNative.getSelectPerson(function(personArr){
                    vm.items = vm.items.concat(personArr);
                })  
            }
        },
        del(i){
            let vm = this;
            vm.items.splice(i, 1);               
        },
        look(personCode){
            let vm = this;
            if(vm.displaymodel){
                SopNative.lookPersonInfo(personCode);
            }  
        },
        getSrc(code){
            return UtilHelper.becomeAvatarSrc(code);
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
                        vm.validInfo = '请添加人员';
                        return false;
                    } else {
                        vm.validInfo = '';
                        vm.isValid = true;
                    }
                }    
            }
            return true;
        },
        
    }
}

</script>













