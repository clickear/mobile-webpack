

export default{
	    methods : {
        editAddFixSendPerson : function(){
        	editVueMixin.methods.addFixSendPerson.call(this.$root);
        },
        editAddApplyPerson : function(){
            editVueMixin.methods.addApplyPerson.call(this.$root);
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
            return becomeAvatarSrc(code);
        }
    }
}