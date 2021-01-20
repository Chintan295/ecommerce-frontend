<template>
  <div>
    <div id="reset_password_box">
      <h4 id="reset_password_text">{{ setting }}</h4>
      <h6>{{ text }}</h6>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProfileSettings',
  props: {
    setting: {
      type: String
    },
    text: {
      type: String
    }
  }
}
</script>
<style lang='scss'>
#reset_password_box{
  padding: 10px;
  width: 250px;
  height: 70px;
  background: #FFFFFF;
  border: 1px solid #D8D8D8;
  box-sizing: border-box;
  h4{
    margin:0px;
  }
  h6{
    margin:6px 0px;
  }
}
#reset_password_text{
  margin: 0px;
  width: 131px;
  height: 20px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}
</style>
