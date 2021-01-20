<template>
<div class='cart_item'>
  <img id="product_image" :src="imageUrl" alt="">
  <div>
    <p id="product_name">{{ cartitem.product.productName }}</p>
    <p id="size_details">Size : {{ cartitem.product.size }}</p>
    <p id="merchant_details">Merchant : {{ cartitem.merchant.firstName }}</p>
    <div class="quantity_modifier_container">
      <h6 id="quantity_decreaser" @click="decreaseQuantity">-</h6>
      <h6 id="cart_quantity">{{ quantity }}</h6>
      <h6 id="quantity_increaser" @click="increaseQuantity">+</h6>
    </div>
  </div>
  <p id="product_price">₹ {{ cartitem.price }}</p>
  <p id="cross_button" @click="deleteFromCart">&#10005;</p>
</div>
</template>

<script>
import axios from 'axios'
import { getCookie } from '../utils/utils'
import api from '../config/api'
export default {
  name: 'CartItem',
  props: {
    details: {
      type: Object
    }
  },
  data: () => {
    return {
      cartitem: {},
      quantity: 1,
      maxquantity: 1,
      imageUrl: ''
    }
  },
  methods: {
    increaseQuantity () {
      if (this.quantity < this.details.inventory.quantity) {
        this.quantity = this.quantity + 1
        this.saveCart()
      }
    },
    decreaseQuantity () {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1
        this.saveCart()
      }
    },
    saveCart () {
      const data = {
        cartId: this.cartitem.cartId,
        customerId: getCookie('customerId'),
        quantity: this.quantity,
        inventoryId: this.cartitem.inventory.inventoryItemId
      }
      axios.post(api.CartServicePath + '/carts/add', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
      )
        .then(response => {
          this.$emit('quantityUpdate')
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    deleteFromCart () {
      axios.delete(api.CartServicePath + '/carts/delete/' + this.cartitem.cartId)
        .then(res => {
          location.reload()
        })
    }
  },
  created () {
    this.cartitem = this.details
    this.quantity = this.details.quantity
    this.imageUrl = this.details.product.imageUrl
  }
}
</script>

<style>
.cart_item{
  border-top:1px solid black;
  margin-left: 10px;
  padding: 20px;
  text-align: left;
  padding-top: 30px;
  padding-left: 50px;
  display: flex;
  width: 600px;
}
#product_image{
  width: 151px;
  height: 184px;
  background: #F9F9F9;
}
#product_name{
  width: 200px;
  height: 21px;
  margin-left: 20px;
  margin-top: 20px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 21px;
/* identical to box height */
  color: #000000;
}
#size_details{
  width: 73px;
  height: 17px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin-left: 30px;
  color: #85878A;
}
#merchant_details{
  margin-left: 30px;
  padding: 0px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #85878A;
}
.quantity_modifier_container{
  width:70px;
  height:20px;
  border:1px solid #000;
  display: flex;
  margin-left: 30px;
}
#quantity_decreaser{
  width: 99px;
  height: 51px;
  margin-top: 2px;
  margin-left: 10px;
  cursor: pointer;
}
#cart_quantity{
  width: 99px;
  height: 51px;
  margin-top: 2px;
}
#quantity_increaser{
  width: 99px;
  height: 51px;
  margin-top: 2px;
  cursor: pointer;
}
#product_price{
  height: 21px;
  margin-left: 150px;
  margin-top: 20px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 21px;
  color: #000000;
}
#cross_button{
  position: relative;
  bottom: 40px;
  cursor: pointer;
}
</style>
