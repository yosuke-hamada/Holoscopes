<template>
  <button
    class="v-button"
    :style="styles"
    :disabled="disabled"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options.d'

export default Vue.extend({
  props: {
    text: {
      type: String as Prop<string>,
      required: true,
    },
    width: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    height: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    color: {
      type: String as Prop<string>,
    },
    backgroundColor: {
      type: String as Prop<string>,
    },
    fontSize: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    disabled: {
      type: Boolean as Prop<boolean>,
    },
    fontFamily: {
      type: String as Prop<string>,
    },
    fontWeight: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
  },
  computed: {
    styles(): object {
      const {
        width,
        height,
        color,
        backgroundColor,
        fontSize,
        fontFamily,
        fontWeight,
      } = this
      return {
        width,
        height,
        color,
        backgroundColor,
        fontSize,
        fontFamily,
        fontWeight,
      }
    },
  },
  methods: {
    onClick(): void {
      this.$emit('click')
    },
  },
})
</script>
<style lang="sass" scoped>
.v-button
  border: 0
  border-radius: 10px
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24)
.v-button:hover
  cursor: pointer
  box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2)
.v-button:focus
  outline: 0
.v-button:disabled
  opacity: 0.4
</style>
