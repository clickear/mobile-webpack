
<template>
    <div class="nd-edit-content">
        <div class="nd-txt-title" style="margin-left:15px;">{{label}}<span v-show="must" style="color:red"> (必填) </div>
        
        <div class="nd-cells">
        <label class=" nd-cell ui-radio nd-radio-label " @click="clickRadio($event,index)" track-by="$index" :class={'checked':one.ischecked,'disabled':!one.enable} for="radio_{{uuid}}_{{index}}" v-for="(index,one) in radios">
          <div class=" nd-cell-primary">
            <p>{{one.label }}</p>
          </div>
          <div class="weui_cell_ft">
            <!-- <input type="radio" class="weui_check" v-model="value" id="radio_{{uuid}}_{{index}}" value="{{one }}"> -->
            <span class="nd-checkbox-checked"></span>
          </div>
        </label>

        </div>


    </div>


    <div class="nd-cell-right" v-else>
      {{ text }}

    </div>



</template>



<script>

export default{
	props:{
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
        // value:'',
        //外部参数
        //changeEvent: null,
        //checkEvent: null,
        config:{
            type:Object,
            default:function(){return {}}
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
        value: {
            set: function (val) {
                debugger;
                let vm = this;
                for (var i = 0; i < this.radios.length; i++) {
                    var radio = this.radios[i];
                    if (radio.value == val) {
                        if (radio.ischecked == false) {
                            radio = (Object.assign({}, this.radios[i], { ischecked: true}))                            
                            vm.radios.$set(i, radio);
                            this.$trigger(radio, null, 'checkEvent');
                            this.$trigger(radio, null, 'changeEvent');
                        }
                    } else {
                        if (radio.ischecked == true) {
                            radio = (Object.assign({}, this.radios[i], { ischecked: false}))                            
                            vm.radios.$set(i, radio);
                            this.$trigger(radio, null, 'changeEvent');
                        }
                    }
                }
            },
            get: function () {
                var val = '';
                for (var i = 0; i < this.radios.length; i++) {
                    if (this.radios[i].ischecked) {
                        val = this.radios[i].value;
                        break;
                    }
                }
                return val;
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
        validValue(){
            let vm = this;
            if (vm.must === true) {
                if (vm.getValue() == '') {
                    vm.isValid = false;
                    //todo 
                   // vm.validInfo = i18nJson['please_select'] + vm.label;
                } else {
                    vm.validInfo = '';
                    vm.isValid = true;
                }
            }
        },
	    clickRadio(ev, idx){
            let vm = this;
            var radio = vm.radios[idx];
            if (vm.enable && radio.enable) {
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
                }
            }
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
            return this.value;
        },
        setValue(val){
            this.value = val;
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

