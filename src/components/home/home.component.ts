import Vue from 'vue';
import Component from 'vue-class-component';

import commonServiceInstance from './../../services/common.service';

@Component( {
    name: 'home',
    template: require( './home.component.html' ),
} )
export class HomeComponent extends Vue {
    private commonService = commonServiceInstance;

    private joinGame(): void {
        let token = this.commonService.getToken();
        this.$emit( 'join',
            {
                token: token
            }
        );
        console.log('join game pressed');
    }
}