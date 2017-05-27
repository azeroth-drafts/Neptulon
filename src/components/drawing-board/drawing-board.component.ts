import Vue from 'vue';
import Component from 'vue-class-component';

import STATES from "../../constants";

@Component( {
    name: 'drawing-board',
    template: require( './drawing-board.component.html' ),
    props: [
        'cards',
        'currentState'
    ],
} )

export class DrawingBoardComponent extends Vue {
    private cards: Array<any>;
    private currentState: string;

    private mainDrawMode: Object;

    private onclick(id: number):void {
        if (this.currentState === STATES["drawing"]){
            // TODO:
        }
        else if (this.currentState === STATES["building"]){
            // TODO:
        }
    }
}