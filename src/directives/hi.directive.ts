import Vue from 'vue';

export default Vue.directive( 'hihi', {
    bind: function ( el, bind, vnode ) {
        console.log( 'Aloha! I am global directive' );
    }
} )