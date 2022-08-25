<template>
  <div>
  <h1>pannel de client</h1>
  </div>
  <v-btn  v-on:click="addClient()"       color="success"
>Zid Client</v-btn>
  <v-btn v-on:click="deleteClient()"       color="success"
>Na99es Client</v-btn>

  <v-btn v-on:click="open()"       color="success"
>Mahloul</v-btn>

  <v-btn v-on:click="closed()"       color="success"
>msaker</v-btn>

<p>9addeh men wahed yestana xs: {{ nmbrClient }}</p>
<p>{{ status }}</p>

</template>

<script>
import { hallekService } from "./service/hallekService";
export default {
  data() {
    return {
      products: {},
      imageOfProduct: "",
      productName: "",
      desserts: {},
      dessertPict: "",
      nmbrClient: 0,
      status :""
    };
  },
  // mounted() {
  //   basketService.initProducts("prod");
  //   this.getPlatInformation();
  //   this.getDessertInformation();
  //   console.log("price" + basketService.getPrice());
  // },
  methods: {
   async addClient() {
     await hallekService.addClient().then((responseJSON) => {
    responseJSON.json().then((res) => {
      console.log("cleint ajouté ! ");
      console.log(res.nbrClient);
      this.nmbrClient = res.nbrClient
    });
  })
    },

     async deleteClient() {
     await hallekService.deleteClient().then((responseJSON) => {
    responseJSON.json().then((res) => {
      console.log("cleint deleted ! ");
      console.log(res.nbrClient);
      this.nmbrClient = res.nbrClient
    });
  })
    },

     async open() {
     await hallekService.open().then((responseJSON) => {
    responseJSON.json().then((res) => {
      console.log(res.status);
      this.status = res.status
    });
  })
    },


     async closed() {
     await hallekService.closed().then((responseJSON) => {
    responseJSON.json().then((res) => {
      console.log(res.status);
      this.status = res.status
    });
  })
    },

  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
