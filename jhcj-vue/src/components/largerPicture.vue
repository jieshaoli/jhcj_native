<template>
  <div class="img-bg" @touchmove.prevent @click="imgBgHidechild">
    <img :src="isShowimage_url" alt="">
  </div>
</template>

<script>
  export default {
    name: 'largerPicture',
    data () {
      return {};
    },
    props: {
      isShowimage_url:'',
    },

    components: {},

    created() {},

    mounted() {},

    computed: {},

    methods: {
      imgBgHidechild() {
        this.$emit('imgBgHidechild',false);
      }
    },
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/* 图片放大 */
.img-bg {
    width:100%;
    height:100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index:9999;
    background:rgba(0,0,0,.4);
}
.img-bg img{
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width:95%;
    height:auto;
    max-width:95%;
  }
</style>
