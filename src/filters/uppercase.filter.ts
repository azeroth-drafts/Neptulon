import Vue from 'vue';

export default Vue.filter( 'uppercase', function ( value ) {
    return value.toUpperCase();
} );