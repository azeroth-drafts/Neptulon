import Vue from 'vue';
import Component from 'vue-class-component';

@Component( {
    name: 'waiting',
    template: require( './waiting.component.html' ),
    props: [
        'isJoined',
    ],
} )
export class WaitingComponent extends Vue {
    private isJoined: boolean;
    private token: string;

    constructor() {
        super();
    }

    private acceptGame(): void {
        this.$emit( 'acceptGame' );
    }

    private rejectGame(): void {
        this.$emit( 'rejectGame' );
    }
}