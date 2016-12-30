import jqueryui from 'jqueryui'
import page from './page/pageinit.js'
import Custom from './demo/Custom.vue'

import group from 'components/group/index.vue'
import ndinput from 'components/nd-input/index.vue'
import ndtextbox from 'components/nd-textbox/index.vue'
import ndform from 'components/nd-form/index.vue'

import vali from 'validator'
window.vali = vali;

Global.HostUrl = 'http://testwork.nd/'

var isEdit = true;

if(isEdit){
    window.initData = require('./mobile/leave/edit.json')
}else{
    window.initData = require('./mobile/leave/mock.json')
}



 SetFormAndNodeStateHtmlCall(initData);
  // SetFormAndNodeStateHtml();

// Global.CurrentPerson = {name:'当前人员',code:199186}

window.cloundOfficeApp = new Vue({
    el:'#cloundOfficeApp',
    data:{

        allowedit:true,
        inputValue:'',
        input:'input',
        readonly:false,

        FlowState:initData.FlowState, 
        ApproverState:initData.ApproverState,
        ViewType:initData.ViewType,
        Enable:initData.Enable,

        sPersonCode : initData.sPersonCode || 0,
        sPersonName : initData.sPersonName || '',
        sRemark : '',

        ApproverList: initData.approvalRecord || [], 


        IsEdit : isEdit ,        // 编辑状态，还是查看状态
        FormName: initData.FormName || '表单',              // 表单名称
        IsAutoFLow :  initData.IsAutoFLow, // 是否自由流程， 1是
        sAbstract : '',   

                                               //摘要
        uploadSoundArr : initData.uploadSoundArr || [],       // 录音上传地址
        uploadPicArr : initData.uploadPicArr || [],         // 图片上传地址
        fixSendPersonArr : initData.fixSendPersonArr || [],     // 申请时抄送人
        fixNextPersonArr : initData.fixNextPersonArr || [],      // 申请时下一个审批人
        approverUploadSound:initData.approverUploadSound || [],     // 同意拒绝时录音
        approverSendPerson:initData.approverSendPerson || [],

        approverNextPerson:initData.approverNextPerson || [],
        delSendPersonArr:initData.delSendPersonArr || [],

        showPhotoPicker:false,
        submitApprovalState:0,
        sRemark:'', //审批或者驳回意见

        step:0,


        test_cfg:{
            'beformEvent':function(){
                console.log('testconfig');
            },
            'clickEvent':function(vm){
                console.log('clickEvent')
            }
        }
    },


    events:{
        'draggable-end':function(event){
                var newValue = this.FixArray[event.newIndex];
                var oldValue = this.FixArray[event.oldIndex];
                this.FixArray.$set(event.newIndex, oldValue )
                this.FixArray.$set(event.oldIndex, newValue )
        }
    },
    methods:{
        getFormData(){
            var data = {};
            for (var k in this.$refs) {
                var comp = this.$refs[k];
                debugger;
                if (comp.name != undefined && comp.name != '' && comp.getValue != undefined) {
                    data[comp.name] = comp.getValue();
                }
            }
            return data;
        },
        formCheck(){
            cloundOfficeApp.$broadcast('form-check')
        }
    },
    components:{Custom, group, ndinput, ndtextbox, ndform}
})

 

//SetFormAndNodeStateHtml();


// $(document).ready(function() {
//     moment.locale('zh-cn');
// });

// var originData = {
//     dStartDate: {
//         type: 'date',
//         value: ''
//     },
//     dEndDate: {
//         type: 'date',
//         value: ''
//     },
//     lAllTime: 8,
//     reason: '',
//     uploadSoundArr: [],
//     uploadPicArr: [],
//     fixSendPersonArr: [],
//     kqItemId: 0
// };

// var confirmPop = {};

// function initConfirmPop(callback) {
//     confirmPop.callback = callback;
// }

