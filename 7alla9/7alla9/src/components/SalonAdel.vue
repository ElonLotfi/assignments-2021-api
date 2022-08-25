<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h1 class="text-h4 font-weight-thin mb-4">
          Adel 7alla9
        </h1>

<div class="img">
        <v-img
  lazy-src="../assets/IMG_3944.jpg"
  max-height="250"
  max-width="300"
  src="../assets/IMG_3944.jpg"
></v-img></div>
<br/>
        <h4 class="subheading">
          Mar7ba bikom 
        </h4>
       
        <h4 class="subheading">
         Mahloul wela msaker ? : {{status}}
        </h4>

        <h4 class="subheading">
         9addeh men wahed yestana : {{nmbrClient}}
        </h4>


      </v-col>
    </v-row>
  </v-parallax>
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
   mounted() {
     this.getStatus();
     this.getNbrClient();
  },
  methods: {
    async getStatus() {
     await hallekService.getStatus().then((responseJSON) => {
    responseJSON.json().then((res) => {
      console.log(res.status);
      this.status = res.status
    });
  })
    },
         async getNbrClient() {
     await hallekService.getNbrClient().then((responseJSON) => {
    responseJSON.json().then((res) => {
      console.log(res.status);
      this.nmbrClient = res.nbrClient
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
.img{
  margin-left:40%
}
</style>
