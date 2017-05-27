import Vue from 'vue';
import Component from 'vue-class-component';

@Component( {
    name: 'home',
    template: require( './home.component.html' ),
} )
export class HomeComponent extends Vue {

    private joinGame(): void {
        this.$emit( 'join' );
    }
}