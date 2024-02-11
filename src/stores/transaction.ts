import { defineStore } from "pinia";
import {computed, ref} from 'vue'
import axios from "axios"

export const useTransactionStore = defineStore('transaction', () => {

  const balance = ref(0)
  const income = ref(0)
  const expends = ref(0)
  const transactionList : any = ref([])
  
  const lastTransactionId  = computed(() => {
    return transactionList.value[transactionList.value.length - 1] ?? null
  })

  const getData = async () : Promise<void> => {
    try{
      const respose = await axios.get("http://localhost:3000/data")
      transactionList.value = respose.data
    }catch(error){
      console.log(error)
    }
  }

  const addNewData = async (data : any) : Promise<void> => {
    try{
      await axios.post("http://localhost:3000/data", {
        id : lastTransactionId.value.id + 1,
        transaction_name : data.transaction_name,
        value : data.value
      })

      transactionList.value.push({
        id : lastTransactionId.value.id + 1,
        transaction_name : data.transaction_name,
        value : data.value
      })
    }catch(error){
      console.log(error)
    }
  }

  return {
    transactionList,
    lastTransactionId,
    balance,
    income,
    expends,
    addNewData,
    getData
  }
})