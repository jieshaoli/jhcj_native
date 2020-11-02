<template>
  <div id="live-intro">
    <div v-show="liveIntroUrl.length <= 0"
         style="width: 100%; height: 100%; text-align:center;">
      <img src="../assets/image/logo_empty.png"
           alt="默认图"
           style="width: 80px; margin: 25% 100px;">
    </div>
    <iframe id="live-intro-content"
            v-show="liveIntroUrl.length > 0"
            :src="liveIntroUrl"
            frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: 'liveIntro',
  props: {
    liveIntroUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="css" scoped>
#live-intro {
  width: 100%;
  height: 100%;
}
#live-intro #live-intro-content {
  width: 100%;
  height: 100%;
}
</style>
