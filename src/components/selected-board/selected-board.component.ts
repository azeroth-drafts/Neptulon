import Vue from 'vue';
import Component from 'vue-class-component';

import { PLAYER_CLASSES, STATES } from "../../constants";

@Component( {
    name: 'selected-board',
    template: require( './selected-board.component.html' ),
    props: [
        'selectedCards',
        'currentState',
        'playerClass'
    ]
} )
export class SelectedBoardComponent extends Vue {
    private selectedCards: Array<any>;

    private currentState: string;

    private playerClasses: any = PLAYER_CLASSES;

    private states: any = STATES;

    private playerClassSelected: boolean = false;

    private playerClass: string;


    private removeSelected( id: number ): void {
        if ( this.currentState === this.states.building ) {
            this.$emit( 'removeSelected', { id: id } );
            console.log( 'Remove from selected card with id: ' + id );
        }
    }

    private selectPlayerClass( playerClass: string ): void {
        if ( this.currentState === this.states.building ) {
            this.$emit( 'selectPlayerClass', { playerClass: playerClass } );
            console.log( 'Selected player class: ' + playerClass );
            this.playerClassSelected = true;
        }
    }
}