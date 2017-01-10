<template>
    <div class="nd-edit-content nd-datepick">
        <div class="nd-txt-title tit" style="margin-left:15px;" v-show="label">{{label}}</div>
    	<div :id="id" class="datePlugin" ></div>
    </div>
</template>


<script>
	
function _interface(){}

export default{
	props:{
        id:String,
 		label: String,
        name: String,
        classname: String,
        placeholder: String,
        displaymodel:{
        	type:Boolean,
        	default:false
        },
        displayformat: {
        	type:String,
        	default:'yyyy-MM-dd HH:mm'
        },
        valueformat:{
			type: String,
        	default: 'yyyy-MM-dd hh:mm'
        },

        // 必填
        must: {
        	type:Boolean,
        	default:false
        },
        // 
        enable: {
        	type:Boolean,
        	default:true
        },

        max: {
        	type:[String,Date],
            default:function(){return new Date('2050/12/12 10:00')}
        },
        maxDate: {
        	type:[String,Date]
        },    
        min: {
            type:[String,Date],
            default:function(){return new Date('2010/12/12 10:00')}
        },
        minDate: {
        	type:[String,Date]
        },
        //内部属性
        value: {
        	type:[String, Number, Array,Date],
        	default:''
        },
        stamp:{
        	type:Boolean,
        	default:false
        },
	    options: {
	      type: Array,
	      required: false
	    },
	    config:{
	    	type:Object,
	    	default:function(){return {}}
	    }
	},
	data(){
		return {
			carouselDatepicker:null
		}
	},
    created(){
        Object.assign(this,this.config);
        let vm = this;
        let val = vm.value;
        if(typeof val == 'string') {
            val = new Date(val).format(vm.valueformat);
        } else if(typeof val == 'number') {
            val = new Date(val).format(vm.valueformat);
        } 
        if(val == '' || val == null ){
            val = new Date().format(vm.valueformat);
        }

        if(!vm.id){
            vm.id = Math.random().toString(36).substring(3, 8);
        }
        
        // 手机端不支持 hh 模式，进行替换
        vm.displayformat = vm.displayformat.replace('hh','HH');
    },
	ready(){
        let vm = this;
	    this.carouselDatepicker = new CarouselDatepicker({
            id: this.id,
            currDate: this.value,
            beginDate: this.min,
            endDate: this.max,
            format: this.displayformat,
            onValueChange: function(value) {
               vm.value = new Date(value).format(vm.valueformat);
            }           
        });
	},
	methods:{
        _trigger(ev, type){
            let vm = this;
            switch(type){
                case 'changeEvent':
                    if (typeof vm.clickEvent == 'function') {
                        vm.clickEvent(ev, vm);
                    }
                    break;
                default:break;
            }
        },
		getData(){
			let vm = this;
			var data = {};
            data[vm.name] = vm.getValue();
            return data;
		},
		getValue(){
            let vm = this;
			var d = new Date(vm.value);
            if(!vm.stamp) {
            	return d == null ? '' : d.format(vm.valueformat);
            } else {
            	return d == null ? 0 : d.getTime();
            }
		},
        setDisplaymodel(model){
            this.displaymodel = model;
        }
	}
}

</script>

<style type="text/css">
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

</style>