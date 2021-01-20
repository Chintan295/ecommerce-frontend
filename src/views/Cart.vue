<template>
  <div class="yoyo">
    <div>
      <h1 id="my_cart_heading">My Cart</h1>
      <div class="cart_product_container">
        <div v-for="cartitem in cart" :key="cartitem.id">
          <CartItem :details="cartitem" @quantityUpdate="getCartDetails"></CartItem>
        </div>
      </div>
    </div>
    <div>
      <div class="order_summary">
        <h1>Order Summary</h1>
        <div class="order_summary_details">
          <div class="total">
            <h3>Total</h3>
            <h4>₹ {{ total }}</h4>
          </div>
          <div class="shipping">
            <h3>Shipping</h3>
            <h4>FREE</h4>
          </div>
          <p class="address">Karnataka, India</p>
        </div>
      </div>
      <button id="checkout_button" @click="placeOrder">Place Order</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Vue from 'vue'
import VueSimpleAlert from 'vue-simple-alert'
import router from '../router'
import CartItem from '../components/CartItem.vue'
import { getCookie } from '../utils/utils'
import api from '../config/api'
import axios from 'axios'

Vue.use(VueSimpleAlert)

export default {
  components: { CartItem },
  name: 'Cart',
  data: () => {
    return {
      customerId: getCookie('customerId'),
      cart: [],
      total: 0
    }
  },
  methods: {
    getCartDetails () {
      fetch(api.BackendBasepath + '/apiJunction/getCartDetails/' + getCookie('customerId'))
        .then(response => response.json())
        .then((response) => {
          console.log(response)
          this.cart = response.data
          this.calculateTotal()
        })
    },
    calculateTotal () {
      this.total = 0
      this.cart.forEach(element => {
        this.total += element.quantity * element.price
      })
    },
    updateTotal (value) {
      console.log(value)
      this.total += value
    },
    placeOrder () {
      this.cart.forEach(element => {
        const data = {
          customerId: getCookie('customerId'),
          inventoryId: element.inventory.inventoryItemId,
          quantity: element.quantity,
          status: 'Delivered'
        }
        axios.post(api.OrderServicePath + '/orders/add', data, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
        )
          .then(response => {
            axios.delete(api.CartServicePath + '/carts/delete/' + element.cartId)
              .then(res => {
                console.log(res)
              })
            this.$alert('Order Placed', 'Thank you for shopping', 'success')
              .then(() => { router.push('/') })
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      })
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        this.getCartDetails()
      } else {
        router.push('/login')
      }
    })
  }
}
</script>

<style lang='scss'>
.yoyo {
  display: flex;
}
#my_cart_heading {
  width: 200px;
  height: 22px;
  margin-bottom: 30px;
  font-family: Montserrat;
  font-style: normal;
  color: #405c58;
}
.order_summary{
  margin: 0px 150px;
  h1{
    margin:15px;
  }
}
.order_summary_details{
  width: 400px;
  padding: 20px 20px 70px 20px;
  border-top: 1px solid black;
  border-bottom:1px solid black;
}
.total{
  display: flex;
  h3{
    margin: 0px;
  }
  h4{
    margin: 0px 0px 0px 234px;
  }
}
.shipping{
  display: flex;
  h3{
    margin:20px 0px 0px;
  }
  h4{
    margin: 20px 0px 0px 200px;
  }
}
.address{
  text-decoration: underline;
}
#checkout_button{
  border: 0px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;

  position: relative;
  width: 350px;
  height: 49px;
  left: 200px;
  top: 10px;
  background: #2E3238;
}
</style>
