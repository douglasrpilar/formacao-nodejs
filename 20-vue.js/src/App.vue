<template>
  <div id="app">
    <div>
      <h2>New Client</h2>
      <small class="error" v-show="hasError">Error. Try again!<br/></small>
      <input type="text" v-model="name" placeholder="Name"><br><br>
      <input type="email" v-model="email" placeholder="E-mail"><br><br>
      <button @click="addClient">Add Client</button>
    </div>
    <br>
    <hr>
    <div v-for="(client, index) in sortedClients" :key="client.id">
      <br>
      <p>Index: {{ index }}</p>
      Change client name: <input type="text" v-model="client.name">
      <br><br>
      <Client :showId="true" :id="client.id" :client="client" @deleteClient="deleteClient($event)" />
      <br>
      <hr>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Client from './components/Client.vue'

export default {
  name: 'App',
  data() {
    return {
      hasError: false,
      name: '',
      email: '',
      clients: [
        {
          id: 1,
          name: 'Douglas 1',
          email: 'douglas1@gmail.com',
          premium: true,
        },
        {
          id: 2,
          name: 'Douglas 2',
          email: 'douglas2@gmail.com',
          premium: true,
        }
      ]
    }
  },
  methods: {
    addClient: function() {
      if (this.name.trim().length < 3) {
        this.hasError = true;
      }
      else {
        this.hasError = false;
        this.clients.push({
          id: Date.now(),
          name: this.name,
          email: this.email,
          premium: false,
        });

        this.name = '';
        this.email = '';
      }
    },
    deleteClient: function($event) {
      let id = $event.component.client.id;
      this.clients = this.clients.filter(client => client.id != id);
    }
  },
  computed: {
    sortedClients: function() {
      return _.orderBy(this.clients, ['id'], ['desc']);
    }
  },
  components: {
    Client
  }
}
</script>

<style>
  .error {
    color: red;
  }
</style>
