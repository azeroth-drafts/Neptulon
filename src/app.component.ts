import Vue from 'vue';
import Component from 'vue-class-component';
import { Socket } from 'phoenix-socket';

import { SocketManager } from './services/socket.service';
import { Bus } from './services/bus.service';
import { HttpService } from './services/http.service';

import {
  DrawingBoardComponent,
  HeaderComponent,
  HomeComponent,
  LoginComponent,
  OtherPlayersComponent,
  SelectedBoardComponent,
  WaitingComponent
} from './components';


@Component(
  {
    name: 'app',
    template: require( './app.component.html' ),
    components:
    {
      adHeader: HeaderComponent,
      drawingBoard: DrawingBoardComponent,
      home: HomeComponent,
      login: LoginComponent,
      otherPlayers: OtherPlayersComponent,
      selectedBoard: SelectedBoardComponent,
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

  /*  HttpService.post( 'http://localhost:4000/auth', {
       user: 'Bahur'
     } ).then(( response: any ) => {
     
      this.socket = SocketManager.initSocket( response.data.socket, { params: {token: response.data.token}} );
      this.socket.connect();
     console.log( this.socket );
     } )*/
  }

  private players: Array<any> = [
    { userName: 'Pesho', finished: true, tick: 27 },
    { userName: 'Maria', finished: false, tick: 27 },
    { userName: 'Sonia', finished: false, tick: 27 }
  ]

  private cards: Array<any> = [
    { playerClass: 'Hunter', name: 'Django Bango', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 16, cost: 5 },
    { playerClass: 'Mage', name: 'Babaliuga' ,img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 123, cost: 8 },
    { playerClass: 'Rogue', name: 'Krokozoid', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 431, cost: 1 },
    { playerClass: 'Neutral', name: 'Zmei Gorianin', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 731, cost: 4 }
  ]
  
   private selectedCards: Array<any> = [
    { playerClass: 'Hunter', name: 'Django Bango', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 16, cost: 5 },
    { playerClass: 'Mage', name: 'Babaliuga' ,img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 123, cost: 8 },
    { playerClass: 'Rogue', name: 'Krokozoid', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 431, cost: 1 },
    { playerClass: 'Neutral', name: 'Zmei Gorianin', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 731, cost: 4 }
  ]

  private currentState: string = 'drawing';
  private isCardSelected: boolean = false;

  private selectCardHandler(card: any): void {
    // TODO: send to channel
    this.isCardSelected = true;
  }

  private buildCardHandler(card: any): void {
    // TODO: send to channel
    console.log('build id:' + card.id);
  }
}