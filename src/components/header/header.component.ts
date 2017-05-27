import Vue from 'vue';
import Component from 'vue-class-component';

import { LoginData } from './../../models';

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

    private messageWelcome: string = 'Welcome ';

    private user: LoginData = {
        username: '',
        password: ''
    }

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