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

    private states: any = STATES;

    private selectCard(card: any, index: number):void {
        if (this.currentState === this.states.drawing && !this.isCardSelected) {

            this.removeElementById(card.id);

            this.$emit( 'selectCard',
                {
                    id: card.id
                }
            );
        }
        else if (this.currentState === this.states.building) {
            //this.removeElementById(card.id);

            this.$emit( 'buildCard',
                {
                    card: card,
                    index: index
                }
            );
        }
    }

    private removeElementById(id: number): void {
        let objectToRemove = this.cards.filter((el) => el.id == id)[0];
        let index = this.cards.indexOf(objectToRemove);
        this.cards.splice(index, 1);
    }
}