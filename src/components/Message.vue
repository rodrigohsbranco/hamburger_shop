<template>
  <div class="message">
      <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
    name: 'Message',
    props: {
        msg: String
    }

}
</script>

<style>
.message {
    color: #004085;
    background-color: #CCE5FF;
    border: 2px solid #B8DAFF;
    border-radius: 5px;
    padding: 10px;
    max-width: 400px;
    margin: 30px auto;
}
</style>