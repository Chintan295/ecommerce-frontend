<template>
  <div class="merchant" @click="selectMerchant">
    <h4>{{ merchantDetail.merchantName }}</h4>
    <h5>&#8377; {{ merchantDetail.price }}</h5>
    <div class='rating'>
      <div v-for="item in Array(Math.round(4)).fill(0)" :key="item.id"><img src="../images/star-fill.svg"/></div>
      <div v-for="item in Array(5 - Math.round(4)).fill(0)" :key="item.id"><img src="../images/star.svg"/></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'

Vue.use(VueSVGIcon)

export default {
  name: 'Merchant',
  props: {
    merchantDetail: {
      type: Object
    }
  },
  data: () => {
    return {
    }
  },
  methods: {
    selectMerchant (event) {
      this.$emit('select', this.merchantDetail)
    }
  }
}
</script>

<style lang='scss'>
.merchant{
  margin:10px;
  padding: 20px;
  width:200px;
  border: 1px solid black;
  border-radius: 10px;
  h4{
    margin:0px;
  }
  h5{
    margin: 0px;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 16px;
    line-height: 37px;
  }
  .rating{
    display: flex;
    img{
      margin:0px 2px;
      width:20px;
      height: 20px;
    }
  }
}
</style>
