<template>
  <div>
    <h1>{{ message }}</h1>
    <p>{{ reversedMessage }}</p>
    <button @click="showAlert">
      アラート
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      message: 'Hello World!!!',
    }
  },
  computed: {
    reversedMessage(): string {
      return this.message
        .split('')
        .reverse()
        .join('')
    },
  },
  methods: {
    showAlert(): void {
      alert('Alert!')
    },
  },
})
</script>

<style scoped>
h1 {
  color: aqua;
}
</style>
