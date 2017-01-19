
<template>
	<div class="ly-header" >
		<template v-if="isedit">
			<a class="l" @click="eidtClosePage" href="javascript:;" >取消</a>
        	<h2>{{formname}}</h2>
		</template>
		<template v-else>
			<a class="btn-back" @click="cancelStep" href="javascript:;"></a>
		    <h2>{{titleLabel}}</h2>
		    <!-- <a class="r2" v-show="step == 4" @click="submitReminder" href="javascript:;">提交</a> -->
		    <!-- <a class="btn-msg" href="javascript:;"></a> -->
		    <a v-show="step == 3" class="r" @click="detailSetFixSendPerson" href="javascript:;" >确定</a>
		</template>
    </div>

	<!-- 查看详情 -->
	<template v-if="isedit || step == 0">
	    <div class="scroll-bd">
	    	<div class="layout-bd">
	    		<template v-if="!isedit">
	    			<div class="receipt-relate">
			            <div style="position: relative; padding: 6px 7px 0;">
			                <div class="avatar">
			                    <!--用户头像组件-->
			                    <ximg @click="lookPerson(spersoncode)" :xsrc = "getAvatarSrc(spersoncode)"></ximg>
			                    <!--/用户头像组件-->
			                </div>
			                <p class="name">{{ spersonname }}</p>
			                <!-- 单据状态 -->
			                <receipt-status
			                    :enable = "enable"
			                    :viewtype = "viewtype"
			                    :flowstate = "flowstate"
			                    :approvalstate = "approvalstate">
			                </receipt-status>
			                <!-- /单据状态 -->
		                </div>
			        </div>
	    		</template>

	    		<div class="receipt" :class="{'receipt-create':isedit}">
					<slot ></slot>
					<div class="edit-content">
						<div class="add-media" v-show="isedit">
		                    <a class="pic-btn" v-show="uploadpicarr.length < 20" @click="showphotos = true" href="javascript:;"></a>
		                    <a class="voice-btn" v-show="uploadsoundarr.length == 0" @click="eidtUploadSound" href="javascript:;"></a>
		                </div>

		                <div class="receipt-reason" v-show="uploadpicarr.length>0 || uploadsoundarr.length >0">
		                    <audio-player :allowedit="isedit" :items='uploadsoundarr'></audio-player>
		                    <photo-slide :allowedit="isedit" :resize="!isedit" :items="uploadpicarr"></photo-slide>
		                </div>  

						<div class="receipt-add" v-show="isedit">
		                    <h3>抄送:</h3>
		                    <fix-memberpicker :allowedit="true" :items="fixsendpersonarr" @add="editAddFixSendPerson"></fix-memberpicker>
		                </div>

		                <div class="receipt-add audit" v-show="isedit">
		                    <h3>审批人员：</h3>
							<drag-memberpicker :apply="true" :allowedit="true" :items="fixnextpersonarr" @add="editAddApplyPerson" ></drag-memberpicker>
					    </div>
					</div>
						    
				    <div class="receipt-content" v-if="!isedit"> 
		                <!-- 审批记录 -->
		                <record-items
		                    :viewtype = "viewtype"
		                    :items = "approvalrecord"
		                    :donotremind = "false"
		                    :donotlookperson = "false"
		                    :flowstate = "flowstate">
		                </record-items>  
		                <!-- /审批记录 -->

                        <div class="receipt-add" v-if="fixsendpersonarr.length>0 || viewtype == 1">
				            <h3 v-if="!(fixsendpersonarr.length == 0 && flowstate > 1)">抄送对象:</h3>
				            <div class="avatar" v-for="row in fixsendpersonarr">
				                <ximg @click="lookPerson(row.code)" :xsrc="getAvatarSrc(row.code)"></ximg>
				                <span class="name">{{ row.name }}</span>
				            </div>

				            <template v-if="flowstate == 1 && viewtype == 1 ">
					            <a class="fn-btn-add" href="javascript:;" @click="detailAddFixSendPerson"></a>
					            <a v-show="fixsendpersonarr.length != 0" class="fn-btn-minus" href="javascript:;" @click="detailGotoDelSendPerson"></a>
				            </template>

					        </div>
					    </div>


	                </div>
	            </div>


		<!--                     <fix-memberpicker :apply="true" :allowedit="true" :items="fixnextpersonarr" @add="editAddApplyPerson"></fix-memberpicker> -->



			    <div class="layout-fd" v-show="isedit">
				    <a class="fn-btn" href="javascript:;" @click="submit" :data-action="allowSubmit? '':'disable' ">提交</a>
				</div>
	    	</div>
		     <!-- 详情操作 -->
		     <template	v-if="!isedit">
			    <detail-operation 
			        :enable="enable"
			        :viewtype="viewtype"
			        :flowstate="flowstate"
			        @modify='receiptModify'
			        @approval='gotoApproval'>
			    </detail-operation>
		     </template>
		    <!-- /详情操作 -->
	        

	    </div>
	</template>
	<upload-images
        :show.sync="showphotos"
        @camera = "editPickPhotoByCamera"
        @album = "editPickPhotoByAlbum">
    </upload-images>

	<photoswipe-gallery></photoswipe-gallery>
	

	<!-- 审批 -->
	<approval-component
	    :step = 'step'
	    :sremark.sync = 'sremark'
	    :isautoflow = 'isautoflow'
	    :approversendperson = 'approversendperson'
	    :approvernextperson = 'approvernextperson'
	    :approveruploadsound = 'approveruploadsound'
	    :isdontneedsend=false
	    @submit='detailDoApproval'
	    @uploadsound = 'detailUploadSound'
	    @addapproversend="detailAddApproverSend"
	    @addapprovernext="detailAddApproverNext">
	</approval-component>
	<!-- /审批 -->

	<!-- 删除抄送 -->
	<delfixsend-component
	    :step="step"
	    :delsendpersonarr = 'delsendpersonarr'>
	</delfixsend-component>
	<!-- /删除抄送 -->


