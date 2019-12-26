<template>
  <input
    v-model="inputValue"
    :type="type"
    :style="styles"
    :maxlength="maxLength"
    :placeholder="placeholder"
    class="input"
    @keydown="onKeyDown"
    @compositionstart="onComposingStart"
    @compositionend="onComposingEnd"
  />
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options.d'

export default Vue.extend({
  props: {
    type: {
      type: String as Prop<string>,
      default: 'text',
    },
    value: {
      type: String as Prop<string>,
    },
    maxLength: {
      type: Number as Prop<number>,
      default: 10,
    },
    width: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    height: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: ' 28px',
    },
    lineHeight: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '20px',
    },
    fontSize: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '20px',
    },
    placeholder: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    display: {
      type: String as Prop<string>,
      default: 'inline-block',
    },
  },
  data(): {
    composing: boolean
  } {
    return {
      composing: false,
    }
  },
  computed: {
    styles(): object {
      const { width, height, lineHeight, fontSize, display } = this
      return {
        width,
        height,
        lineHeight,
        fontSize,
        display,
      }
    },
    inputValue: {
      get(): string {
        return this.value
      },
      set(newValue: string): void {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    onComposingStart(): void {
      this.composing = true
    },
    onComposingEnd(): void {
      this.composing = false
    },
    onKeyDown(e: KeyboardEvent): void {
      if (this.composing) return
      this.$emit('keydown', e)
    },
  },
})
</script>
<style lang="sass" scoped>
.input
  border: none
  outline: 0
  border-bottom: 2px solid #d1d5db
  text-align: center
input:focus
  border-bottom: 2px solid skyblue
</style>
