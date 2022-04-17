<template>
  <v-row>
    <v-col cols="12">
      <v-list dense>
        <v-subheader>{{ $t('stats.stats') }}</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud-download</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{(bytesIn / 1024 / 1024).toFixed(1)}}Mb</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{(bytesOut / 1024 / 1024).toFixed(1)}}Mb</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-timer-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{formatDateRelative(startTime)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-timer-off-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{formatDateRelative(sessionTimeout)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$emit('on-reload')">
            <v-list-item-icon>
              <v-icon>mdi-reload</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t('stats.reload')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-col>
  </v-row>
</template>

<script>
import {formatRelative} from 'date-fns';
import {de, en} from 'date-fns/locale';

export default {
  name: "ConnectionStatistics",
  props: ['sessionTimeout', 'startTime', 'bytesIn', 'bytesOut'],
  methods: {
    formatDateRelative(date) {
      let locale = en;
      if (this.$i18n.locale == 'de') {
        locale = de;
      }
      return formatRelative(date, new Date(), {locale})
    },
  }
}
</script>

<style scoped>

</style>