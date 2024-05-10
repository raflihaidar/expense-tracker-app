<template>
  <div
    class="w-[60%] h-[90%] flex items-center gap-x-5 mx-auto p-10 bg-slate-50 rounded-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <aside class="w-1/2 h-full bg-slate-100 shadow-2xl rounded-lg p-5">
      <h1 class="text-3xl font-bold mb-5">Sign in.</h1>
      <div v-if="error" class="w-full font-bold bg-red-400 px-4 py-1 rounded-md text-sm">
        <p>{{ error }}</p>
      </div>
      <form @submit.prevent="handleLogin(email, password)" method="post">
        <section class="flex flex-col gap-y-1 mb-5">
          <label for="email">e-mail</label>
          <input
            type="text"
            id="email"
            v-model="email"
            required
            class="bg-inherit border border-black outline-none py-1 px-3 rounded-md"
          />
        </section>
        <section class="flex flex-col gap-y-1 mb-5">
          <label for="password">password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder=""
            required
            class="bg-inherit border border-black outline-none py-1 px-3 rounded-md"
          />
          <p class="text-xs">Forgot your password ?<RouterLink to="">click here</RouterLink></p>
        </section>
        <section class="mb-5">
          <label for="keep-login">
            <input type="checkbox" id="keep-login" />
            keep me logged in
          </label>
        </section>
        <button
          type="submit"
          class="w-full py-1 rounded-md text-white font-semibold text-md bg-blue-500"
        >
          login
        </button>
      </form>
    </aside>
    <aside class="w-[40%] mx-auto p-7">
      <p class="text-3xl font-bold mb-3">Dont have and account yet?</p>
      <RouterLink
        to="/sign-up/"
        class="w-full block text-center font-bold mb-10 border-2 border-blue-500 text-blue rounded-md py-[0.1rem]"
      >
        Sign up
      </RouterLink>
      <div>
        <p class="text-xs mb-3">Or sign up using your existing social media account</p>
        <button
          class="w-full flex items-center text-sm justify-center gap-x-2 mb-1 border-2 bg-white rounded-md py-[0.1rem]"
        >
          <img src="../assets/google.png" class="w-4" alt="google-icon" />
          Sign up with google
        </button>
        <button
          class="w-full flex items-center text-sm justify-center gap-x-2 mb-1 border-2 bg-blue-500 text-white rounded-md py-[0.1rem]"
        >
          <img src="../assets/facebook.png" class="w-4" alt="facebook-icon" />
          Sign up with facebook
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
const store = useAuthStore();
const { user } = storeToRefs(store);
const email = ref('');
const password = ref('');
const error: any = ref('');

const handleLogin = async (email: string, password: string) => {
  error.value = await store.login(email, password);
  console.log(error.value);
};
</script>
