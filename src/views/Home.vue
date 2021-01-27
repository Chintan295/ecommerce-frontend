<template>
  <div class="home">
    <carousel :per-page="1" :mouse-drag="true" :autoplay="true" :autoplayTimeout=2000 :loop="true" :speed=1000>
      <slide>
        <img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/65ca26b6-5a70-44d2-a759-5d458d4d8d78/sports-4878991__480.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210119T121248Z&X-Amz-Expires=86400&X-Amz-Signature=793f891d8fd51240cd3c83931d6d602f8fe6928687e858d887c1d78251dab612&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sports-4878991__480.jpg%22' class="carousel_image"/>
      </slide>
      <slide>
        <img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/929893a2-a33f-49c8-826a-4da410334f8d/photo-1515955656352-a1fa3ffcd111.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210119T121332Z&X-Amz-Expires=86400&X-Amz-Signature=dcc1aecacabf89f0c62398eee880f2ac9a30a68f621f8ad0d5d40ce469456039&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22photo-1515955656352-a1fa3ffcd111.jpeg%22' class="carousel_image"/>
      </slide>
      <slide>
        <img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/00222f75-66b8-46a9-bd4a-32a7e4bb6db9/wingtip-1684700__480.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210119%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210119T121445Z&X-Amz-Expires=86400&X-Amz-Signature=86bd7500971e7761dfec049dc88ec1429da00220e009d3c70abdc6a8e2d6faa5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22wingtip-1684700__480.webp%22' class="carousel_image"/>
      </slide>
      <slide>
        <img src='../images/carousel.jpeg' class="carousel_image"/>
      </slide>
    </carousel>
    <h1 class="center">Best Seller</h1>
    <div class="bestseller_container">
      <div  v-for="product in productDetails" :key="product.id">
        <router-link :to="`/product/${product.product.productId}`" class="link"><Product :name="product.product.productName" :price="product.price" :imageUrl="product.imageUrl"></Product></router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'
import Product from '../components/Product.vue'
import api from '../config/api'

export default {
  name: 'Home',
  data: () => {
    return {
      productDetails: [],
      catagories: []
    }
  },
  components: {
    Carousel,
    Slide,
    Product
  },
  methods: {
    getBestSeller () {
      fetch(api.BackendBasepath + '/apiJunction/getTopProducts')
        .then(response => response.json())
        .then((response) => {
          this.productDetails = response.data
          console.log(response.data)
        })
    },
    getCategories () {
      fetch(api.BackendBasepath + '/categories/getAllCategories')
        .then(response => response.json())
        .then((response) => {
          this.catagories = response
        })
    }
  },
  mounted () {
    this.getBestSeller()
    this.getCategories()
  }
}
</script>

<style lang="scss">
.carousel_image{
  width: 100%;
  height: 600px;
}

.center{
  text-align: center;
}

.bestseller_container{
  display: flex;
  padding: 29px;
  overflow-x: auto;
}

</style>
