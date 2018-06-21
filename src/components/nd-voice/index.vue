<template>
	<div class="edit-content">
		<div class="add-media" v-if="!displaymodel && items.length==0 ">
		    <a class="voice-btn" href="javascript:;" @click="uploadVoice"></a>
		</div>
		<div class="receipt-reason" >
			<audio-player :allowedit="!displaymodel" :items.sync='items'></audio-player>
		</div> 
	</div>
</template> 


<script >
	
export default {
	props:{
		name:String,
		displaymodel:{
			type:Boolean,
			default:false
		},
		value:{
			type:[String,Array],
			default:function(){return []}
		},
		items:{
            type:Array,
            default:function(){return []}
        },
	},
	data () {
		return {
			compType:'voice',
			focus:false
		}
	},
	created(){
        Object.assign(this,this.config);
        let vm = this;

        // 查看模式
        if (this.displaymodel && this.value){
            UtilHelper.getUploadByFileGUid(this.value, function (personArr) {
            	if (!personArr) personArr = [];
                vm.items = [].concat(personArr);
            });
        }

        if(UtilHelper.isArrar()){
        	vm.items = vm.value;
        }
    },
	methods:{
		uploadVoice(){
			var self = this;
            sys_record(function(data){
                for (var i = 0; i < data.length; i++) {
                	var sFileGuid = data.sFileGuid || UtilHelper.getGUID().replace(',','@');
                	data[i] = (Object.assign({}, data[i], { bComponent: true, sFileGuid:sFileGuid, lType:1})) 
                }                        
                self.items = data;
            });
		},
		getValue () {
			let guidArr = [];
			for(let i in this.items) {
				if ( this.items[i].sFileGuid){
					guidArr.push(this.items[i].sFileGuid);
				}
			}
			return guidArr.join(',');
		},
		getData () {
			return this.items;
		}
	},

}

</script>

