import { defineStore } from 'pinia';
import router from '../router/index';
import { showAlert } from '@/components/TheInfoAlert';
import axios from 'axios';
import { ref } from 'vue';

interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore(
  'authentication',
  () => {
    const BASEURL = 'http://localhost:9000/api/auth';
    const user: any = ref([]);

    const register = async (payload: User, confirmPassword: string) => {
      try {
        if (confirmPassword === payload.password) {
          const response = await axios.post(`${BASEURL}/register`, {
            fullname: payload.fullname,
            username: payload.username,
            email: payload.email,
            unHasPassword: payload.password
          });

          showAlert('Register Success');
          router.push({ name: 'home' });
        } else {
          alert('Register Error');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const login = async (email: string, password: string) => {
      try {
        const response = await axios.post(`${BASEURL}/login`, {
          email,
          password
        });
        showAlert('Login Success');
        router.push({ name: 'home' });
      } catch (error) {
        console.log('error', error);
      }
    };

    return {
      login,
      register
    };
  },
  {
    persist: true
  }
);
