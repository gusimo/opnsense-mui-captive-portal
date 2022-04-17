<template>

  <v-container fill-height fluid>
    <v-row align="center"
           justify="center">
      <v-col cols="1" class="col-md-3 col-lg-4"></v-col>
      <v-col cols="10" class="col-md-6 col-lg-4">

        <login-form/>

      </v-col>
      <v-col cols="1" class="col-md-3 col-lg-4"></v-col>
    </v-row>
  </v-container>

</template>

<script>
  import LoginForm from "@/components/LoginForm";
  export default {
    name: 'CaptiveLogin',
    components: {LoginForm},
    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>

</style>
