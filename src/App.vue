

<template>
  <v-app class="fill-height bg-secondary">
  <header class="bg-primary">
    <div class="cart-items">
      <p>Items in Cart: {{ store.cart.length }}</p>
      <v-btn v-if="router.currentRoute.value.name !== 'CartView' " @click="router.push({ name: 'CartView' })">To cart</v-btn>
    </div>
  </header>
  <main class="bg-secondary">
    <RouterView />
  </main>
  </v-app>
</template>

<script setup>
import { productsStore } from '@/stores/products.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = productsStore()
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
