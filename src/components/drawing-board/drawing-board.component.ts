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

    // TODO: remove
    constructor() {
        super();
        this.cards = [
            { playerClass: 'Hunter', name: 'First', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 16, cost: 5 },
            { playerClass: 'Mage', name: 'Second', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 123, cost: 8 },
            { playerClass: 'Rougue', name: 'Third', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 431, cost: 1 },
            { playerClass: 'Neutral', name: 'Fourth', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 731, cost: 4 },
            { playerClass: 'Mage', name: 'Second', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 1, cost: 8 },
            { playerClass: 'Rougue', name: 'Third', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 3, cost: 1 },
            { playerClass: 'Neutral', name: 'Fourth', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 5, cost: 4 },
            { playerClass: 'Mage', name: 'Second', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 8, cost: 8 },
            { playerClass: 'Rougue', name: 'Third', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 9, cost: 1 },
            { playerClass: 'Neutral', name: 'Fourth', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 10, cost: 4 },
            { playerClass: 'Rougue', name: 'Third', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 13, cost: 1 },
            { playerClass: 'Neutral', name: 'Fourth', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 15, cost: 4 },
            { playerClass: 'Mage', name: 'Second', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 18, cost: 8 },
            { playerClass: 'Rougue', name: 'Third', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 19, cost: 1 },
            { playerClass: 'Neutral', name: 'Fourth', img: 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/EX1_116.png', id: 20, cost: 4 },
        ]

        this.currentState = 'drawing';
    }

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