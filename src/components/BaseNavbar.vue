<script setup lang="ts"></script>

<template>
  <nav class="py-3 px-4">
    <section class="w-full flex justify-end gap-8">
      <router-link class="cursor-pointer" :to="{ name: 'sign in' }">Sign in</router-link>
      <router-link class="cursor-pointer" :to="{ name: 'sign up' }">Sign up</router-link>
    </section>
  </nav>
</template>
