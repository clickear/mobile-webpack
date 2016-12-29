/** 单据详情 a[data-action=@]
 *  @success 通过
 *  @progress 审核中
 *  @reject 拒绝
 *  @revoke 撤销
 */
var receiptStatusVueCom = Vue.extend({
    props : ["enable", "viewtype", "flowstate", "approvalstate"],
    template :  '<a class="receipt-btn" data-action="{{status}}" href="javascript:;"></a>',
    computed : {
        status : function(){
            /* flowstate 0 为申请  1 审批中，2通过归档 3 拒绝归档 4（流程错误归档） 5 作废 */
            if(this.viewtype != 2){
                // 提交人和抄送人 根据flowstate
                return receiptStatusCfg[this.flowstate].action;
            }

            // 审批人查看状态下
            if(this.enable == 1){
                // 可编辑表示待审批
                return receiptStatusCfg[8].action;
            }

            // 不可编辑下 根据approvalstate
            if(this.approvalstate == 1){
                // 通过
                return receiptStatusCfg[7].action;
            }
            return receiptStatusCfg[3].action;
        }
    }
});

const receiptStatusCfg = {
    1: {
        action: 'progress',
        name: '正在审批中'
    },
    2: {
        action: 'success',
        name: '通过'
    },
    3: {
        action: 'reject',
        name: '拒绝'
    },
    4: {
        action: 'progress',
        name: '未开始'
    },
    5: {
        action: 'revoke',
        name: '已撤销'
    },
    6: {
        action: 'no-exist',
        name: '不存在'
    },
    7: {
        action: 'done',
        name: '已审'
    },
    8: {
        action: 'waiting',
        name: '待审'
    }
}

Vue.component('receipt-status', receiptStatusVueCom);