import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export const useUserStore = defineStore('user', () => {}, {
  persist: true
});
