<template>
  <div class="center_firebase">
    <section id="firebaseui-auth-container"></section>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'Login',
  mounted () {
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    const uiConfig = {
      signInSuccessUrl: '/register', // This redirect can be achived by route using callback.
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style>
.center_firebase{
  margin: 150px 0px;
}
</style>
