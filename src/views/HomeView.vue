<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction.store';
import { useCategoeriesStore } from '@/stores/categories.store';
import TheCard from '@/components/TheCard.vue';
import TransactionList from '@/components/TransactionsList.vue';
import TheChart from '@/components/TheChart.vue';
import BaseForm from '@/components/BaseForm.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import BaseNavbarVue from '@/components/BaseNavbar.vue';

const transactionStore = useTransactionStore();
const categoriesStore = useCategoeriesStore();
const { expense, income, balance, transactionList } = storeToRefs(transactionStore);

onMounted(async () => {
  await transactionStore.getData();
  await categoriesStore.getCategories();
});
</script>

<template>
  <main class="w-full h-full p-1 bg-zinc-200">
    <div class="flex my-5 w-full justify-center items-center gap-x-10">
      <TheChart name="income" class="order-1" />
      <TheChart name="expense" class="order-3" />
      <div
        class="order-2 mb-5 lg:w-[30%] p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <section class="flex flex-col items-center gap-y-3 my-5">
          <TheCard title="total balance" :data="balance" />
          <div class="flex justify-center w-[80%] mx-auto">
            <TheCard
              title="Income"
              :data="income"
              text_size="text-md"
              text_color="text-green-500"
              :bgColor="true"
            />
            <TheCard
              title="Expense"
              :data="expense"
              text_size="text-md"
              text_color="text-red-500"
              :bgColor="true"
            />
          </div>
        </section>
        <section class="w-[80%] mx-auto">
          <TransactionList :data="transactionList" />
        </section>
        <section class="w-[80%] mx-auto my-5">
          <BaseForm />
        </section>
      </div>
    </div>
  </main>
</template>
