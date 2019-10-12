<template>
  <div class="select-content" :style="styles">
    <select class="select" :style="styles" @change="itemSelect($event)">
      <option value="">
        名前を選択してください
      </option>
      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options.d'

interface SelectItem {
  id: number
  name: string
}

export default Vue.extend({
  props: {
    items: {
      type: Array as Prop<SelectItem[]>,
    },
    selectedItem: {
      type: Object as Prop<SelectItem>,
    },
    width: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    height: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '24px',
    },
    lineHeight: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '16px',
    },
    fontSize: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '16px',
    },
  },
  computed: {
    styles(): object {
      const { width, height, lineHeight, fontSize } = this
      return {
        width: width,
        height: height,
        lineHeight: lineHeight,
        fontSize: fontSize,
      }
    },
  },
  methods: {
    itemSelect(event: Event): void {
      const target: HTMLInputElement = event.target as HTMLInputElement
      this.$emit('click', target.value)
    },
  },
})
</script>
<style lang="sass" scoped>
.select-content
  position: relative
  display: inline-block
.select-content:after
  content: ''
  width: 6px
  height: 6px
  border: 0px
  border-bottom: solid 2px #b4b3b3
  border-right: solid 2px #b4b3b3
  -ms-transform: rotate(45deg)
  -webkit-transform: rotate(45deg)
  transform: rotate(45deg)
  position: absolute
  top: 50%
  right: 10px
  margin-top: -4px
.select
  position: relative
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none
  background: transparent
  position: relative
  z-index: 1
  padding: 0 40px 0 10px
  border: 1px solid #b4b3b3
  border-radius: 2px
.select:focus
  outline: 0
.select:hover
  cursor: pointer
</style>
