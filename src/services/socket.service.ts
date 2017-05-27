import * as PhoenixSocket from 'phoenix-socket';

export const SocketManager = {
    instance: null,
    initSocket: function ( url: string ): any {
        if ( this.instance === null ) {
            try {
                this.instance = new PhoenixSocket.Socket( url );
                return this.instance
            } catch ( error ) {
                console.error( error );
                return null;
            }
        } else {
            return this.instance;
        }
    }
}