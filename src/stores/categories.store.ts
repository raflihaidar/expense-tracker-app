import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useCategoeriesStore = defineStore('categories', () => {

  const BASEURL = "http://localhost:3000/categories"
  const categories: any = ref([])


  const getCategories = async () => {
    try {
      const respose = await axios.get(`${BASEURL}`)
      console.log(respose)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    categories,
    getCategories
  }
}, {
  persist: true
})