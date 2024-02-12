<script setup lang="ts">
import { toRefs, ref } from "vue"

const props = defineProps({
  data: null
})

const emit = defineEmits<{
  (e: 'delete', item: any): void
}>()

const { data } = toRefs(props)

const isHover = ref(false)

const deleteTransaction = (item: any): void => {
  emit("delete", item)
  console.log("connected")
  console.log(item)
}
</script>


<template>
  <div class="text-center w-[60%] mx-auto">
    <p>Transaction List</p>
    <div>
      <div class="flex justify-between items-center my-3" v-for="(item, index) in data" :key="index"
        @mouseenter="isHover = true" @mouseleave="isHover = false">
        <p>
          {{ item.transaction_name }}
        </p>
        <p>
          Rp {{ item.value }}
        </p>

        <button v-if="isHover" @click="deleteTransaction(item)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>