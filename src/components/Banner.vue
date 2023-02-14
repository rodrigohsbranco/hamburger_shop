<template>
  <div class="banner">
      <h1 class="banner__titulo">Make Your Burguer</h1>
  </div>
</template>

<script>
export default {
    name: "Banner"
}
</script>

<style scoped>
.banner {
    background-image: url('/img/burger.jpg');
    background-position: 0 -250px;
    background-size: cover;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.banner .banner__titulo {
    color: #FFF;
    text-align: center;
    font-size: 60px;
    background-color: #222;
    padding: 20px 40px;
}
</style>