<template>
  <div class="coursecard">
    <div class="cardTop" :style="bg">
     <slot name="top"></slot>
    </div>
    <div class="cardFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "courseCard",
        data(){
            return{
                img:'../images/course/31.png',
                bg:{
                   clear: "both",
                   height: "95px",
                   paddingTop: "18px",
                   paddingBottom: "14px",
                   borderRadius: "4px 4px 0 0",
                   background: "url(" + require('../images/course/31.png') +")"
               }
            }
        },
        methods:{
          change(){
          }
        },
        props:{
            imgUrl:{
                type:String,
                default:'../images/course/coursebg.png'
            }
        },
        watch: {
            imgUrl: function(newVal, oldVal) {
                this.bg.background = "url(" + require('../images/course/coursebg.png') +")"
            }
        }
    }
</script>

<style scoped>
  .coursecard{
    width: 270px;
    background: #fff;
    border: 1px solid #E2E6ED;
    border-radius: 8px;
    position: relative;
    margin-right: 4px;
  }

  .cardFooter{
    background: #fff;
    clear: both;
    height: 141px;
    border-radius: 0 0 8px 8px;
  }
</style>
