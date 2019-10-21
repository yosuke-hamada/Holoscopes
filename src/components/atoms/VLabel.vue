<template>
  <div :style="styles">
    {{ text }}
  </div>
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
    lineHeight: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '16px',
    },
    color: {
      type: String as Prop<string>,
    },
    backgroundColor: {
      type: String as Prop<string>,
    },
    fontFamily: {
      type: String as Prop<string>,
    },
    fontWeight: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    fontSize: {
      type: ([String, Number] as any) as Prop<string | number>,
      default: '16px',
    },
    display: {
      type: String as Prop<string>,
      default: 'inline-block',
    },
  },
  computed: {
    styles(): object {
      const {
        width,
        height,
        lineHeight,
        color,
        backgroundColor,
        fontFamily,
        fontWeight,
        fontSize,
        display,
      } = this
      return {
        width: width,
        height: height,
        lineHeight,
        color: color,
        'background-color': backgroundColor,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontSize: fontSize,
        display: display,
      }
    },
  },
})
</script>
<style lang="sass" scoped></style>
