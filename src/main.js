import jqueryui from 'jqueryui'
import page from './page/pageinit.js'

Global.HostUrl = 'http://testwork.nd/'

var isEdit = true;

if(isEdit){
    window.initData = require('./mobile/leave/edit.json')
}else{
    window.initData = require('./mobile/leave/mock.json')
}

var fromWeb  = true;
if(fromWeb){
    SetFormAndNodeStateHtml();
}else{
SetFormAndNodeStateHtmlCall(initData);
// SetFormAndNodeStateHtml();


Global.CurrentPerson = {name:'当前人员',code:199186}



window.cloundOfficeApp = new Vue({
    el:'#cloundOfficeApp',
    data:{    
        FlowState:initData.FlowState, 
        ApproverState:initData.ApproverState,
        ViewType:initData.ViewType,
        Enable:!!initData.Enable,

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
        },
        select_cfg:{
            data: [
                { value: '1', text: '中国', key: 'zg,zhongguo' },
                { value: '2', text: '日本', key: 'rb,riben' },
                { value: '3', text: '韩国', key: 'hg,hanguo' },
                { value: '4', text: '美国', key: 'mg,meiguo' },
                { value: '5', text: '英格兰', key: 'ygl,yinggelan' },
                { value: '6', text: '法国', key: 'fg,faguo' },
                { value: '7', text: '米国', key: 'mg,miguo' },
                { value: '8', text: '英格兰', key: 'ygl,yinggelan' },
                { value: '9', text: '法国', key: 'fg,faguo' },  
                { value: '10', text: '英格兰', key: 'ygl,yinggelan' },
                { value: '11', text: '法国', key: 'fg,faguo' },

            ],  
            selectItem:[],
            value:''
        },
        radio_cfg:{
             radios: [
                        {
                            label: '小学', value: '1',
                            checkEvent: function (ev, vm, radio) {
                                console.log('小学radio checked:');
                                console.log(vm.getData().label);
                            },
                            changeEvent: function (ev, vm, radio) {
                                console.log('小学radio changed:' + vm.value);
                            }

                        },
                        { label: '初中',  value: '2' },
                        { label: '高中', value: '3' },
                        { label: '大学', enable: false, value: '4' }
                    ]
                },
        check_cfg:{
             checkboxes: [  
                        {
                            label: '小学', value: '1',
                            checkEvent: function (ev, vm, radio) {
                                console.log('小学radio checked:');
                                console.log(vm.getData().label);
                            },
                            changeEvent: function (ev, vm, radio) {
                                console.log('小学radio changed:' + vm.value);
                            }

                        },
                        { label: '初中',  value: '2' },
                        { label: '高中', value: '3' },
                        { label: '大学', enable: false, value: '4' }
                    ]
                }

    },
    methods:{
        getFormData(){
            var data = {};
            for (var k in this.$refs) {
                var comp = this.$refs[k];
                if (comp.name != undefined && comp.name != '' && comp.getValue != undefined) {
                    data[comp.name] = comp.getValue();
                }
            }
            return data;
        },
        formCheck(){
            cloundOfficeApp.$broadcast('form-check')
        }
    }
}) 
}
