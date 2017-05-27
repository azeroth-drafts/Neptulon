import Vue from 'vue';
import Component from 'vue-class-component';

import { STATES } from "../../constants";

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

    private selectCard(id: number):void {
        if (this.currentState === STATES.drawing) {

            this.removeElementById(id);

             this.$emit( 'selected',
                {
                    id: id
                }
            );
        }
        else if (this.currentState === STATES.building) {
            // TODO:
        }
    }

    private removeElementById(id: number): void {
        let objectToRemove = this.cards.filter((el) => el.id == id)[0];
        let index = this.cards.indexOf(objectToRemove);
        this.cards.splice(index, 1);
    }
}