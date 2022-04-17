<template>
  <v-app class="">
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="default-logo.png"
          transition="scale-transition"
          width="140"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="container-background">
      <captive-login />
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import CaptiveLogin from "@/components/CaptiveLogin";
import Footer from "@/components/Footer";

export default {
  name: 'App',

  components: {
    CaptiveLogin, Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.container-background {
  background: url('/background.jpg') no-repeat center fixed;
  background-size: cover;
}
</style>
