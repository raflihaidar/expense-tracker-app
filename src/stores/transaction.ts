import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import axios from "axios"

export const useTransactionStore = defineStore('transaction', () => {

  const balance = ref(0)
  const income = ref(0)
  const expense = ref(0)
  const transactionList: any = ref([])

  const lastTransactionId: any = computed(() => {
    if (transactionList.value.length) {
      return JSON.parse(transactionList.value[transactionList.value.length - 1].id)
    } else {
      return 0
    }
  })

  const getData = async (): Promise<void> => {
    try {
      const respose = await axios.get("http://localhost:3000/transaction")
      transactionList.value = respose.data
    } catch (error) {
      console.log(error)
    }
  }

  const addNewData = async (data: any): Promise<void> => {
    try {
      const id = JSON.stringify(lastTransactionId.value + 1)

      await axios.post("http://localhost:3000/transaction", {
        id,
        category: data.category,
        transaction_name: data.transaction_name,
        value: data.value
      })

      transactionList.value.push({
        id: JSON.stringify(id),
        category: data.category,
        transaction_name: data.transaction_name,
        value: data.value
      })

      if (data.category === 'income') {
        income.value += data.value
        balance.value += data.value;
      } else {
        expense.value += data.value
        balance.value -= data.value;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (data: any): Promise<void> => {
    try {
      const id = JSON.parse(data.id)
      await axios.delete(`http://localhost:3000/transaction/${id}`)
      transactionList.value.splice(id - 1, 1)

      if (data.category === 'income') {
        income.value -= data.value
        balance.value -= data.value
      } else {
        expense.value -= data.value
        balance.value += data.value
      }
    } catch (error) {
      console.log(error)
      console.log(data.id)
    }
  }

  return {
    transactionList,
    lastTransactionId,
    balance,
    income,
    expense,
    addNewData,
    deleteData,
    getData
  }
}, {
  persist: true
})