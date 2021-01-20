import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyAD9fcB7I81vsxNlRKONlVF4SHuVJ08-KM',
  authDomain: 'shlishli-4393a.firebaseapp.com',
  projectId: 'shlishli-4393a',
  storageBucket: 'shlishli-4393a.appspot.com',
  messagingSenderId: '66388959129',
  appId: '1:466388959129:web:1a00bf235cc96261b65d08',
  measurementId: 'G-C5KY8T8ZEJ'
}
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
