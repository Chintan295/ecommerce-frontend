<template>
  <div class="profile">
    <div class="profile_name">
      <img src='../images/user_icon.svg' id="profile_pic"/>
      <div>
        <h1 id="user_name_header">{{ userName }}</h1>
        <h5 id="email_id">{{ userEmail }}</h5>
      </div>
      <div class="btn">
        <router-link to='/myorders'><button class="profile_btn">My Orders</button></router-link>
        <router-link to='/myactivity'><button class="profile_btn">My Activity</button></router-link>
      </div>
    </div>
    <div class="profile_settings_container">
      <ProfileSettings setting='Reset Password' text='Get a password reset link to your registered email address'></ProfileSettings>
      <ProfileSettings setting='Payment Options' text='Edit or add payment methods'></ProfileSettings>
      <ProfileSettings setting='Update profile' text='Update name, shoe size and other details'></ProfileSettings>
      <ProfileSettings setting='Your Addresses' text='Update or Add your address'></ProfileSettings>
    </div>
  </div>
</template>
<script>

import ProfileSettings from '../components/ProfileSettings.vue'
import firebase from 'firebase'
import router from '../router'
import api from '../config/api'
import { setCookie } from '../utils/utils'

export default {
  components: { ProfileSettings },
  name: 'Profile',
  data: () => {
    return {
      userName: '',
      userEmail: ''
    }
  },
  methods: {
    setEmail () {
      this.userEmail = this.user.email
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        fetch(api.BackendBasepath + '/customers/getCustomerDetailsByFirebaseUserId/' + user.uid)
          .then(response => response.json())
          .then(response => {
            setCookie('customerId', response.customerId, 100)
            this.userName = response.firstName + ' ' + response.lastName
          })
          .catch(error => {
            console.log(error)
            router.push('/register')
          })
        this.setEmail()
      } else {
        router.push('/login')
      }
    })
  }
}
</script>
<style lang='scss'>
.profile{
  padding: 70px;
}
.profile_name{
  display: flex;
  h1{
    margin: 40px 0px 0px 100px ;
  }
  h5{
    margin: 0px 0px 0px 100px ;
  }
}
#profile_pic {
  height: 200px;
  width: 200px;
  background-color: #F9F9F9;
  border-radius: 50%;
  display: inline-block;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: 1px;
  margin-left: 1px;
}
#user_name_header{
  width: 612px;
  height: 61px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 50px;
  line-height: 61px;
}
#email_id{
  width: 200px;
  height: 17px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px
}
.btn{
  margin-top:40px;
}
.profile_btn{
  margin:10px;
  width: 200px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #405C58;
  transition-duration: 500ms;
}
.profile_btn:hover{
  background: #405C58;
  color: white;
  box-shadow: 2px 2px 10px #314b47;
}
.profile_settings_container{
  width:70%;
  height: 200px;
  position: relative;
  left:200px;
  top:50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
