<template>
  <v-btn class="mb-4" @click="router.push({ name: 'CatalogView' })">Back to catalog</v-btn>
  <div v-if="!store.cart.length" style="text-align: center">
    <h1>Empty cart...</h1>
  </div>
  <div class="cart-items" v-else>
    <div
      class="cart-item"
      v-for="item in store.cart"
      :key="item.id"
    >
      <v-card class="item-details">
        <img :src="item.thumbnail" alt="">
        <span>Brand: {{ item.brand }}</span>
        <span>Category: {{ item.category }}</span>
        <span>Price: {{ item.price }}€</span>
        <v-btn @click="removeFromCart(item)">Remove</v-btn>
      </v-card>
    </div>
  </div>
  <p v-if="total < 1000 && store.cart.length">Total: {{ total }}€</p>
  <div v-if="total > 1000">
    <p>Discounted total: {{ formattedTotal }}€</p>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { productsStore } from '@/stores/products.js'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CartView',

  setup() {
    const store = productsStore()
    const router = useRouter()

    const removeFromCart = (product) => {
      store.removeFromCart(product)
    }

    const total = computed(() => {
      return store.cart.reduce((accumulator, currentItem) => {
        return accumulator + Number(currentItem.price)
      }, 0)
    })

    const formattedTotal = computed(() => {
      if (total.value > 1000) {
        return (total.value * 0.9).toFixed(2)
      } else {
        return total.value.toFixed(2)
      }
    })

    return { store, router, removeFromCart, total, formattedTotal }
  }
})
</script>

<style scoped>
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  border-radius: 8px;
  padding: 16px;
}
.item-details img {
  width: 20%;
}
</style>
