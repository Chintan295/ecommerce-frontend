<template>
  <div class="myorders">
    <h1>My Activities</h1>
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
              <th>DATE</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="item in loginHistory" :key="item.id">
              <td>{{ item.userId }}</td>
              <td>{{ item.date }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../config/api'
import { getCookie } from '../utils/utils'
export default {
  name: 'MyActivity',
  data: () => {
    return {
      from: null,
      to: null,
      loginHistory: []
    }
  },
  methods: {
    findOrder () {
      if (this.from === null || this.to === null) {
        return
      }
      if (this.from.toString() <= this.to.toString()) {
        fetch(api.BackendBasepath + '/userActivity/findByCustomerId/' + getCookie('customerId'))
          .then(res => res.json())
          .then(res => {
            this.loginHistory = res
          })
          .catch(error => console.log(error))
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
