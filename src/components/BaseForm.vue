<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction';
import { reactive } from 'vue';

const typeTransaction: any = reactive([
  {
    name: 'income',
    isClicked: true
  },
  {
    name: 'expense',
    isClicked: false
  }
])

const store = useTransactionStore()

const payload: any = reactive({
  type: "income",
  transaction_name: null,
  amount: null,
  date: null
})

const addTransaction = async () => {
  await store.addNewData(payload).then(() => {
    payload.category = "";
    payload.transaction_name = "";
    payload.amount = null;
    payload.date = null
  })
}

const clickedTypeButton = (item: any) => {
  typeTransaction.map((value: any) => value.name != item.name ? value.isClicked = false : value.isClicked = true)
  payload.type = item.name
}

</script>

<template>
  <div>
    <p class="border-b-2 border-gray-300 pb-1 font-bold">Add New Transaction</p>
    <form @submit.prevent="addTransaction">
      <div class="flex bg-gray-300 gap-x-2 p-1 rounded-md text-center">
        <span :class="item.isClicked ? 'bg-white rounded-md shadow-md' : ''" v-for="(item, index) in typeTransaction"
          :key="index" @click="clickedTypeButton(item)" class="w-1/2 font-bold text-md p-1 cursor-pointer">
          {{ item.name }}
        </span>
      </div>
      <section class="flex justify-between items-center gap-x-2">
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-[70%]">
          <label for="description">Description</label>
          <input type="text" name="description" id="desc-input" placeholder="Detail of Transaction" autocomplete="off"
            required class="outline-none px-3 py-2 border border-gray-200" v-model="payload.transaction_name">
        </div>
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-[30%]">
          <label for="description">Category</label>
          <select class="outline-none px-3 py-2 border border-gray-200" v-if="payload.type === 'expense'">
            <option value="Needs">Needs</option>
            <option value="Desire">Desire</option>
            <option value="Savings">Savings</option>
          </select>
          <select class="outline-none px-3 py-2 border border-gray-200" v-else>
            <option value="Needs">Main</option>
            <option value="Needs">Passive</option>
            <option value="Needs">Investment</option>
            <option value="Needs">Gift</option>
          </select>
        </div>
      </section>
      <section class="flex justify-between items-center gap-x-2">
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-1/2">
          <label for="transaction">Amount</label>
          <input type="number" name="amount" id="amount-input" placeholder="Value of amount" autocomplete="off" required
            class="outline-none px-3 py-2 border border-gray-200" v-model="payload.amount">
        </div>
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-1/2">
          <label for="transaction">Date</label>
          <input type="date" name="date" id="date-input" placeholder="Value of date" autocomplete="off" required
            class="outline-none px-3 py-2 border border-gray-200" v-model="payload.date">
        </div>
      </section>
      <button class="w-full bg-sky-800 py-2 px-2 text-white font-semibold" type="submit">
        Add New Transaction
      </button>
    </form>
  </div>
</template>
