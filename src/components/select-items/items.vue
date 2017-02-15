
<template>
  <template v-if="isShowOption">
  	<div class="nd-ui-btm-modal" id="container_{{id}}">
	  	<div class="ly-header">
	        <a class="btn-back" href="javascript:;" @click="closeList($event)"></a>
	        <h2>{{label || '请选择'}}</h2>
	    </div>
		<div class="bills" style="position: relative; padding-top: 50px;">
	        <!--
	        <div class="bills-header" style="position: relative;">
	            <input class="ipt-txt" type="text" placeholder="其他（10个字）" maxlength="10">
	            <a href="javascript:;">保存并选择</a>
	        </div>
	        -->
	        <div class="bills-content">
	            <ul class="bills-list">
	            	 <li v-for="el in items" >	     
							<a hidefocus="none" href="javascript:void(0)" :class="{'checked': isSelected(el[valuekey])}" :name="el[valuekey]" @click="selectOne($event, el[valuekey])">{{el[textkey]}}{{el.othertext}}</a>
	            	 </li>
	               
	            </ul>

	            <a v-show="multiple" javascript:"void(0)" class="nd-select-button" @click="saveValue($event)" >保存</a>
	            <h3 style="display: none;">我的添加</h3>
	            <ul class="bills-list" data-status="reduce">
	                
	            </ul>
	        </div>
	    </div>
    </div>
  </template>
</template>



<script>
function _interface(){}

export default{


	data(){
		return{
			items:[],
			isShowOption:true,
			multiple:false,
			textkey:'text',
			valuekey:'value',
			label:'',
			value:'',
			text:'',
			setValue:_interface
		}
	},
	created(){

	},
	methods:{
		setOption(opt){
			Object.assign(this,{
				multiple:false,
				textkey:'text',
				valuekey:'value',
				label:'请选择',
				setValue:_interface
			},opt);
		},
		closeList(){
			let vm = this;
			vm.isShowOption = false;
		},
		showItems(data, selectValue){
			let vm = this;
			vm.isShowOption = true;
			vm.value = selectValue;
			// vue array 
			vm.items = [];
			vm.items = data;
			vm.selectItem = [];
		},
		// 判断是否选中
		isSelected(val){
			let vm = this;
			let flag = false;

			let oldValueStr = ','+vm.value + ',';
			let newValueStr = ','+ val + ',';
			if(val !='' && oldValueStr.indexOf(newValueStr) >=0){
				return true;
			}
			return false;
		},
		selectOne(ev, val){
			let vm = this;
			// 多选
			if(vm.multiple){
				let isSelect = vm.isSelected(val);
				// 如果选中，则去除value的值
				var valArr = vm.value ? vm.value.split(',') : [];
				if(isSelect){
					for(var i=0; i< valArr.length; i++){
						if(valArr[i].toString() == val){
							valArr.splice(i, 1);
						}
					}
					vm.value = valArr.join(',');
				}else{
					valArr.push(val);
					vm.value = valArr.join(',');
				}
			}else{
				vm.isShowOption = false;  
				vm.value = val;
				vm.setValue(val);
			}
			console.log('选中某个值'+vm.value);
		},
		saveValue(ev){
			let vm = this;
			vm.isShowOption = false;
			vm.setValue(vm.value);
		}
	},
	ready(){
		
	},
	destory(){
		document.body.removeEventListener('click', function(){},false)
	}


}


</script>

<style lang="css">
	.nd-cell {
		background-color: #fff;
		margin-bottom: 23px;
    	border-bottom: 1px solid #eee;
		padding: 0px 15px;
	    position: relative; 
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    font-size: 17px;
	}

	.nd-cell-primary {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}

	.nd-label {
		font-size:15px;
	    color: #000;
	    display: block;
	    width: 105px;
	    word-wrap: break-word;
	    word-break: break-all;
	}

	.nd-select {
		-webkit-appearance: none;
	    border: 0;
	    outline: 0;
	    background-color: transparent;
	    width: 100%;
	    font-size: inherit;
	    height: 44px;
	    line-height: 44px;
	    position: relative;
	    z-index: 1;
	    padding-left: 15px;
	}

	.nd-cell-body:after {
		content: " ";
	    display: inline-block;
	    -webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	    height: 6px;
	    width: 6px;
	    border-width: 2px 2px 0 0;
	    border-color: #C8C8CD;
	    border-style: solid;
	    position: relative;
	    top: -2px;
	    position: absolute;
	    top: 50%;
	    right: 15px;
    	margin-top: -3px;
	}

	.nd-cell-right {
	    text-align: right;
	    color: #999999;
	}

	.nd-ui-btm-modal{
		position: absolute;
    	z-index: 1000;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
	}

	.nd-ui-btm-modal:before {
    content: '';
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #f3f4f8; }

    .nd-select-button{
    	display:block;
    	font-size: 17px;
    	text-align: center;
    }

</style>


