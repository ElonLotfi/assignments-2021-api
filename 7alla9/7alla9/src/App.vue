<template>
  <v-app>
    <v-main>
      <SalonAdel/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SalonAdel from './components/SalonAdel.vue'


export default {
  name: 'App',

  components: {
    // HelloWorld,
    SalonAdel
  },

  data: () => ({
    //
  }),
}
</script>
