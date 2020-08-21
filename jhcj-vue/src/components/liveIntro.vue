<template>
  <div id="live-intro">
    <iframe id="live-intro-content"
            :src=liveIntroUrl
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
  mounted() {
    console.log('liveIntroUrl: ', this.liveIntroUrl);
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
