<template>
  <div id="audioList">
    <div v-for="(item, key) in audio_data"
         :key="key">
      {{ item.time }}
      <img src="../assets/image/collected.png" alt="箭头">
      <div v-for="(auido, index) in item.data" :key="index">
        <span>{{ audio.text }}</span>
        <audio-player></audio-player>
      </div>
    </div>
  </div>
</template>
<script>
import audioPlayer from '../components/audioPlayer.vue';

export default {
  name: 'audioList',
  data() {
    return {
      audio_data: [
        {
          time: '2020 - 10 - 01',
          data: [
            {
              text: '这是今天的第一个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
            {
              text: '这是今天的第二个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
          ],
        },
        {
          time: '2020 - 10 - 02',
          data: [
            {
              text: '这是今天的第一个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
            {
              text: '这是今天的第二个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
          ],
        },
        {
          time: '2020 - 10 - 03',
          data: [
            {
              text: '这是今天的第一个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
            {
              text: '这是今天的第二个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
          ],
        },
        {
          time: '2020 - 10 - 04',
          data: [
            {
              text: '这是今天的第一个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
            {
              text: '这是今天的第二个音频',
              audio: 'http://cdn.gszx77.com/20200731_172345.m4a',
            },
          ],
        },
      ],
    };
  },
  components: {
    audioPlayer,
  },
  created() {},
  mounted() {},
  methods: {},

};
</script>

