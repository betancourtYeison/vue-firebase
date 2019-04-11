<template>
  <div
    id="entrance"
    class="entrance"
  >
    <span>Entrada</span>
    <Customer />
    <div class="section">
      <span>Seccion</span>
    </div>
  </div>
</template>

<script>
import Customer from "@/components/Customer.vue";
export default {
  components: { Customer }
};
</script>

<style>
.entrance {
  margin: 10px;
  padding: 10px;
  background-color: #553f75;
  font-size: 2.6rem;
}
.section {
  font-size: 2.4rem;
  color: #202020;
  background-color: #fae25c;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}
</style>
