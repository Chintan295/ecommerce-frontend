<template>
  <div class="myorders">
    <h1>My Orders</h1>
    <div class="date">
      <label>from :</label>
      <input type="date" id="from" v-model="from"/>
      <label>to :</label>
      <input type="date" id="to" v-model="to"/>
      <button @click="findOrder">Find</button>
    </div>
    <table>
      <thead>
          <tr>
              <th>ID</th>
              <th>PRODUCT</th>
              <th>MERCHANT</th>
              <th>ADDRESS</th>
              <th>DATE</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>TOTAL</th>
          </tr>
      </thead>
      <tbody v-for="order in orderList" :key="order.id">
          <tr>
              <td>{{ order.order.orderId }}</td>
              <td>{{ order.product.productName }}</td>
              <td>{{ order.merchant.firstName }} {{ order.merchant.lastName }}</td>
              <td>{{ order.customer.address }}</td>
              <td>{{ order.order.orderedOn }}</td>
              <td>{{ order.order.quantity }}</td>
              <td>{{ order.inventory.price }}</td>
              <td>{{ order.order.quantity * order.inventory.price }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
import { getCookie } from '../utils/utils'
import api from '../config/api'
export default {
  name: 'MyOrders',
  data: () => {
    return {
      from: null,
      to: null,
      orderList: []
    }
  },
  methods: {
    findOrder () {
      if (this.from === null || this.to === null) {
        return
      }
      if (this.from.toString() <= this.to.toString()) {
        axios.get(api.BackendBasepath + '/apiJunction/getOrderDetailsByCustomerId/' + getCookie('customerId'))
          .then(res => {
            this.orderList = res.data.data
          })
      }
    }
  }
}
</script>

<style lang="scss">
.myorders{
  margin: 130px 50px;
  h1{
    color: #405c58;
  }
  table{
    table-layout: fixed;
    border-collapse: collapse;
    width:100%;
  }
  thead{
    background:#405C58;
    color: white;
  }
  th,td{
    border:1px solid white;
    text-align: center;
    padding: 5px 3px;
    margin: 10px;
    word-break: break-all;
  }
  td{
    border:1px solid #405C58;
    border-radius: 10px;
  }
}
.date{
  display: flex;
  margin: 10px;
  label{
    margin: 10px;
  }
  button{
    margin: 0px 10px;
    width:100px;
    border-radius: 10px;
    padding: 10px;
    background:#405C58;
    border:0px;
    color: white;
  }
}
</style>
