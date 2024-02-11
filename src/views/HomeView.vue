<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction';
import TheCard from '@/components/TheCard.vue';
import HistoryTransaction from '@/components/HistoryTransaction.vue'
import BaseForm from '@/components/BaseForm.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useTransactionStore()
const { expends, income, balance, transactionList } = storeToRefs(store)

onMounted(async () => {
  store.getData()
})
</script>

<template>
  <main class="my-10 lg:w-[40%] w-full p-5  mx-auto">
    <p class="text-center font-bold text-xl tracking-wide">Expense Tracker By Rafli Haidar Nashif</p>
    <section class="flex flex-col items-center gap-y-3 my-5">
      <TheCard title="Your Balance" :data="balance" />
      <div class="flex justify-center gap-x-10 w-[60%] mx-auto">
        <TheCard title="Income" :data="income" />
        <TheCard title="Expense" :data="expends" />
      </div>
    </section>
    <section>
      <HistoryTransaction :data="transactionList" />
    </section>
    <section class="my-5">
      <BaseForm />
    </section>
  </main>
</template>
