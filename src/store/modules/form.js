import * as types from '../mutation-types' 

// state
const state = {
	fixNextPersonArr:[],
	fixsendpersonarr:[],
	approveruploadsound:[],
	approvernextperson:[],
	approversendperson:[],
	delsendpersonarr:[],
	uploadsoundarr:[],
	uploadpicarr:[],
	CurrentPerson:{name:'sf',code:950716},
	sautoflow:false,
}

//actions
const actions = {
	/**
	 * 提交表单时，增加抄送人。 直接调用原生的选人控件。返回一个数组。
	 * @param {[Function]} options.commit [提交action]
	 * @param {[type]} options.state  [description]
	 */
	editAddSendPerson({commit,state}){
		var canotChoose = [];
		canotChoose.push(Global.CurrentPerson)
		sys_getSelectMultiplePerson(state.fixsendpersonarr,canotChoose,function(per){   
			commit(types.FORM_ADD_FIXSENDPERSON,per);
		});
	},
	/**
	 * 删除固定抄送人
	 * @param  {[type]} options.commit [description]
	 * @param  {[type]} options.state  [description]
	 * @param  {Number} index          要删除的索引index
	 * @return {[type]}                [description]
	 */
	editDelSendPerson({commit, state}, index){
		commit(types.FORM_DEL_FIXSENDPERSON, index);
	},
	/**
	 * 提交时，固定审批人添加
	 * 规则：最多20个人审批。并且首节点和最后一个人不能与添加人相同。
	 * @param  {[type]} options.commit [description]
	 * @param  {[type]} options.state  [description]
	 * @return {[type]}                [description]
	 */
	editAddApplyPerson({commit, state}){
		var self = this;
		if(state.fixNextPersonArr.length < 20){
			sys_getSelectPerson(function(pers){
				// 单选，每次只能选一个。
				if(pers){
					let person = pers[0];
					var len = state.fixNextPersonArr.length;
					if(len == 0){
						if(person.code == state.CurrentPerson.code){
                         return;
                   		}else{
                   			commit(types.FORM_ADD_FIXAPPROVER, pers);
                   		}
					}else{
						if(state.fixNextPersonArr[len-1].code == pers[0].code){
							return;
						}
						commit(types.FORM_ADD_FIXAPPROVER, pers);
					}
				}

			});
		}
	},
	/**
	 * 删除固定审批人
	 * @param  {[type]} options.commit [description]
	 * @param  {[type]} index          [description]
	 * @return {[type]}                [description]
	 */
	editDelApplyPerson({commit}, index){
		commit(types.FORM_DEL_FIXAPPROVER, index);
	},
	dragApplyEnd({commit, state}, event){
		let newIndex = event.newIndex;
		let oldIndex = event.oldIndex;
		var newValue = state.fixNextPersonArr[newIndex];
		var oldValue = state.fixNextPersonArr[oldIndex];

		debugger;
		// 临时数组，进行比较相邻
		let tempCompare = [].concat(state.fixNextPersonArr);
		tempCompare.splice(oldIndex,1);
		oldValue = Object.assign({}, oldValue)    
		tempCompare.splice(newIndex,0,oldValue)

		for(var i =0; i < tempCompare.length; i++){
		    if(i<tempCompare.length-1){
		        if(tempCompare[i].code == tempCompare[i+1].code){
		        	commit(types.FORM_DRAG_FIXAPPROVER, event);	           
		            return false;
		        } 
		    }
		}
		debugger;
		commit(types.FORM_CHANGE_FIXAPPROVER, event);

		
	}
}


// mutations
const mutations = {
	// 添加抄送人
	[types.FORM_ADD_FIXSENDPERSON](state,person){
		state.fixsendpersonarr = person;
	},
	// 删除抄送人
	[types.FORM_DEL_FIXSENDPERSON](state, index){
		state.fixsendpersonarr.splice(index,1);
	},
	// 添加审批人
	[types.FORM_ADD_FIXAPPROVER](state, person){
		state.fixNextPersonArr = state.fixNextPersonArr.concat(person);
	},
	// 删除审批人
	[types.FORM_DEL_FIXAPPROVER](state, index){
		state.fixNextPersonArr.splice(index, 1);
	},
	// 固定审批人拖拽结束
	[types.FORM_DRAG_FIXAPPROVER](state, event){
		debugger;
		let newIndex = event.newIndex;
		let oldIndex = event.oldIndex;
		let newValue = state.fixNextPersonArr[newIndex];
		let oldValue = state.fixNextPersonArr[oldIndex];
 		Vue.set(state.fixNextPersonArr, newIndex, newValue);
		Vue.set(state.fixNextPersonArr, oldIndex, oldValue);
	},
	[types.FORM_CHANGE_FIXAPPROVER](state, event){
		debugger;
		let newIndex = event.newIndex;
		let oldIndex = event.oldIndex;
		let oldValue = state.fixNextPersonArr[oldIndex];
		state.fixNextPersonArr.splice(oldIndex,1);
		oldValue = Object.assign({}, oldValue)    
		console.log(JSON.stringify(oldValue))
		state.fixNextPersonArr.splice(newIndex,0,oldValue)
	}
}

export default {
  state,
  actions,
  mutations
}
