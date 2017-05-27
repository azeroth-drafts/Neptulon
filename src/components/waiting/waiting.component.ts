import Vue from 'vue';
import Component from 'vue-class-component';

import commonServiceInstance from './../../services/common.service';

@Component( {
    name: 'waiting',
    template: require( './waiting.component.html' ),
    props: [
        'isJoined',
    ],
} )
export class WaitingComponent extends Vue {
    private isJoined: boolean;
    private commonService = commonServiceInstance;
    private token: string;

    constructor() {
        super();
        this.token = this.commonService.getToken();
    }

    private acceptGame(): void {
        this.$emit( 'acceptGame',
            {
                token: this.token
            }
        );
    }

    private rejectGame(): void {
        this.$emit( 'rejectGame',
            {
                token: this.token
            }
        );
    }
}