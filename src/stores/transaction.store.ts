import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { showAlert } from '@/components/TheInfoAlert';
import axios from 'axios';
import type { RouteParams } from 'vue-router';

export const useTransactionStore = defineStore(
  'transaction',
  () => {
    const balance = ref(0);
    const income = ref(0);
    const expense = ref(0);
    const type = ref<any>({});
    const transactionList: any = ref([]);

    const getTypeTransaction = async (): Promise<void> => {
      try {
        const response = await axios.get('http://localhost:9000/api/type/');
        type.value = response.data.type;
      } catch (error) {
        console.log(error);
      }
    };

    const lastTransactionId: any = computed(() => {
      if (transactionList.value.length) {
        return JSON.parse(transactionList.value[transactionList.value.length - 1].id);
      } else {
        return 0;
      }
    });

    const getData = async (params: RouteParams): Promise<void> => {
      try {
        const respose = await axios.get(`http://localhost:9000/api/transaction/${params.id}`);
        transactionList.value = respose.data.transaction;
      } catch (error) {
        console.log(error);
      }
    };

    const addNewData = async (data: any): Promise<void> => {
      try {
        const response = await axios.post('http://localhost:9000/api/transaction/create', data);
        transactionList.value.push(response.data.transaction);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteData = async (data: any, index: number): Promise<void> => {
      try {
        const id = JSON.parse(data.id);
        await axios.delete(`http://localhost:3000/transactions/${id}`);
        showAlert('Delete Success');
        transactionList.value.splice(index, 1);
        console.log(id);
        console.log(transactionList.value);
        if (data.type === 'income') {
          income.value -= data.amount;
          balance.value -= data.amount;
        } else {
          expense.value -= data.amount;
          balance.value += data.amount;
        }
      } catch (error) {
        console.log(error);
        console.log(data.id);
      }
    };

    return {
      transactionList,
      lastTransactionId,
      balance,
      income,
      expense,
      type,
      getTypeTransaction,
      addNewData,
      deleteData,
      getData
    };
  },
  {
    persist: true
  }
);
