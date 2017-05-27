import Vue from 'vue';
import Component from 'vue-class-component';
import { Socket } from 'phoenix-socket';

import { SocketManager } from './services/socket.service';
import { Bus } from './services/bus.service';
import { LoginComponent } from './components';

@Component(
  {
    name: 'app',
    template: require( './app.component.html' ),
    components:
    {
      login: LoginComponent
    }
  }
)
export default class AppComponent extends Vue {
  private hello: string = 'Hello from Vue!';
  private socket: Socket;
  private state: any = {};

  constructor() {
    super();
    this.socket = SocketManager.initSocket( '/ws2' );
    console.log( this.socket );
  }
}