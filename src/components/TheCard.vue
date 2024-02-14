<script setup lang="ts">
import { toRefs } from "vue"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text_size: {
    type: String,
    default: 'text-2xl'
  },
  text_color: {
    type: String,
    default: "black",
  },
  data: {
    type: Number,
    require: true,
    default: 0
  },
  bgColor: {
    type: Boolean,
    default: false
  },
  color: String
})

const { data } = toRefs(props)
</script>



<template>
  <div :class="bgColor ? 'bg-white shadow-md' : ''" class="text-center font-bold p-5 w-full">
    <p class='text-xs uppercase'>{{ title }}</p>
    <p :class="'font-bold ' + text_size + ' ' + text_color">Rp {{ data }}</p>
  </div>
</template>