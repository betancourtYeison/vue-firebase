<template>
  <div
    id="app"
    class="main"
  >
    <span>App</span>
    <entrance />
    <customer />
  </div>
</template>

<script>
import Entrance from "@/views/Entrance.vue";
import Customer from "@/components/Customer.vue";
export default {
  components: { Entrance, Customer }
};
</script>

<style>
html {
  font-size: 62.5% !important; /* 10px / 16px = 0.625 */
}
.main {
  background-color: #a21010;
  padding: 10px;
  color: white;
  border-radius: 5px;
  width: 400px;
  font-size: 3rem;
  text-align: center;
}
</style>
