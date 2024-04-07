<template>
  <nav class="flex justify-between items-center py-3 px-4 top-0">
    <section @click="$router.back">
      <h1 class="text-3xl font-bold">Spend<span class="text-green-600">Smart</span></h1>
    </section>
    <section
      class="w-[15%] flex items-center relative"
      v-if="$route.path != '/sign-in' && $route.path != '/sign-up'"
    >
      <div v-if="!user.length">
        <router-link class="cursor-pointer mr-5" :to="{ name: 'sign in' }">Sign in</router-link>
        <router-link class="cursor-pointer" :to="{ name: 'sign up' }">Sign up</router-link>
      </div>
      <div
        v-else
        class="w-full justify-end flex items-center gap-x-1 cursor-pointer"
        @click="clickDropDown"
      >
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </figure>
        <p>{{ user.username }}</p>
      </div>
      <transition>
        <ul
          v-if="openDropDown"
          class="absolute -bottom-24 rounded-b-md bg-white w-full cursor-pointer"
        >
          <li class="border-y w-full px-3 py-2">Profile</li>
          <li class="border-b w-full px-3 py-2">Log out</li>
        </ul>
      </transition>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useAuthStore();
const { user } = storeToRefs(store);
const openDropDown = ref(false);
const clickDropDown = () => {
  openDropDown.value = !openDropDown.value;
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
