/*关联单据组件*/

<template>
    <div class="account" v-show="show">
        <div class="item" v-for="row in data">
            <span class="s2">出差单</span>
            <span class="s1"><i>{{row.price}}</i>元</span> <br>
            <!-- <div class="clx"> -->
            <span class="s3" v-html="getTime(row.dDate)"></span>
            <!-- </div> -->
            <ins v-show="edite" @click="del($index)" class="icon-del"></ins>
        </div>
    </div>
</template>

<script>
export default{
    props: ["edite", "show", "data"],
    methods : {
        del(i){
            this.data.splice(i, 1);
        },
        getTime(date){
            return new Date(date).format("MM-dd HH:mm");
        }
    }
}
</script>