// var APP = {
//     init: function(obj) {
//         var receiptData = {
//             IsAutoFLow: 0,
//             kqItemId: 0,
//             dStartDate: '',
//             dEndDate: '',
//             lAllTime: 8,
//             reason: '',
//             uploadSoundArr: [],
//             uploadPicArr: [],
//             fixSendPersonArr: [],
//             fixNextPersonArr: []
//         };

//         if (obj && obj.data) {
//             for (var i in receiptData) {
//                 if (obj.data[i] != undefined) {
//                     receiptData[i] = obj.data[i];
//                 }
//             }
//         }
//         for (var i in originData) {
//             if (originData[i].type) {
//                 originData[i].value = receiptData[i];
//             } else {
//                 if (toString.apply(receiptData[i]) === '[object Array]') {
//                     originData[i] = JSON.parse(JSON.stringify(receiptData[i]));
//                 } else {
//                     originData[i] = receiptData[i];
//                 }
//             }
//         }
//         cloundOfficeApp = new Vue({
//             el: '#cloundOfficeApp',
//             data: {
//                 step: 1,
//                 IsAutoFLow: receiptData.IsAutoFLow, // 是否自由流程， 1是
//                 showKqItemArr: false,
//                 kqItemArr: ['年假', '事假', '病假', '婚假', '产假', '调休', '丧假', '其他'],
//                 keywordsArr: ['陪产', '医院待产', '生病', '家中有事', '结婚筹备', '手术'],
//                 kqItemName: '年假',
//                 sAbstract: (receiptData.lAllTime || 8) + "小时",
//                 kqItemId: receiptData.kqItemId, // 请假单类型id
//                 dStartDate: receiptData.dStartDate, // 请假单开始时间
//                 dEndDate: receiptData.dEndDate, // 请假单结束时间
//                 lAllTime: receiptData.lAllTime, // 请假总时长
//                 reason: receiptData.reason, // 请假原因
//                 uploadSoundArr: receiptData.uploadSoundArr, // 录音上传地址
//                 uploadPicArr: receiptData.uploadPicArr, // 图片上传地址
//                 fixSendPersonArr: receiptData.fixSendPersonArr, // 申请时抄送人
//                 fixNextPersonArr: receiptData.fixNextPersonArr, // 申请时下一个审批人
//                 // approvalRecord : [],       // 审批记录
//                 // approverSendPerson : [],   // 审批时，抄送人
//                 // approverNextPerson : [],   // 审批时，加审的审批人
//                 // approverUploadSound : []  // 审批时，上传录音
//                 showPhotoPicker: false,
//                 massegeType: 'warn', //消息提示类型
//                 massegeText: '警告内容警告内容', //消息提示内容
//                 checkContent: '<p class="mb10 tc">确认退出当前页面</p>', //消息确认内容
//                 checkTitle: '', //消息确认标题
//                 checkConfirmTxt: '确定' //消息确认右下按钮名称
//             },
//             watch: {
//                 kqItemId: function(val) {
//                     this.kqItemName = this.kqItemArr[val];
//                 },
//                 lAllTime: function(t) {
//                     this.sAbstract = t + " 小时";
//                 }
//             },
//             computed: {
//                 allowStep: function() {
//                     return (this.lAllTime > 0 && parseInt(moment(this.dEndDate).format("X")) >= parseInt(moment(this.dStartDate).format("X")) + 1800);
//                 },
//                 allowSubmit: function() {
//                     if (this.reason.trim().length < 1) {
//                         return false;
//                     }
//                     /*if(this.IsAutoFLow){
//                         // 自由流程
//                         return (this.fixNextPersonArr.length > 0);
//                     }*/
//                     return true;
//                 }
//             },
//             mixins: [editVueMixin],
//             methods: {
//                 prevStep: function() {
//                     var step = this.step;
//                     if (step > 0) {
//                         this.gotoStep(step - 1);
//                     }
//                 },
//                 gotoStep: function(i) {
//                     this.step = i;
//                     if (i == 2) {
//                         setTimeout(InitDatepicker, 20)
//                     }
//                 },
//                 selectType: function(i, eventFrom) {
//                     this.kqItemId = i;
//                     if (eventFrom == 1) {
//                         this.showKqItemArr = false;
//                     } else {
//                         this.gotoStep(2);
//                     }
//                 },
//                 openKqItemArr: function() {
//                     this.showKqItemArr = true;
//                 },
//                 checkConfirm: function() {
//                     confirmPop.callback && confirmPop.callback();
//                 },
//                 closePage: function() {
//                     if (!hadDataChange(cloundOfficeApp.$data)) {
//                         setCheckPop({
//                             content: '<p class="mb10 tc">已经输入数据，取消后将无法保存，确认关闭？</p>',
//                             confirm: function() {
//                                 sys_closeActivity();
//                             }
//                         });
//                     } else {
//                         sys_closeActivity();
//                     }
//                 },
//                 getFormatStr: function(date) {
//                     return moment(date).format('ddd MM-DD <br> HH:mm');
//                 },
//                 getAllTime: function(parama) {
//                     if (parama >= 8) {
//                         var day = Math.floor(parama / 8);
//                         var h = parama % 8;
//                         if (h == 0) {
//                             return '<span class="num">' + day + '</span>天';
//                         } else {
//                             return '<span class="num">' + day + '</span>天<span class="num">' + h + '</span>小时';
//                         }
//                     } else {
//                         return '<span class="num">' + parama + '</span>小时'
//                     }
//                 }
//             },
//             ready: function() {

