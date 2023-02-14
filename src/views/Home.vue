<template>
  <Banner />
  <div class="main">
    <h1>Monte o seu burger:</h1>
    <BurgerForm />
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import BurgerForm from '../components/BurguerForm.vue'

export default {
  name: "Home",
  components: { Banner, BurgerForm }
}
</script>
