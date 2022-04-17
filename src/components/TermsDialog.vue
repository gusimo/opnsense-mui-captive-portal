<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            small text color="primary"
            v-bind="attrs"
            v-on="on"
        >
          {{ $t('loginform.showTerms') }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t('terms.title') }}
        </v-card-title>

        <v-card-text>
          {{$t('terms.text')}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="secondary"
              text
              @click="dialog = false"
          >
            {{ $t("terms.btnReject") }}
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="clickAccept"
          >
            {{ $t("terms.btnAccept") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TermsDialog",
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    clickAccept() {
      this.dialog = false;
      this.$emit('accept')
    }
  }
}
</script>

<style scoped>

</style>