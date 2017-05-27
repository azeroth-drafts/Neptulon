import Vue from 'vue';
import Component from 'vue-class-component';

import { STATES } from "../../constants";

@Component( {
    name: 'drawing-board',
    template: require( './drawing-board.component.html' ),
    props: [
        'cards',
        'currentState',
        'isCardSelected'
    ],
} )

export class DrawingBoardComponent extends Vue {
    private cards: Array<any>;
    private currentState: string;
    private isCardSelected: boolean;

    private selectCard(id: number):void {
        if (this.currentState === STATES.drawing && !this.isCardSelected) {

            this.removeElementById(id);

             this.$emit( 'selectCard',
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