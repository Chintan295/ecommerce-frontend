<template>
  <div id="header">
    <div class="offercontainer">
      <div class="offerItem" v-for="offer in offers" :key="offer.id">{{ offer }}</div>
    </div>
    <img src='../images/shlishlilogo.png' class="logo">
    <div class="nav">
      <div class="nav_element"><router-link to='/' class='link'>Shop All</router-link></div>
      <div class="nav_element" v-for="category in catagories" :key="category.id"><router-link :to="`/category/${category.categoryId}`" class='link'>{{ category.name }}</router-link></div>
      <div class="nav_element">About</div>
      <div class="nav_element">Contact</div>
    </div>
    <div class="horizontal_line"></div>
    <div class="search">
      <img src="../images/facebook_logo.svg" class="social_media_logo"/>
      <img src="../images/instagram_logo.svg" class="social_media_logo"/>
      <img src="../images/twitter_logo.svg" class="social_media_logo"/>
      <div class="search_box">
        <div class="search_label">Search</div>
        <input type="text" class="search_text" placeholder="Search here..." @keyup="search" v-model="searchQuery"/>
      </div>
      <router-link to='/profile' class="user_cart_icon"><img src="../images/user_icon.svg"/></router-link>
      <button class="login" @click="logout">{{ loginButton }}</button>
      <router-link to='/cart' class="user_cart_icon"><img src="../images/cart_icon.svg"/></router-link>
      <span class="cart_count">{{ cartItemCount }}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
import api from '../config/api'
import router from '../router'
import { getCookie, setCookie } from '../utils/utils'
Vue.use(Vuex)

export default {
  name: 'Header',
  data: () => {
    return {
      offers: ['25% Off Crocs', '30% Off Sandals', '30% Off Shoes', 'Free Shipping Worldwide'],
      loginButton: 'Log In',
      catagories: null,
      cartItemCount: 0,
      searchQuery: ''
    }
  },
  methods: {
    ...mapActions(['setCookie']),
    search (event) {
      if (event.keyCode === 13) {
        alert(this.searchQuery)
      }
    },
    logout () {
      if (this.loginButton === 'Log in') {
        router.push('/login')
      } else {
        this.loginButton = 'Log in'
        firebase.auth().signOut()
        setCookie('customerId', '', 0)
        router.push('/')
      }
    },
    getCategories () {
      fetch(api.BackendBasepath + '/categories/getAllCategories')
        .then(response => response.json())
        .then((response) => {
          this.catagories = response
        })
    },
    getCartCount () {
      if (getCookie('customerId') === '') {
        return
      }
      fetch(api.BackendBasepath + '/apiJunction/getCartDetails/' + getCookie('customerId'))
        .then(response => response.json())
        .then((response) => {
          response.data.forEach(element => {
            this.cartItemCount += 1
          })
        })
    }
  },
  computed: {
    ...mapGetters(['getCookie'])
  },
  created: function () {
    this.getCategories()
    this.getCartCount()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loginButton = 'Log out'
      }
    })
  }
}
</script>

<style>
#header{
  margin-bottom: 30px;
}
.logo{
  margin: 5px 0px 0px 30px;
  width:100px;
  height: 40px;
}
.offercontainer{
  display: flex;
}

.offerItem{
  height: 30px;
  width: 358px;
  border:0.2px solid white;
  color: white;
  padding-top: 13px;
  text-align: center;
  font-weight: 600;
  font-size:13px;
  font-family: "Gill Sans", sans-serif;
  background: #405C58;
}

.nav{
  display: flex;
  margin:8px 0px 0px;
  float:right;
}

.nav_element{
  margin:10px 20px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
}

.horizontal_line{
  margin: 0vh 3vh 0.5vh;
  border-bottom:1px solid #000000;
}

.search{
  display: flex;
  margin: 10px;
  font-weight: 600;
  font-size:13px;
  font-family: "Gill Sans", sans-serif;
}

.social_media_logo{
  height: 2vh;
  width: 2%;
  margin:10px 0px;
}

.search_box{
  margin:0% 18%;
  display: flex;
}

.search_label{
  padding: 10px 30px;
  border-radius: 10px 0px 0px 10px;
  background: #405C58;
  color: white;
}

.search_text{
  padding:0px 10px;
  width:500px;
  border: 1px solid #405C58;
  border-radius:0px 10px 10px 0px;
}

.login{
  padding: 0px 10px;
  color: white;
  border-radius: 10px;
  border: 1px solid #405c58;
  background: #405C58;
  cursor: pointer;
}

.user_cart_icon{
  margin:4px 10px 0px 10px;
  height: 25px;
  width: 30px;
}
.cart_count{
  margin: 15px 0px 0px;
}

</style>