//             }
//         });

//         if (obj && obj.step) {
//             cloundOfficeApp.gotoStep(obj.step);
//         }
//     }
// }

// var isDatePickerInit = false;

// function InitDatepicker() {
//     if (isDatePickerInit) return;
//     var defStartTime, defEndTime;
//     if (cloundOfficeApp.dStartDate.length) {
//         // 已有数据
//         defStartTime = new Date(moment(cloundOfficeApp.dStartDate).format("YYYY/MM/DD HH:mm"));
//         defEndTime = new Date(moment(cloundOfficeApp.dEndDate).format("YYYY/MM/DD HH:mm"));
//     } else {
//         // 如果是新建表单
//         var curTime = new Date();
//         defStartTime = new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate() + 1, '09', '00')
//         defEndTime = new Date(curTime.getFullYear(), curTime.getMonth(), curTime.getDate() + 1, '18', '00')
//     }

//     var carouselDatepicker = new CarouselDatepicker({
//         id: "dStartTime",
//         currDate: defStartTime,
//         beginDate: new Date('2010/12/12 10:00'),
//         endDate: new Date('2050/12/12 10:00'),
//         format: 'yyyy/MM/dd HH:mm',
//         onValueChange: function(value) {
//             cloundOfficeApp.dStartDate = moment(new Date(value)).format("YYYY/MM/DD HH:mm");
//         }
//     });

//     var carouselDatepicker = new CarouselDatepicker({
//         id: "dEndTime",
//         currDate: defEndTime,
//         beginDate: '1990/12/12 10:00',
//         endDate: '2050/12/12 10:00',
//         format: 'yyyy/MM/dd HH:mm',
//         onValueChange: function(value) {
//             cloundOfficeApp.dEndDate = moment(new Date(value)).format("YYYY/MM/DD HH:mm");
//         }
//     });

//     cloundOfficeApp.dStartDate = moment(defStartTime).format("YYYY/MM/DD HH:mm");
//     cloundOfficeApp.dEndDate = moment(defEndTime).format("YYYY/MM/DD HH:mm");

//     isDatePickerInit = true;
// }

// initStepBack = 3;
// // debug
// if (false) {
//     // 创建
//     APP.init()
// } else {
//     // 编辑
//     var initStep = 1;
//     if (initData.HasData) {
//         initStep = 3;
//     }
//     APP.init({
//         step: initStep,
//         data: initData
//     })
// }