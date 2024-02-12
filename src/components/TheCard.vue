<script setup lang="ts">
import { toRefs } from "vue"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text_size: String,
  text_color: {
    type: String,
    default: "black",
  },
  data: {
    type: Number,
    require: true,
    default: 0
  },
  color: String
})

const { data } = toRefs(props)
</script>



<template>
  <div class="text-center font-semibold">
    <p class="'text-xs uppercase'">{{ props.title }}</p>
    <p :class="'text-2xl font-bold'">Rp {{ data }}</p>
  </div>
</template>