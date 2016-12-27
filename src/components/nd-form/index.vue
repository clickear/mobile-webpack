
<template>
	<div class="ly-header" v-show="step == 1">
        <a class="l" @click="closePage" href="javascript:;" >取消</a>
        <h2>报销申请单</h2>
    </div>
    <div class="scroll-bd">
    	<div class="layout-bd">
    		<div class="receipt receipt-create">
				<slot ></slot>
				 <div class="edit-content">
					<div class="add-media">
	                    <a class="pic-btn" v-show="uploadpicarr.length < 20" @click="showpthtos = true" href="javascript:;"></a>
	                    <a class="voice-btn" v-show="uploadsoundarr.length == 0" @click="eidtUploadSound" href="javascript:;"></a>
	                </div>
	                <div class="receipt-reason">
	                    <audio-player :allowedit="true" :items='uploadsoundarr'></audio-player>
	                    <photo-slide :allowedit="true" :items="uploadpicarr"></photo-slide>
	                </div>
				</div>
				 <div class="receipt-add">
                    <h3>抄送:</h3>
                    <fix-memberpicker :allowedit="true" :items="fixsendpersonarr" @add="editAddFixSendPerson"></fix-memberpicker>
                </div>

                <div class="receipt-add audit">
                    <h3>审批人员：</h3>
                    <fix-memberpicker :apply="true" :allowedit="true" :items="fixnextpersonarr" @add="editAddApplyPerson"></fix-memberpicker>
                </div>
			</div>
    	</div>

	    <div class="layout-fd">
		    <a class="fn-btn" href="javascript:;" @click="submit" :data-action="allowSubmit? '':'disable' ">提交</a>
		 </div>
    </div>

	 <upload-images
        :show.sync="showpthtos"
        @camera = "pickPhotoByCamera"
        @album = "pickPhotoByAlbum">
    </upload-images>
	<photoswipe-gallery></photoswipe-gallery>

</template>


<script>

import baseMixin from '../../mixins/base.mixin'

export default {
	props:{
		step:{
			type:Number,
			default:1
		},fixnextpersonarr:{
			type:Array,
			default:function(){return []}
		},fixsendpersonarr:{
			type:Array,
			default:function(){return []}
		},
		uploadpicarr:{
			type:Array,
			default:function(){return []}
		},uploadsoundarr:{
			type:Array,
			default:function(){return []}
		},showpthtos:{
			type:Boolean,
			default:false
		}
	},
	data(){
		return {
			
		}
	},methods:{
		closePage(){

		},
		submit(){

		}
		
	},
	mixins : [baseMixin]
}


</script>