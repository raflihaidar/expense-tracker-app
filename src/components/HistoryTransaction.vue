<script setup lang="ts">
import { toRefs } from "vue"

const props = defineProps({
  data: null
})
const { data } = toRefs(props)
</script>


<template>
  <div class="text-center w-[60%] mx-auto">
    <p>Transaction List</p>
    <div>
      <div class="flex justify-between items-center my-3" v-for="(item, index) in data" :key="index">
        <p>
          {{ item.transaction_name }}
        </p>
        <p>
          Rp {{ item.value }}
        </p>
      </div>
    </div>
  </div>
</template>