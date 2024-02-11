<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction';
import { ref } from 'vue';

const store = useTransactionStore()
const form = ref(null)

const payload: any = {
  transaction_name: "",
  value: 0
}
</script>

<template>
  <div class="text-center w-[60%] mx-auto">
    <p class="border-b border-black">Add New Transaction</p>
    <form @submit.prevent="store.addNewData(payload)" ref="form">
      <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start">
        <label for="description">Description</label>
        <input type="text" name="description" id="desc-input" placeholder="Detail of Transaction"
          class="outline-none px-3 py-2 border border-gray-200" v-model="payload.transaction_name">
      </div>
      <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start">
        <label for="transaction">Transaction</label>
        <input type="text" name="transaction" id="transaction-input" placeholder="Value of Transaction"
          class="outline-none px-3 py-2 border border-gray-200" v-model="payload.value">
      </div>
      <button class="w-full bg-sky-800 py-2 px-2 text-white font-semibold" type="submit">
        Add New Transaction
      </button>
    </form>
  </div>
</template>
