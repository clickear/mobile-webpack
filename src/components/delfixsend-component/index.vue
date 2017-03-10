/* 详情 删除抄送人 */

<template>
    <div v-show="step == 3" style="padding-top: 70px;">
        <div class="receipt-add">
            <div class="avatar" v-for="(row,index) in delsendpersonarr" @click="delsendpersonarr.splice(index, 1)">
               <ximg :xsrc="getSrc(row.code)"></ximg>
               <span class="name">{{ row.name }}</span>
            </div>
        </div>
    </div>
</template>

<script >
export default{
    props: ['step', 'delsendpersonarr'],
    methods:{
        getSrc : function(code){
            return UtilHelper.becomeAvatarSrc(code);
        },
    }
}
</script>
