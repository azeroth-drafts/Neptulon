import Vue from "vue";

import AppComponent from "./app.component";
import "./../styles/main.scss";
import './directives';
import './filters';

if ( process.env.ENV === 'production' ) {
    Vue.config.devtools = false;
}

new Vue( {
    el: '#app',
    render: h => h( AppComponent )
} );

