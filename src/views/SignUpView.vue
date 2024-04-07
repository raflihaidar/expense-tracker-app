<template>
  <div
    class="w-[60%] h-[90%] flex items-center gap-x-5 mx-auto p-3 bg-slate-50 rounded-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <aside class="w-[40%] mx-auto p-7">
      <p class="text-3xl font-bold mb-3">Already have an account?</p>
      <RouterLink
        to="/sign-in"
        class="w-full block text-center font-bold mb-10 border-2 border-blue-500 text-blue rounded-md py-[0.1rem]"
      >
        Sign in
      </RouterLink>
      <div>
        <p class="text-xs mb-3">Or sign up using your existing social media account</p>
        <button
          class="w-full flex items-center text-sm justify-center gap-x-2 mb-1 border-2 bg-white rounded-md py-[0.3rem]"
        >
          <img src="../assets/google.png" class="w-4" alt="google-icon" />
          Sign up with google
        </button>
        <button
          class="w-full flex items-center text-sm justify-center gap-x-2 mb-1 border-2 bg-blue-500 text-white rounded-md py-[0.3rem]"
        >
          <img src="../assets/facebook.png" class="w-4" alt="facebook-icon" />
          Sign up with facebook
        </button>
      </div>
    </aside>
    <aside class="w-1/2 h-full bg-slate-100 shadow-2xl rounded-lg p-5">
      <form class="w-full" @submit.prevent="store.register(payload, confirmPassword)">
        <section class="mb-5 flex gap-x-3">
          <div>
            <label for="first-name" class="block">First name</label>
            <input
              type="text"
              class="w-full py-1 px-3 rounded-md border-black border outline-none bg-inherit"
              name="input-name"
              id="first-name"
              required
              v-model="fName"
            />
          </div>
          <div>
            <label for="last-name" class="block">Last name</label>
            <input
              type="text"
              class="w-full py-1 px-3 rounded-md border-black border outline-none bg-inherit"
              name="input-name"
              id="last-name"
              v-model="lName"
            />
          </div>
        </section>
        <section class="mb-5">
          <label for="username">Username</label>
          <input
            type="text"
            class="w-full py-1 px-3 rounded-md border-black border outline-none bg-inherit"
            name="input-username"
            id="username"
            v-model="payload.username"
            required
          />
        </section>
        <section class="mb-5">
          <label for="email" class="block">E-mail</label>
          <input
            type="email"
            class="w-full py-1 px-3 rounded-md border-black border outline-none bg-inherit"
            name="input-email"
            id="email"
            v-model="payload.email"
            required
          />
        </section>
        <section class="mb-5">
          <label for="password" class="block">Password</label>
          <input
            type="password"
            class="w-full py-1 px-3 rounded-md border-black border outline-none bg-inherit"
            name="input-password"
            id="password"
            v-model="payload.password"
            required
          />
        </section>
        <section class="mb-2">
          <label for="confirm-password" class="block">Confirm Password</label>
          <input
            type="password"
            class="w-full py-1 px-3 rounded-md border-black border outline-none bg-inherit"
            name="input-password"
            id="confirm-password"
            v-model="confirmPassword"
            required
          />
        </section>
        <label for="" class="text-xs mb-5 flex items-center gap-x-1">
          <input type="checkbox" required />
          i agree to the Terms and Privacy Policy
        </label>
        <button
          type="submit"
          class="w-[90%] rounded-md py-[0.1rem] block mx-auto text-center bg-blue-500 text-white font-bold"
        >
          Sign up
        </button>
      </form>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import type User from '@/interfaces/user.interface';
import { ref, watchEffect, watch } from 'vue';

const store = useAuthStore();
const error = ref('');
const fName = ref('');
const lName = ref('');
const confirmPassword = ref('');

const payload = ref<User>({
  fullname: '',
  username: '',
  email: '',
  password: ''
});

watch(fName, (newValue) => {
  payload.value.fullname = newValue + ' ' + lName.value;
});

watch(lName, (newValue) => {
  payload.value.fullname = fName.value + ' ' + newValue;
});

watchEffect(() => {
  console.log(payload.value.fullname);
});
</script>
