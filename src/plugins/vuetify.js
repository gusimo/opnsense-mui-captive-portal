// Locally served fonts and icons
import '@mdi/font/scss/materialdesignicons.scss'
import 'typeface-roboto/index.css'

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        themes: {
            light: {
                primary: '#f0780d',
                // secondary: '#b0bec5',
                // accent: '#8c9eff',
                // error: '#b71c1c',
            },
            dark: {
                primary: '#f0780d',
            },
        },
    },
});
