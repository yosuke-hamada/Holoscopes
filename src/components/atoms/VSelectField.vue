<template>
  <div class="select-content">
    <select class="select" @change="itemSelect($event)">
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
        lineHeight,
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
.select
	padding: 7px 30px 7px 10px
	font-size: 93%
	line-height: 1.1em
	border-radius: 5px
	border: none
	background-repeat: no-repeat
	background-size: 12px 10px
	background-position: right 10px center
.select:focus
  outline: 0
.select:hover
  cursor: pointer
</style>
