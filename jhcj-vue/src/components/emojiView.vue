<template>
  <div id="emoji-view">
    <div class="cell"
         v-for="(str, index) in showContent"
         :key="index"
         @click="inputText(index)">{{str}}</div>
  </div>
</template>
<script>
const jsonEmoji = require('../assets/js/emoji.json');

export default {
  name: 'emojiView',
  data() {
    return {
      showContent: [],
      if_more_x: true,
    };
  },
  created() {
    this.showContent = jsonEmoji.people;
    console.log(this.content, 'emojiView');
  },
  mounted() {
    this.setBgHeight();
  },
  methods: {
    inputText(index) {
      var emoji = this.showContent[index];
      this.$emit('emoji', emoji);
    },
    setBgHeight() {
      let per = window.innerHeight / window.innerWidth;
      if (per > 1.8) {
        this.if_more_x = true;
      } else {
        this.if_more_x = false;
      }
      var bgH = 160;
      if (this.if_more_x) {
        bgH += 24;
      }
      var bg = document.getElementById('emoji-view');
      bg.style.height = bgH + 'px';
      console.log(bg.style.height, bg);
    },
  },
};
</script>
<style lang="css" scoped>
#emoji-view {
  overflow: auto;
  height: 160px;
}
#emoji-view .cell {
  display: inline-block;
  text-align: center;
  font-size: 33px;
  width: calc(100% / 7);
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
}
</style>
