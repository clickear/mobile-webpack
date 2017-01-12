
<template>
    <ul class="receipt-list">
        <li v-for="item in items" :data-action="getAction(item.nodeState)">
            <h4>{{item.option}}</h4>
            <p class="t">{{getCompleTiemFormatStr(item.nodeState,item.completeTime)}}</p>
            <div class="avatar">
                <ximg @click="look(item.approverId)" :xsrc="getSrc(item.approverId)"></ximg>
                <span class="name">{{item.approverName}}</span>
            </div>
            <div class="opts" v-if="!donotremind">
                <a v-show="viewtype == 1 && item.nodeState == 1 && flowstate != 5" @click="gotoReminder(item)" href="javascript:;">催审</a>
            </div>
            <div class="opinion" v-if="item.contentStr && item.contentStr.length">
                <p class="p1">审批意见：</p>
                <p class="p2">{{ item.contentStr }} </p>
            </div>
            <audio-player :items="item.approverUploadSound" :allowedit="false"></audio-player>
            <div class="addition" v-if="item.approverSendPerson && item.approverSendPerson.length">
                <p class="s1">新增抄送人：<span class="s2" v-for="index in item.approverSendPerson">{{index.name}}</span></p>
            </div>
        </li>
    </ul>
</template>

<script >

export default {
    props : ['items', 'viewtype', 'flowstate','donotremind','donotlookperson'],
    methods : {
        getSrc : function(code){
            return UtilHelper.becomeAvatarSrc(code);
        },
        gotoReminder : function(data){
            // return this.$dispatch('gotoreminder', data)
            SopNative.urge(data.approverId, data.approverName)
        },
        getAction : function(row){
            return UtilHelper.receiptStatusCfg[row].action
        },
        look : function(code){
            if(!!!this.donotlookperson){
                SopNative.lookPersonInfo(code);
            }
        },
        getCompleTiemFormatStr:function(nodeState,completeTime){
            if(nodeState == 1){
                var result = UtilHelper.friendlyFormatDate(completeTime);;
                return result;
            }else{
                return completeTime;
            }
        }
    }
}
 
</script>
