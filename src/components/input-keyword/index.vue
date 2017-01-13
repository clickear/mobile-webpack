/* 表单快捷输入 */

<template>
    <div class="usual-txt">
    <a :class="{'fn-btn-gray':true, 'active': current == row}" v-for="row in items" href="javascript:;" @click="select(row)">{{ row }}</a>
    </div>
</template>

<script>
export default{
    props : ['items', 'current'],
    methods : {
        select(row){
            if(this.current.length + row.length > 200){
                return;
            }
            this.current += row;
        }
    }
}
</script>