<template>
	<div class="edit-content">
		<div class="add-media" v-if="!displaymodel && value.length==0 ">
		    <a class="voice-btn" href="javascript:;" @click="uploadVoice"></a>
		</div>
		<div class="receipt-reason" >
			<audio-player :allowedit="!displaymodel" :items='value'></audio-player>
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
		}
	},
	methods:{
		uploadVoice(){
			var self = this;
            sys_record(function(data){
                self.value = data;
            });
		}
	}
}

</script>

