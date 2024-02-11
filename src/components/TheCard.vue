<script setup lang="ts">
import { toRefs } from "vue"

const props = defineProps({
  title: {
    type: String,
    require: true,
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
  <div class="text-center">
    <p>{{ props.title }}</p>
    <p>Rp {{ data }}</p>
  </div>
</template>