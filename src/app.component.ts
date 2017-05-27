import Vue from 'vue';
import Component from 'vue-class-component';
import { Socket } from 'phoenix-socket';

import { SocketManager } from './services/socket.service';
import { Bus } from './services/bus.service';

import {
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  WaitingComponent
} from './components';


@Component(
  {
    name: 'app',
    template: require( './app.component.html' ),
    components:
    {
      adheader: HeaderComponent,
      home: HomeComponent,
      login: LoginComponent,
      waiting: WaitingComponent
    }
  }
)
export default class AppComponent extends Vue {
  private hello: string = 'Hello from Vue!';
  private socket: Socket;
  private state: any = {};
  private trueVariable: boolean = true; // TODO: remove, left for test
  private falseVariable: boolean = false; // TODO: remove, left for test

  constructor() {
    super();
    this.socket = SocketManager.initSocket( '/ws2' );
    console.log( this.socket );
  }
}