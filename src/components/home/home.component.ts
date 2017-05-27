import Vue from 'vue';
import Component from 'vue-class-component';
import { Socket } from 'phoenix-socket';

import { SocketManager } from './../../services/socket.service';
import commonServiceInstance from './../../services/common.service';

@Component( {
    name: 'home',
    template: require( './home.component.html' ),
} )
export class HomeComponent extends Vue {
    private commonService = commonServiceInstance;
    private socket: Socket;

    constructor() {
        super();
        this.socket = SocketManager.initSocket( '/ws2' ); // TODO:
    }

    private joinGame(): void {
        let token = this.commonService.getToken();
        console.log(this.socket);
    }
}