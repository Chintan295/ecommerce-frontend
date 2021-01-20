<template>
  <div class="footer">
    <div>Signup for Newletter</div>
    <div class="footer_text">Email</div>
    <input type="text" class="email_box"/>
    <button class="footer_submit">Submit</button>
    <div class="footer_address">
      <p>1069, 24th Main Rd, Sector 4, HSR Layout</p>
      <p> Bengaluru, Karnataka 560102</p>
    </div>
    <div class="footer_heading_div">
      <div class="footer_heading">
        <span>Customer Service</span>
        <p>Shipping & Returns</p>
        <p>Store Policy</p>
        <p>Payment Methods</p>
        <p>FAQ</p>
      </div>
      <div class="footer_heading">
        <span>About</span>
        <p>Our Story</p>
        <p>Brands & Designers</p>
        <p>Stores</p>
        <p>Contacts</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
.footer{
  margin-top: 100px;
  background: #405C58;
  color:white;
  padding: 50px;
  height: 200px;
}
.footer_text{
  margin:50px 0px 2px;
  font-weight:700;
  font-size:13px;
}
.footer_submit{
  position: relative;
  top:35px;
  right:55px;
  background: grey;
  padding: 5px;
  border:1px solid white;
}
.footer_address{
  position: relative;
  top:70px;
  p{
    margin: 0;
    font-size: 13px;
  }
}
.email_box{
  background: #405C58;
  width:350px;
  height: 20px;
  border: 1px solid white;
}
.footer_heading_div{
  display: flex;
  width:350px;
  position: relative;
  margin: 20px;
  top: -150px;
  left:800px;
}
.footer_heading{
  margin: 20px;
  p{
    margin:3px;
    font-size:12px;
  }
}
</style>
