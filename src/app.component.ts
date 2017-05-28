import Vue from 'vue';
import Component from 'vue-class-component';
import { Socket } from 'phoenix';

import { SocketManager } from './services/socket.service';
import { Bus } from './services/bus.service';
import { HttpService } from './services/http.service';
import { STATES, PLAYER_CLASSES } from './constants';

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
  private currentState: string = 'logging';
  private errorMessage: string = "";
  private states: any = STATES;
  private playerClasses: any = PLAYER_CLASSES;
  private username: string = "";
  private socketAddress: string = "";
  private token: number = null;
  private socket: Socket;
  private isJoined: boolean = false;
  private tavernChanel: any = null;
  private gameChannel: any = null;
  private user: any = {};
  private isCardSelected: boolean = false;
  private hideJoinButton: boolean = false;
  // private players: Array<any> = []; // TODO: finish
  // private cards: Array<any> = []; // TODO: finish
  // private selectedCards: Array<any> = []; // TODO: finish
  private playerClass: string = "";

  private players: Array<any> = [
    { userName: 'Pesho', finished: true, tick: 27 },
    { userName: 'Maria', finished: false, tick: 27 },
    { userName: 'Sonia', finished: false, tick: 27 }
  ]

  private cards: Array<any> = [
    { playerClass: 'Hunter', name: 'Django Bango', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 16, cost: 5 },
    { playerClass: 'Mage', name: 'Babaliuga', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 123, cost: 8 },
    { playerClass: 'Rogue', name: 'Krokozoid', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 431, cost: 1 },
    { playerClass: 'Neutral', name: 'Zmei Gorianin', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 731, cost: 4 }
  ]

  private selectedCards: Array<any> = [
    { playerClass: 'Hunter', name: 'Django Bango', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 16, cost: 5 },
    { playerClass: 'Mage', name: 'Babaliuga', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 123, cost: 8 },
    { playerClass: 'Rogue', name: 'Krokozoid', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 431, cost: 1 },
    { playerClass: 'Neutral', name: 'Zmei Gorianin', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 731, cost: 4 }
  ]

  private loginHandler( user: any ): void {

    HttpService.post( 'http://localhost:4000/auth', {
      user: user.username,
      password: user.password
    } ).then(( response: any ) => {
      this.errorMessage = "";
      this.currentState = this.states.joining;
      this.username = user.username;
      this.socketAddress = response.data.socket;
      this.token = response.data.token;
    } ).catch(( err ) => {
      console.error( err );
      this.errorMessage = 'Could not login!'; // TODO: extract
    } );
  }

  private joinHandler(): void {
    if ( !this.socket ) {
      this.socket = SocketManager.initSocket( this.socketAddress, { params: { token: this.token } } );
      this.socket.connect();
      console.log( 'Socket created' );
    }

    this.tavernChanel = this.socket.channel( 'tavern', { token: this.token } );
    this.tavernChanel.on( 'game_found', this.gameFoundCallback );
    this.tavernChanel.on( 'game_start', this.gameStartCallback );
    this.tavernChanel.on( 'game_canceled', this.gameCanceledCallback );
    this.tavernChanel.join(); // TODO:
    console.log( 'After join on tavernChanel' );
    this.hideJoinButton = true;
  }

  private acceptGameHandler(): void {
    console.log( 'accept event towards backend' );
    this.tavernChanel.push( 'accept', { token: this.token } );
    this.isJoined = false;
  }

  private rejectGameHandler(): void {
    console.log( 'reject event towards backend' );
    this.tavernChanel.push( 'reject', { token: this.token } );
    this.tavernChanel.leave();
    this.currentState = this.states.joining;
    this.isJoined = false;
    this.hideJoinButton = false;
  }

  private gameFoundCallback(): void {
    console.log( 'game_found callback' );
    this.currentState = this.states.waiting;
    this.isJoined = true;
  }

  private gameStartCallback( response: any ): void {
    console.log( 'game_start callback' );
    console.dir( response );
    this.tavernChanel.leave();
    this.currentState = this.states.drawing;

    let gameRoom = response.gameRoom;
    this.gameChannel = this.socket.channel( gameRoom, { token: this.token } );
    this.gameChannel.on( 'tick', this.tickCallback );
    this.gameChannel.on( 'draft', this.draftCallback );
    this.gameChannel.on( 'draft_finish', this.draftFinishCallback );
    this.gameChannel.join();
  }

  private gameCanceledCallback(): void {
    console.log( 'game_canceled callback' );
    this.tavernChanel.leave();
    console.log( 'leaved tavern' );
    this.currentState = this.states.joining;
    this.isJoined = false;
    this.hideJoinButton = false;
  }

  private tickCallback( response: any ): void {
    console.log( 'tick callback' );
    this.players = response.others;
    this.user = response.user;
  }

  private draftCallback( response: any ): void {
    console.log( 'draft callback' );
    this.cards = response;
    this.isCardSelected = false;
  }

  private selectCardHandler( event: any ): void {
    console.log( 'selected event towards backend' );
    this.gameChannel.push( 'selected', { cardId: event.card.id } );
    this.selectedCards.push( event.card );
    this.isCardSelected = true;
  }

  private draftFinishCallback( response: any ): void {
    console.log( 'draft_finish callback' );
    this.cards = response;
    this.currentState = this.states.building;
    this.selectedCards = [];
  }

  private buildCardHandler( event: any ): void {
    this.selectedCards.push( event.card );
    this.cards.splice( event.index, 1 );
  }

  private selectPlayerClassHandler( event: any ): void {
    this.playerClass = event.playerClass;
    this.cards = this.cards.filter(( card: any ) => {
      return card.playerClass == event.playerClass || card.playerClass == this.playerClasses.Neutral
    } );
  }

  private removeSelectedHandler( event: any ): void {
    this.cards.push( event.card );
    this.selectedCards.splice( event.index, 1 );
  }

  private sendSelectedDeckHandler(): void {
    let cards = this.selectedCards.map(( card: any ) => {
      return card.id;
    } )
    this.gameChannel.push( 'deck', { cards: cards } );
    console.log( 'deck event towards backend' );
  }

  // TODO: remove, for buttons
  private changeState( newState: string ): void {
    this.currentState = newState;
  }
}