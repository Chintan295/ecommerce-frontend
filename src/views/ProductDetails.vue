<template>
  <div class="product_details">
    <div class="product_info_container">
      <img :src="imageUrl" class="product_image"/>
      <div class="product_info">
        <h1>{{ this.product.productName }}</h1>
        <h2>&#8377; {{this.selectedMerchant.price}}</h2>
        <h5>Size</h5>
        <span>{{ this.product.size }}</span>
        <h5>Merchant</h5>
        <span>{{ this.selectedMerchant.merchantName }}</span>
        <h5>Quantity</h5>
        <input type="number" min="1" v-model="quantity" class="quantity" :max="selectedMerchant.quantity"/>
        <button class="add_to_cart" @click="addToCart">{{ cartStatus }}</button>
        <h3>Product Info</h3>
        <p>{{ this.product.description }}</p>
      </div>
    </div>
    <div class="merchant_container">
      <div v-for="merchant in merchantList" :key="merchant.id">
        <Merchant :merchantDetail="merchant" @select="selectMerchant"></Merchant>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSimpleAlert from 'vue-simple-alert'
import Merchant from '../components/Merchant.vue'
import { getCookie } from '../utils/utils'
import api from '../config/api'
import router from '../router'
import axios from 'axios'

Vue.use(VueSimpleAlert)

export default {
  components: { Merchant },
  name: 'ProductDetails',
  data: () => {
    return {
      user: {},
      product: {},
      quantity: 1,
      selectedMerchant: {},
      cartStatus: 'Add to cart',
      merchantList: [],
      imageUrl: ''
    }
  },
  methods: {
    selectMerchant (merchantDetail) {
      this.selectedMerchant = merchantDetail
      this.$alert(this.selectedMerchant.merchantName + ' selected!')
    },
    addToCart () {
      if (getCookie('customerId') === '') {
        this.$alert('You are not logged in, Please Login').then(() => {
          router.push('/login')
        })
      } else if (this.quantity > this.selectedMerchant.quantity) {
        this.$alert('Only ' + this.selectedMerchant.quantity + ' Items Available')
      } else if (this.cartStatus === 'Add to cart') {
        const data = {
          customerId: getCookie('customerId'),
          quantity: this.quantity,
          inventoryId: this.selectedMerchant.inventoryItemId
        }
        axios.post(api.CartServicePath + '/carts/add', data, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
        )
          .then(response => {
            this.cartStatus = 'Remove from cart'
            this.$alert('Suceesfully added to cart').then(() => { location.reload() })
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } else {
        this.$confirm('Go to cart').then(() => { router.push('/cart') })
      }
    }
  },
  created () {
    const url = window.location.href.split('/')
    const productId = url[url.length - 1]
    this.selectedMerchant = this.merchantList[0]
    fetch(api.BackendBasepath + '/apiJunction/getProductDetails/' + productId)
      .then(response => response.json())
      .then((response) => {
        this.product = response.data.product
        this.merchantList = response.data.merchantDetails
        this.selectedMerchant = this.merchantList[0]
        this.imageUrl = response.data.product.imageUrl
        fetch(api.BackendBasepath + '/apiJunction/getCartDetails/' + getCookie('customerId'))
          .then(res => res.json())
          .then((res) => {
            res.data.forEach(element => {
              if (element.product.productId === this.product.productId) {
                this.cartStatus = 'Remove from cart'
              }
            })
          })
      })
  },
  watch: {
    $route (to, from) {
      this.getProductDetails()
    }
  }
}
</script>

<style lang="scss">
.product_details{
  margin:50px;
}
.product_image{
  width: 568px;
  height: 713px;
  border-radius: 10px;
}
.product_info_container{
  display: flex;
}
.product_info{
  margin:0px 100px;
  h1{
    margin:15px 0px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 50px;
    line-height: 61px;
  }
  h2{
    margin:15px 0px;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 25px;
    line-height: 37px;
  }
  h5{
    margin:30px 0px 7px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
  }
  span{
    padding: 10px;
    background:  #405C58;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size:13px;
    font-family: "Gill Sans", sans-serif;
  }
  .quantity{
    text-align: center;
    padding: 8px;
    width:50px;
  }
}
.add_to_cart{
  position: relative;
  background: black;
  border:0px;
  color:white;
  width: 586px;
  height: 49px;
  margin: 40px 0px;
}
.merchant_container{
  margin: 40px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
