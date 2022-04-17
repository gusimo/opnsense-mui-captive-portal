<template>
  <v-footer app color="black" dark class='d-flex flex-nowrap justify-space-between'>

    <div class='py-2 justify-start'>

    </div>
    <div class='justify-center'>

    </div>
    <div class='d-flex flex-sm-column flex-md-row align-md-center align-sm-end'>
      <div>{{ new Date().getFullYear() }} MIT {{$t('footer.copyright')}}</div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="scss">
.footerLink {
  color: var(--v-footerlink-base);
}
</style>