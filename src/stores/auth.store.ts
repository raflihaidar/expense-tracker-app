import { defineStore } from 'pinia';
import router from '../router/index';
import { showAlert } from '@/components/TheInfoAlert';
import axios, { AxiosError } from 'axios';
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
    const user: any = ref({});

    const register = async (payload: User, confirmPassword: string) => {
      try {
        if (confirmPassword === payload.password) {
          const response = await axios.post(`${BASEURL}/register`, payload);

          user.value = response.data.user;

          showAlert('Register Success');
          router.push({ name: 'home' });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          return err.response?.data?.message;
        }
      }
    };

    const login = async (email: string, password: string) => {
      try {
        const response = await axios.post(`${BASEURL}/login`, {
          email,
          password
        });
        user.value = response.data.user;
        showAlert('Login Success');
        router.push({ name: 'home', params: { id: user.value.id } });
      } catch (err) {
        if (err instanceof AxiosError) {
          return err.response?.data?.message;
        }
      }
    };

    return {
      user,
      login,
      register
    };
  },
  {
    persist: true
  }
);
