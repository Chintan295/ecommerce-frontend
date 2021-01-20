<template>
  <div>
    <div v-if="productList.length === 0" class='not_found_block'>
      <p>No Products Found</p>
    </div>
    <div v-else class="search_product_container">
      <div v-for="product in productList" :key="product.id">
        <router-link :to="`/product/${product.product.productId}`" class="link"><Product :name="product.product.productName" :price="product.price" :imageUrl="product.product.imageUrl"></Product></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '../components/Product.vue'
export default {
  components: { Product },
  name: 'Search',
  data: () => {
    return {
      productList: []
    }
  },
  created () {

  }
}
</script>

<style lang='scss'>

.not_found_block{
  margin: 0px 50px;
  text-align: center;
  width: 1300px;
  height: 400px;
  background: rgb(250, 249, 247);
  p{
    font-size: 50px;
    position: relative;
    top:150px;
  }
}
.search_product_container{
  margin: 29px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

</style>
