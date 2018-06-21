

export default{
	    methods : {
        editAddFixSendPerson : function(){
        	editVueMixin.methods.addFixSendPerson.call(this.$root);
        },
        editAddApplyPerson : function(){
             this.$store.dispatch('addFixSendPerson');
             // editVueMixin.methods.addApplyPerson.call(this.$root);
        },
        pickPhoto : function(){
            editVueMixin.methods.pickPhoto.call(this.$root);
        },

        editPickPhotoByAlbum : function(){
  			editVueMixin.methods.pickPhotoByAlbum.call(this.$root);
        },

        editPickPhotoByCamera : function(){
            editVueMixin.methods.pickPhotoByCamera.call(this.$root);
        },

        // 上传语音
        eidtUploadSound : function(){
            editVueMixin.methods.uploadSound.call(this.$root);
        },
        
        eidtClosePage:function(){
        	sys_closeActivity();
        },

        submit : function(){
            if(!this.allowSubmit){
                return;
            }
            console.log('提交数据')
            if(this.hasLinkBill){
                sys_formfirstcommit(this.hasLinkBill);
            }else{
                 sys_formfirstcommit();
            }
        },

        //显示提示弹框
        showMassegePop : function(){
            this.$refs.showmsg.shows();
        },
        showCheckPop : function(){
            this.$refs.showcheck.popShow();
        },
        getAvatarSrc : function(code){
            return UtilHelper.becomeAvatarSrc(code);
        }


		,cancelStep:function(){
			detailVueMixin.methods.cancelStep.call(this);
		},
		receiptModify:function(){
			detailVueMixin.methods.receiptModify.call(this.$root);
		},
		gotoApproval:function(type){
			if(this.enable == 0){
                return;
            }
            this.$root.sRemark = '';
            if(type == 'agree'){
                this.$root.submitApprovalState = 1;
                return this.step = 1;
            }
            if(type == 'reject'){
                this.$root.submitApprovalState = 2;
                return this.step = 2;
            }
		}


		,detailUploadSound:function(){
			detailVueMixin.methods.uploadSound.call(this.$root);

		},detailAddApproverSend:function(){ // 详情页面，增加抄送人
			detailVueMixin.methods.addApproverSend.call(this.$root);
		},detailAddApproverNext:function(){ // 详情页面，增加审批人
			detailVueMixin.methods.addApproverNext.call(this.$root);
		},detailDoApproval:function(){
			detailVueMixin.methods.doApproval.call(this.$root);
		},detailSetFixSendPerson:function(){
			detailVueMixin.methods.setFixSendPerson.call(this.$root);
		},
		lookPerson:function(code){
			detailVueMixin.methods.lookPerson.call(this.$root,code);			
		},detailAddFixSendPerson:function(){
			detailVueMixin.methods.addFixSendPerson.call(this.$root);
		},detailGotoDelSendPerson:function(){
			detailVueMixin.methods.gotoDelSendPerson.call(this.$root);
		}




    }
}