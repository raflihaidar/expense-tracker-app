<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction';
import TheCard from '@/components/TheCard.vue';
import TransactionList from '@/components/TransactionsList.vue'
import BaseForm from '@/components/BaseForm.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useTransactionStore()
const { expense, income, balance, transactionList } = storeToRefs(store)

const deleteTransaction = (item: any, index: number): void => {
  store.deleteData(item, index)
}

onMounted(async () => {
  store.getData()
})
</script>

<template>
  <main class="w-full h-full p-1 bg-zinc-200">
    <p class="my-5 text-center font-bold text-xl tracking-wide">Expense Tracker</p>
    <div
      class="mb-5 lg:w-[30%] w-full p-1 mx-auto shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <section class="flex flex-col items-center gap-y-3 my-5">
        <TheCard title="total balance" :data="balance" />
        <div class="flex justify-center w-[80%] mx-auto">
          <TheCard title="Income" :data="income" text_size="text-md" text_color="text-green-500" :bgColor="true" />
          <TheCard title="Expense" :data="expense" text_size="text-md" text_color="text-red-500" :bgColor="true" />
        </div>
      </section>
      <section class="w-[80%] h-full mx-auto">
        <TransactionList :data="transactionList" />
      </section>
      <section class=" w-[80%] mx-auto my-5">
        <BaseForm />
      </section>
    </div>
  </main>
</template>
