/* 拖拽控件 */

<template>
     <div >
        <div v-sortable:fixMembers="{animation: 150,forceFallback: false, filter: '.ignore', draggable : '.avatar',handle:'.avatar',disabled:!allowedit,onEnd:onEnd,dragable:apply}" style="display:inline">
               <div class="avatar"  v-for="row in items" name="{{row.code}}" :class="getIgnores($index)"  >
                  <ximg :xsrc="getSrc(row.code)"></ximg>
                  <span class="name">{{ row.name }}</span>
                  <ins v-if="allowedit" class="icon-del" @click="del($index)"></ins>
               </div>
        </div>
       <a v-if="allowedit" class="fn-btn-add" href="javascript:;" @click="add"></a>
    </div>
</template>

<script>
export default {
    props:{
        items:{type:Array,default:function(){return [{name:'测试',code:111},{name:'测试1',code:222}]}},
        allowedit:{type:[String,Number,Boolean],default:function(){return false}},
        apply:[String,Number,Boolean]
    },
    methods : {
        add : function(){
            console.log('add')
            this.$dispatch('add');
        },
        del : function(i){
            if(this.allowedit){
                this.items.splice(i, 1);
                this.$dispatch('del', i, 'edit');
            }
        },
        getSrc : function(code){
            return UtilHelper.becomeAvatarSrc(code);
        },
        getIgnores : function(i){
            // console.log(i)
            if(i > 0 && i < this.items.length-1){
                if(this.items[i - 1].code == this.items[i + 1].code){
                    return 'ignore';
                }else{
                    return '';
                }
            }else{
                return '';
            }
        },onEnd:function (event){
            // this.$dispatch('draggable-end',index);
            var newValue = this.items[event.newIndex];
            var oldValue = this.items[event.oldIndex];
            this.items.$set(event.newIndex,oldValue )
            this.items.$set(event.oldIndex,newValue )
            return true;  
        }
    }
}

</script>













