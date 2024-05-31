<template>
  <div :class="{'client': !isPremium, 'client client-premium': isPremium}">
    <p class="client-id" v-if="showId">{{ id }}</p>
    <p v-else>Não mostrar id</p>
    <p>Name: {{ clientName }}</p>
    <p>E-mail: {{ client.email }}</p>
    <button class="button is-primary" @click="toggleClass">Toggle class</button>&nbsp;
    <button class="button" @click="emitDeleteClient">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'Client',
  data() {
    return {
      isPremium: false
    }
  },
  props: {
    id: Number,
    client: Object,
    showId: Boolean,
  },
  methods: {
    toggleClass: function() {
      this.isPremium = !this.isPremium;
    },
    emitDeleteClient: function() {
      this.$emit('deleteClient', {component: this});
    }
  },
  computed: {
    clientName: function() {
      return this.client.name.toUpperCase();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .client {
    background-color: antiquewhite;
    width: 40%;
    padding: 20px;
  }

  .client-premium {
    background-color: aquamarine;
  }

  .client-id {
    display: inline-block;
    background-color: aquamarine;
    padding: 7px;;
  }
</style>
