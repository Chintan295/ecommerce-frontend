<template>
  <div class="center">
    <img :src="image" class="category_image">
    <h1 class="center">{{ category.name }}</h1>
    <div class="category_product_container">
      <div v-for="product in productList" :key="product.id">
        <router-link :to="`/product/${product.product.productId}`" class="link"><Product :name="product.product.productName" :price="product.price" :imageUrl="product.product.imageUrl"></Product></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '../components/Product.vue'
import api from '../config/api'
export default {
  components: { Product },
  name: 'Category',
  data: () => {
    return {
      category: {},
      productList: [],
      image: ''
    }
  },
  methods: {
    getData () {
      const url = window.location.href.split('/')
      const categoryId = url[url.length - 1]
      fetch(api.BackendBasepath + '/categories/getCategories/' + categoryId)
        .then(response => response.json())
        .then((response) => {
          this.category = response
          this.image = response.imageUrl
        })

      fetch(api.BackendBasepath + '/apiJunction/getProductsByCategoryId/' + categoryId)
        .then(response => response.json())
        .then((response) => {
          console.log(response)
          this.productList = response.data
        })
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    $route (to, from) {
      this.getData()
      location.reload()
    },
    productList (to, from) {
    }
  }
}
</script>

<style>
.category_image{
  margin: 50px 50px;
  border-radius: 10px;
  width: 1291px;
  height: 500px;
}
.category_product_container{
  margin: 29px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
