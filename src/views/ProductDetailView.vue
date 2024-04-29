

<template>
  <div class="bg-secondary">
  <v-card class="product pa-10 elevated">
    <div class="product-image">
      <img :src="selectedProduct.thumbnail" alt="">
    </div>
    <div class="d-flex flex-column">
      <p>Brand: {{ selectedProduct.brand }}</p>
      <p>Description: {{ selectedProduct.description }}</p>
      <h2>Price: {{ selectedProduct.price }}€</h2>
      <v-btn @click="addToCart">Add to cart</v-btn>
      <div class="mt-auto">
      <v-btn class="ma-2" @click="router.push({ name: 'CatalogView' })">Back to catalog</v-btn>
      </div>
    </div>
  </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent( {
  name: 'CatalogView'
})
</script>

<script setup>
import { computed } from 'vue'
import { productsStore } from '@/stores/products.js'
import { useRoute, useRouter } from "vue-router";

const store = productsStore()
const route = useRoute()
const router = useRouter()

const selectedProduct = computed( () => {
  return store.products.find((item) => item.id === Number(route.params.id))
})

const addToCart = () => {
  store.addToCart(selectedProduct.value)
  router.push({ name: 'CartView'})
}
</script>

<style scoped>
.product {
  display: flex;
  margin-top: 50px;
}
.product-image {
  margin-right: 24px;
}
</style>
