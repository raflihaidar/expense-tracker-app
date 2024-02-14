<script setup lang="ts">
import { defineProps, defineEmits, toRefs, ref, Ref } from "vue";
import IconDelete from './icons/IconDelete.vue';
import { useTransactionStore } from "@/stores/transaction";

const store = useTransactionStore()
type hover = number | null

const props = defineProps({
  data: null
});

const emit = defineEmits<{
  (e: 'delete', item: any): void
}>()

const hoverIndex: Ref<hover> = ref(null)
const { data } = toRefs(props);

const deleteTransaction = (item: any, index: number): void => {
  hoverIndex.value = -1
  alert("delete success")
  store.deleteData(item, index)
};

const handleHover = (index: number, isHover: boolean) => {
  hoverIndex.value = isHover ? index : null
};
</script>

<template>
  <div class="font-bold">
    <p class="border-b-2 border-gray-300 pb-1">Transactions</p>
    <div class="w-full">
      <template v-if="data.length">
        <div
          class="flex w-full justify-between items-center my-3 bg-white shadow-md py-2 px-3 rounded-md relative cursor-pointer"
          v-for="(item, index) in data" :key="index" @mouseover="handleHover(index, true)"
          @mouseleave="handleHover(index, false)">
          <div>
            <p>
              {{ item.transaction_name }}
            </p>
            <p class="font-normal text-xs">
              {{ item.date }}
            </p>
          </div>
          <p :class="item.type === 'income' ? 'text-green-500' : 'text - red - 500'">
            <span v-if="item.type === 'expense'">
              -
            </span>
            <span v-else>
              +
            </span>
            Rp {{ item.amount }}
          </p>
          <span class="absolute top-0 -right-1 w-2 h-full"
            :class="item.type === 'income' ? 'bg-green-500' : 'bg-red-500'">
          </span>
          <button v-if="hoverIndex === index" @click="deleteTransaction(item, index)"
            class="absolute text-center flex justify-center items-center text-white top-0 right-0 z-10 w-28 h-full bg-red-500 opacity-85">
            <IconDelete />
          </button>
        </div>
      </template>
      <template v-else>
        <div class="text-center font-normal my-2">
          <p>No Transactions</p>
        </div>
      </template>
    </div>
  </div>
</template>
