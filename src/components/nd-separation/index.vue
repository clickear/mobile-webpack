
<!-- 分割线控件 只用于显示，无getValue值 -->
<template>
    <div class="ui-separation">
        <hr class="ui-separation-line"  :style="{borderStyle:borderstyle, borderColor: bordercolor}" >
        <p style="text-align: center;">{{title}}</p>
    </div>
</template>

<script>
export default{
	props: {
    title:String,
 	label: String,
    textalgin: String,
    borderstyle: String,
    bordercolor: String,
	}
}

</script>


