<template>
  <div class="product">
    <img :src="id"/>
    <p>{{ name }}</p>
    <p>&#8377; {{ price }}</p>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    name: {
      type: String
    },
    price: {
      type: Number
    },
    imageUrl: {
      type: String
    }
  },
  data: () => {
    return {
      id: 'https://images.unsplash.com/photo-1578116922645-3976907a7671?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    }
  },
  methods: {
  },
  mounted () {
    if (this.imageUrl !== undefined) {
      this.id = this.imageUrl
    }
  }
}
</script>

<style lang="scss">
.product{
  text-align: center;
  transition-duration: 500ms;
  margin:20px;
  p{
    margin: 0px;
  }
  img{
    width: 236px;
    height: 262px;
    border-radius: 5px;
    transition-duration: 500ms;
  }
}
.product:hover{
  transform: scale(1.1);
}
</style>
