<template>
  <div class="center">
      <div class="container">
        <h1>Help us know you better!</h1>
        <hr />
        <div>
        <input type="text" placeholder="First Name*" v-model="firstName" required/>
        <br>
        <input type="text" placeholder="Last Name*" v-model="lastName" required/>
        <br>
        <input type="number" placeholder="Age*" v-model="age" required/>
        <br>
        <input type="text" placeholder="Mobile Number*" v-model="mobileNumber" required/>
        <br>
        <input type="number" placeholder="Foot Size*" v-model="footSize" required/>
        <br>
        <input type="text" placeholder="Address*" v-model="address" required/>
        <br>
        </div>
        <hr />
        <button class="registerbtn" @click = "registerUser">Register</button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
import api from '../config/api'
import axios from 'axios'

export default {
  name: 'Register',
  data: () => {
    return {
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      mobileNumber: '',
      footSize: ''
    }
  },
  methods: {
    registerUser () {
      console.log('Register is getting called')
      const data = {
        firebaseCustomerId: this.user.uid,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        address: this.address,
        mobileNumber: this.mobileNumber,
        footSize: this.footSize
      }
      if (this.firstName && this.lastName && this.age && this.address && this.mobileNumber && this.footSize) {
        axios.post(api.CustomerServicePath + '/customers/add', data, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
          .then(data => {
            router.push('/profile')
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } else {
        alert('Enter details')
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        fetch(api.BackendBasepath + '/customers/getCustomerDetailsByFirebaseUserId/' + user.uid)
          .then(response => response.json())
          .then(response => {
            axios.post(api.UserActivityServicePath + '/userActivity/add', { customerId: response.customerId }, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
            })
              .then(response => {
                router.push('/profile')
              })
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        router.push('/login')
      }
    })
  }
}
</script>

<style lang='scss'>
#heading {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 37px;
  color: #000000;
}
.container {
  padding: 16px;
  input[type=text], input[type=password], input[type=number] {
    width: 400px;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
    content: "\A";
    border-radius: 9px;
  }
  input[type=text]:focus, input[type=password]:focus, input[type=number]:focus {
    background-color: #ddd;
    outline: none;
  }
}

/* Overwrite default styles of hr */
hr {
  width: 500px;
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
  background-color: #405C58;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 350px;
  opacity: 0.9;
  border-radius: 9px;

}

.registerbtn:hover {
  opacity:1;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
