import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { showAlert } from '@/components/TheInfoAlert';
import axios from 'axios';

export const useTransactionStore = defineStore(
  'transaction',
  () => {
    const balance = ref(0);
    const income = ref(0);
    const expense = ref(0);
    const transactionList: any = ref([]);

    const lastTransactionId: any = computed(() => {
      if (transactionList.value.length) {
        return JSON.parse(transactionList.value[transactionList.value.length - 1].id);
      } else {
        return 0;
      }
    });

    const getData = async (): Promise<void> => {
      try {
        const respose = await axios.get('http://localhost:3000/transactions');
        transactionList.value = respose.data;
        console.log(transactionList.value);
      } catch (error) {
        console.log(error);
      }
    };

    const addNewData = async (data: any): Promise<void> => {
      try {
        const id = JSON.stringify(lastTransactionId.value + 1);

        await axios.post('http://localhost:3000/transactions', {
          id,
          type: data.type,
          transaction_name: data.transaction_name,
          amount: data.amount,
          date: data.date
        });

        transactionList.value.push({
          id,
          type: data.type,
          transaction_name: data.transaction_name,
          amount: data.amount,
          date: data.date
        });

        if (data.type === 'income') {
          income.value += data.amount;
          balance.value += data.amount;
        } else {
          expense.value += data.amount;
          balance.value -= data.amount;
        }
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
      addNewData,
      deleteData,
      getData
    };
  },
  {
    persist: true
  }
);
