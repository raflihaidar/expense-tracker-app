import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const BASEURL = 'http://localhost:3000/user';
    const user: any = ref([]);

    //   const register = async () => {
    //     try {
    //       const respose = await axios.get(`${BASEURL}`)
    //       console.log(respose)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    const login = async (email: string, password: string) => {
      try {
        const response = await axios.post(`${BASEURL}/login`, {
          email,
          password
        });
        console.log(response);
        alert('success');
      } catch (error) {
        console.log(error);
      }
    };

    return {
      login
    };
  },
  {
    persist: true
  }
);
