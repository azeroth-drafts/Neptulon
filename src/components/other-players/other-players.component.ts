import Vue from 'vue';
import Component from 'vue-class-component';

@Component( {
    name: 'other-players',
    template: require( './other-players.component.html' ),
    props: [
        'players'
    ],
} )
export class OtherPlayersComponent extends Vue {

    private players: Array<any>;

}