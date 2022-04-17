export class OPNSenseApi {
    constructor(axios) {
        this.axios = axios;
    }

    CLIENT_STATE_NOT_AUTHORIZED = 'NOT_AUTHORIZED';
    CLIENT_STATE_AUTHORIZED = 'AUTHORIZED';
    AUTH_TYPE_NONE = 'none';
    AUTH_TYPE_NORMAL = 'normal';

    ERROR_REQUEST = 'ERROR_REQUEST'

    async getZoneId() {
        try {
            const response = await this.axios.get(`/js/zone.js`);

            // Parse zoneid out of .js file from OPNSense
            const regex = /zoneid\s+=\s+(\d+)/i;
            const matches = response.data.match(regex);

            if (matches && matches[1]) {
                console.log("matched zoneid", matches[1]);
                return matches[1];
            }
        } catch(err) {
            console.warn("404 errors are intended in DEV-Mode, since the file is created inside the OPNSense webserver.")
            console.error(err);
        }

        console.warn("Falling back to default zone id. This will lead to login problems if more than one zone are active.")
        return 0; // As this is mainly the default zone, just go for it
    }

    async getCurrentStatus(zoneId) {
        // for debugging
        // return {"zoneid":0,"sessionId":"xyz","authenticated_via":"Test_Voucher_Server","userName":"GLk","startTime":1650186586.9204843,"ipAddress":"192.168.114.60","macAddress":"66:55:44:33:22:11","packets_in":1151,"packets_out":1144,"bytes_in":32560800,"bytes_out":643737,"last_accessed":1650186672,"acc_session_timeout":14400,"clientState":"AUTHORIZED"};

        try {
            const response = await this.axios.post(`/api/captiveportal/access/status/${zoneId}/`)
            return response.data;
        } catch(err) {
            console.error(err);
            throw this.ERROR_REQUEST;
        }
    }

    async login(zoneId, user, password) {
        try {
            const params = new URLSearchParams();
            params.append('user', user);
            params.append('password', password);
            const response = await this.axios.post(`/api/captiveportal/access/logon/${zoneId}/`,params )
            console.log(response)
            return response.data;
        } catch(err) {
            console.error(err);
            throw this.ERROR_REQUEST;
        }
    }

    async logout(zoneId) {
        try {
            const response = await this.axios.post(`/api/captiveportal/access/logoff/${zoneId}/` )
            console.log(response)
            return response.data;
        } catch(err) {
            console.error(err);
            throw this.ERROR_REQUEST;
        }
    }

}