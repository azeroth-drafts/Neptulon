import Vue from 'vue';
import Component from 'vue-class-component';

@Component( {
    name: 'home',
    template: require( './home.component.html' ),
    props: [
        'hideJoin'
    ]
} )
export class HomeComponent extends Vue {
    private hideJoin: boolean;

    private joinGame(): void {
        this.$emit( 'join' );
    }
}