/*消息确认弹框*/

<template>
    <div class="ui-modal" :class="{hide:!isShow}">
        <div class="modal-header">
            <h3>{{title}}</h3>
        </div>
        <div class="modal-con2" v-html="content">
        </div>
        <div class="modal-btn">
            <a class="btn-cancel2" href="javascript:;" @click="close">取消</a>
            <a class="btn-confirm2" href="javascript:;" @click="confirm">{{confirmtxt}}</a>
        </div>
    </div>
</template>


<script>
    export default {
        data:function(){
            return {
                isShow : false,
                content:'',
                title :'',
                confirmtxt :'',
                onClose:function(){}
            };
        },
        methods : {
            close : function(){
                this.isShow = false;
            },
            confirm : function(){
                this.isShow = false;
                this.onClose();
                // this.$dispatch("confirm");
            },
            show : function(content,title,confirmtxt, onClose){
                this.isShow = true;
                this.content = content;
                this.title = title;
                this.confirmtxt = confirmtxt;
                if(onClose && typeof(onClose) == 'function'){
                    this.onClose = onClose;
                }
            }
        }
    }
</script>

