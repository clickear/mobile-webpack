/*消息提示*/

<template>
    <!-- 消息提示框 -->
    <div class="fn-tip2-modal" data-status="{{type}}" v-show="isShow">
       <p class="txt">
        <ins v-if="type" class="tip-icon"></ins>
       <span>{{msg}}</span>
       </p>
    </div>
</template>

<script>
    export default {
         data : function(){
                return {
                    isShow : false,
                    type:'',
                    msg:'',
                    onClose:function(){}
                };
            },
            methods:{
                show(msg, duration, type, onClose){
                    var self = this;
                    self.msg = msg;
                    self.type = type;
                    self.isShow = true;
                    if(onClose && typeof onClose == 'function'){
                        this.onClose = onClose;  
                    }

                    duration = duration*1000;

                    if(duration>0){
                        setTimeout(function(){
                            self.isShow = false;
                            self.onClose();
                        }, duration);
                    }
                },
                close(){
                    this.isShow = false;
                    this.onClose();
                }
            }
    }

</script>
