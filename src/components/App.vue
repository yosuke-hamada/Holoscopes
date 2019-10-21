<template>
  <div class="container">
    <horoscope-result></horoscope-result>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import HoroscopeResult from '../components/pages/HoroscopeResult'

export default Vue.extend({
  components: {
    HoroscopeResult,
  },
})
</script>
<style lang="sass">
html, body
  margin: 0
  padding: 0
body, input, button
  font-family: YuGothic,'Yu Gothic','Helvetica','Arial','Hiragino Sans','ヒラギノ角ゴシック','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic'
.container
  width: calc(100vw - 360px)
  margin: auto
</style>