</template>


<script>

import baseMixin from '../../mixins/base.mixin'

export default {
	props:{
		isedit:{
			type:Boolean,
			default:false
		},
		step:{
			type:Number,
			default:0
		},fixnextpersonarr:{
			type:Array,
			default:function(){return []}
		},fixsendpersonarr:{
			type:Array,
			default:function(){return []}
		},uploadpicarr:{
			type:Array,
			default:function(){return []}
		},uploadsoundarr:{
			type:Array,
			default:function(){return []}
		},showphotos:{
			type:Boolean,
			default:false
		},formname:{
			type:String,
			default:'表单'
		},flowstate:{
			type:[Number,String]
		},viewtype:{
			type:[Number,String]
		},approvalstate:{
			type:[Number,String]
		},
		isautoflow:{
			type:[Number,String]
		},
		sremark:{
			type:String,
			default:''
		},
		enable:{
			type:[Number,String,Boolean]
		},spersoncode:{
			type:[Number,String]
		},spersonname:{
			type:[Number,String]
		},approvalrecord:{
			type:Array,
			default:function(){return []}
		},approveruploadsound:{
			type:Array,
			default:function(){return []}
		},approversendperson:{
			type:Array,
			default:function(){return []}
		},approvernextperson:{
			type:Array,
			default:function(){return []}
		},delsendpersonarr:{
			type:Array,
			default:function(){return []}
		}
	},
	data(){
		return {
			titleArr : [this.formname, '同意', '拒绝', '编辑抄送人', '催审'],
			clickSubmit:false
		}
	},methods:{
		submit(){
			// cloundOfficeApp.$broadcast('form-check');
			this.clickSubmit = true;
			const isValid = this._checkValid();
			this.allowSubmit = isValid; 
			if(isValid){
				sys_formfirstcommit(null,this.getFormData())
				console.log(this.getFormData())
			}else{
				this.$Pop.popMessage.warning('请验证提交项')
			}

		},
		 getFormData(){
            var data = {};
            for (var k in this.$root.$refs) {
                var comp = this.$root.$refs[k];
                if (comp.name != undefined && comp.name != '' && comp.getValue != undefined) {
                    data[comp.name] = comp.getValue();
                }
            }
            return data;
        },
        _checkValid(){
        	var vm = this.$root;
        	var result = true;
            var isFirstError = false;

          //  if(!this.clickSubmit) return true;
            for (var k in vm.$refs) {
                var comp = vm.$refs[k];
                if (comp.validValue != undefined) {
                    comp.validValue();
                    if (comp.isValid === false ) {
                    	// todo compType 类型
                        if (!isFirstError && comp.compType === 'textbox' && !comp.readonly ) {
                           // comp.getError();
                            isFirstError = true;
                        }
                        result = false;
                        if (vm.validErrorEvent && vm.validErrorEvent instanceof Function) {
                            vm.validErrorEvent(vm);
                        }
                        // if (!vm.validAll)
                        //     break;
                    }
                }
            }
            return result;
        }
		
	},
	mixins : [baseMixin],
	events:{
		'on-change':function(){
			const isValid = this._checkValid();
			this.allowSubmit = isValid;
		}
	},
	computed:{
		allowSubmit(){
			return this._checkValid();
		},                
		titleLabel(){
            return this.titleArr[this.step];
        }
	}
}


</script>