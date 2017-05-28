import Vue from 'vue';
import Component from 'vue-class-component';

import { LoginData } from './../../models';

@Component( {
    name: 'login',
    template: require( './login.component.html' ),
    props: [
        'messageFromParent'
    ],
} )
export class LoginComponent extends Vue {

    
    private $formValid: boolean = false;

    private messageFromParent: string;

    private messageLogin: string = 'Pull up a chair by the hearth, friend!';

    private user: LoginData = {
        username: '',
        password: ''
    }

    set formValid( newValue: boolean ) {
        this.$formValid = newValue;
    }

    get formValid(): boolean {
        return !!this.user.username && !!this.user.password;
    }

    private login(): void {
        console.log( 'Username: ' + this.user.username, 'Password: ' + this.user.password );
        console.log( 'Message from parent: ' + this.messageFromParent );
        this.$emit( 'login',
            {
                username: this.user.username,
                password: this.user.password

            }
        );
    }
}