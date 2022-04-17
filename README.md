# Vue / Vuetify based Captive Portal for OPNSense
Deploying a nice responsive material UI to your OPNSense.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

Then open the dist-directory and zip all contents


### Lints and fixes files
```
yarn lint
```

### Project specific customization options
- Change logos and background in the `public` folder.
- Change color theme in `src/plugins/vuetify.js`
- Change texts in `src/locales` folder

### Adding new languages
You need to add your own translation into the `src/locales` folder.
Additionally few steps are needed:
- in `src/i18n.js` method `getBrowserLocale()` must be adapted, currently if the browser language is not allowed in this function it will fall back to english.
- in `src/components/ConnectionStatistics.vue` the same applies for the method `formatDateRelative()`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
