<template>
  <v-app>
    
    <v-main class="bg ma-o pa-0">
      <Principal/>
    </v-main>
  </v-app>
</template>

<style scoped>
.bg {
  background: url('assets/raspadinha/fundo_novo.jpeg');
  background-size: cover;
  background-attachment: fixed;  
}
</style>
<script>
import Principal from './components/Principal';

export default {
  name: 'App',

  components: {
    Principal,
  },

  data: () => ({
    //
  }),
};
</script>
