import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const BASEURL = 'http://localhost:9000/user';
    const user: any = ref([]);

    const login = async (email: string, password: string) => {
      try {
        const response = await axios.post('http://localhost:9000/api/login', {
          email,
          password
        });
        console.log(response);
      } catch (error) {
        console.log('error', error);
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
