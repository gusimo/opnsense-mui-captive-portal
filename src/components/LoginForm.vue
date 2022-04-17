<template>
  <v-card>
    <v-card-title class="justify-center">{{ $t('loginform.headline') }}</v-card-title>
    <v-card-text>

      <v-form :disabled="busy" v-if="statusClientState !== opnApi.CLIENT_STATE_AUTHORIZED">
        <v-row>
          <v-col cols="12" class="py-2">
            <p class="body-1">
              {{ $t('loginform.introduction') }}
            </p>
          </v-col>
          <v-col cols="12" class="py-0" :hidden="statusAuthType === opnApi.AUTH_TYPE_NONE">
            <v-text-field outlined prepend-inner-icon="mdi-account" :label="$t('loginform.username')" v-model="username"></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0" :hidden="statusAuthType === opnApi.AUTH_TYPE_NONE">
            <v-text-field outlined prepend-inner-icon="mdi-key"
              :label="$t('loginform.password')"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="col-sm-6 py-0">
            <v-checkbox :label="$t('loginform.acceptTerms')" v-model="acceptedTerms" class="py-0 my-0" />
          </v-col>
          <v-col cols="12" class="col-sm-6 py-0">
            <terms-dialog @accept="acceptedTerms=true"/>
          </v-col>
        </v-row>
      </v-form>
      <connection-statistics v-else
         :bytes-in="statusBytesIn"
         :bytes-out="statusBytesOut"
         :session-timeout="statusSessionTimeout"
         :start-time="statusStartTime"
         @on-reload="getStatus"
      />

      <v-alert :value="alert" :type="alertType" dismissible border="left" transition="scale-transition">
        {{$t(alertMessageKey)}}
      </v-alert>

    </v-card-text>
    <v-card-actions class="pb-5">
      <v-spacer/>
      <v-btn color="primary" :hidden="statusClientState === opnApi.CLIENT_STATE_AUTHORIZED"
             @click="doLogin" :disabled="busy || (!acceptedTerms)" :loading="busy">
        <v-icon class="mr-2">mdi-key</v-icon>{{ $t('loginform.btnLogin') }}
      </v-btn>
      <v-btn color="secondary" :hidden="statusClientState !== opnApi.CLIENT_STATE_AUTHORIZED"
             @click="doLogout" :disabled="busy" :loading="busy">
        <v-icon class="mr-2">mdi-logout</v-icon>{{ $t('loginform.btnLogout') }}
      </v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import {OPNSenseApi} from "@/OPNSenseApi";
import TermsDialog from "@/components/TermsDialog";
import ConnectionStatistics from "@/components/ConnectionStatistics";
const queryString = require('query-string');

const ALERT_TYPE_ERROR = 'error';
const ALERT_TYPE_INFO = 'info';
const ALERT_TYPE_SUCCESS = 'success';

export default {
  name: "LoginPassword",
  components: {ConnectionStatistics, TermsDialog},
  data: () => ({
    username: null,
    password: null,
    showPassword: false,
    busy: false,
    alert: false,
    alertMessageKey: undefined,
    alertType: undefined,
    acceptedTerms: false,
    opnApi: undefined,
    zoneId: undefined,
    statusAuthType: undefined,
    statusClientState: undefined,
    statusBytesIn: undefined,
    statusBytesOut: undefined,
    statusStartTime: undefined,
    statusSessionTimeout: undefined,
  }),
  methods: {
    showAlert(alertType, messageKey) {
      this.alertType = alertType;
      this.alertMessageKey = messageKey;
      this.alert = true;
      const self = this;
      setTimeout(() => {
        self.alert = false;
      }, 7000);
    },
    async getZoneId() {
      this.busy = true;
      this.zoneId = await this.opnApi.getZoneId();
      this.busy = false;
    },
    async getStatus() {
      this.alert = false;
      this.busy = true;
      try {
        const status = await this.opnApi.getCurrentStatus(this.zoneId);
        this.statusAuthType = status.authType;
        this.statusClientState = status.clientState;
        this.statusBytesIn = status.bytes_in;
        this.statusBytesOut = status.bytes_out;
        const startDate = new Date(0);
        startDate.setUTCSeconds(status.startTime);
        this.statusStartTime = startDate;
        this.statusSessionTimeout = new Date(this.statusStartTime.getTime() + status.acc_session_timeout*1000); //*1000 + status.acc_session_timeout*1000
        return status;
      }
      catch(err) {
        this.showAlert(ALERT_TYPE_ERROR, err);
      }
      finally {
        this.busy = false;
      }
    },
    async doLogin() {
      this.alert = false;
      this.busy = true;
      try {
        const status = await this.opnApi.login(this.zoneId, this.username, this.password);
        this.statusClientState = status.clientState;

        if (this.statusClientState === this.opnApi.CLIENT_STATE_NOT_AUTHORIZED) {
          this.showAlert(ALERT_TYPE_ERROR, 'FAIL_LOGIN');
        }

        if (this.statusClientState === this.opnApi.CLIENT_STATE_AUTHORIZED) {
          this.showAlert(ALERT_TYPE_SUCCESS, 'SUCCESS_LOGIN');

          const parsedQuery = queryString.parse(location.search);
          if (parsedQuery.redirurl != undefined) {
            window.location = `http://${parsedQuery.redirurl}?refresh`;

            /*
            Debug: ?redirurl=captive.apple.com/hotspot-detect.html // http://192.168.114.1:8000/index.html?redirurl=captive.apple.com/hotspot-detect.html
             */


          } else {
            window.location.reload();
          }

        }

        // return status;
      }
      catch(err) {
        this.showAlert(ALERT_TYPE_ERROR, err);
      }
      finally {
        this.busy = false;
      }
    },
    async doLogout() {
      this.alert = false;
      this.busy = true;
      try {
        const status = await this.opnApi.logout(this.zoneId);
        this.statusClientState = status.clientState;

        if (this.statusClientState === this.opnApi.CLIENT_STATE_NOT_AUTHORIZED) {
          this.showAlert(ALERT_TYPE_SUCCESS, 'SUCCESS_LOGOUT');
        }

        return status;
      }
      catch(err) {
        this.showAlert(ALERT_TYPE_ERROR, err);
      }
      finally {
        this.busy = false;
      }
    },
  },
  async created() {
    this.opnApi = new OPNSenseApi(this.axios);
    await this.getZoneId();
    await this.getStatus();
  }
}
</script>

<style scoped>

</style>