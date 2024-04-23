<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction.store';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';

const store = useTransactionStore();
const authStore = useAuthStore();
const { type } = storeToRefs(store);

const selectedTypeIndex = ref<number>(0);

const payload: any = reactive({
  user_id: authStore.user.id,
  type_id: 1,
  description: null,
  amount: null,
  date: null
});

const selectType = (index: number) => {
  selectedTypeIndex.value = index;
  payload.type = type.value[index].id;
};

const addTransaction = async (payload: any) => {
  await store.addNewData(payload).then(() => {
    payload.type = 1;
    payload.category = '';
    payload.description = '';
    payload.amount = null;
    payload.date = null;

    console.log('payload : ', payload);
  });
};

onMounted(async () => {
  await store.getTypeTransaction();
});
</script>

<template>
  <div>
    <p class="border-b-2 border-gray-300 pb-1 font-bold">Add New Transaction</p>
    <form @submit.prevent="addTransaction(payload)">
      <div class="flex bg-gray-300 gap-x-2 p-1 rounded-md text-center">
        <span
          v-for="(item, index) in type"
          :class="selectedTypeIndex === index ? 'bg-white rounded-md shadow-md' : ''"
          :key="index"
          @click="selectType(index)"
          class="w-1/2 font-bold text-md p-1 cursor-pointer"
        >
          {{ item.name }}
        </span>
      </div>
      <section class="flex justify-between items-center gap-x-2">
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-[70%]">
          <label for="description">Description</label>
          <input
            type="text"
            name="description"
            id="desc-input"
            placeholder="Detail of Transaction"
            autocomplete="off"
            required
            class="outline-none px-3 py-2 border border-gray-200"
            v-model="payload.description"
          />
        </div>
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-[30%]">
          <label for="description">Category</label>
          <select
            class="outline-none px-3 py-2 border border-gray-200"
            v-if="payload.type === 'expense'"
          >
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
          <input
            type="number"
            name="amount"
            id="amount-input"
            placeholder="Value of amount"
            autocomplete="off"
            required
            class="outline-none px-3 py-2 border border-gray-200"
            v-model="payload.amount"
          />
        </div>
        <div class="grid grid-cols-1 my-3 gap-y-2 justify-start text-start w-1/2">
          <label for="transaction">Date</label>
          <input
            type="date"
            name="date"
            id="date-input"
            placeholder="Value of date"
            autocomplete="off"
            required
            class="outline-none px-3 py-2 border border-gray-200"
            v-model="payload.date"
          />
        </div>
      </section>
      <button class="w-full bg-sky-800 py-2 px-2 text-white font-semibold" type="submit">
        Add New Transaction
      </button>
    </form>
  </div>
</template>
