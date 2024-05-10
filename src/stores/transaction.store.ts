import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { showAlert } from '@/components/TheInfoAlert';
import { useAuthStore } from './auth.store';
import axios from 'axios';
import type { RouteParams } from 'vue-router';

export const useTransactionStore = defineStore(
  'transaction',
  () => {
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
        transactionList.value = respose.data.data.transaction;
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

    const deleteData = async (id: string, index: number): Promise<void> => {
      try {
        const res = await axios.delete(`http://localhost:9000/api/transaction/destroy/${id}`);
        showAlert('Delete Success');
        const authStore = useAuthStore();
        const { report } = storeToRefs(authStore);
        transactionList.value.splice(index, 1);
        report.value = res.data.data.user.report;
        // if (data.type === 'income') {
        //   income.value -= data.amount;
        //   balance.value -= data.amount;
        // } else {
        //   expense.value -= data.amount;
        //   balance.value += data.amount;
        // }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      transactionList,
      lastTransactionId,
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
