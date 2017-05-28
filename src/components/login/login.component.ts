import Vue from 'vue';
import Component from 'vue-class-component';

import { LoginData } from './../../models';

@Component( {
    name: 'login',
    template: require( './login.component.html' ),
    props: [
        'errorMessage'
    ],
} )
export class LoginComponent extends Vue {

    
    private $formValid: boolean = false;

    private errorMessage: string;

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
        this.$emit( 'login',
            {
                username: this.user.username,
                password: this.user.password

            }
        );
    }
}