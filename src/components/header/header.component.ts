import Vue from 'vue';
import Component from 'vue-class-component';

@Component( {
    name: 'header',
    template: require( './header.component.html' ),
    props: [
        'username'
    ],
} )
export class HeaderComponent extends Vue {

    private $welcome: string;

    private username: string;

    private messageWelcome: string = 'Welcome to the inn, ';


    set welcome( newValue: string ) {
        this.$welcome = newValue;
    }

    get welcome(): string {
        return this.messageWelcome + this.username;
    }

    private logout(): void {
        this.$emit( 'logout',
            {
                logout: true
            }
        );
        console.log( 'Logout pressed' );
    }
}