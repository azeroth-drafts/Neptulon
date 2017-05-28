import * as PhoenixSocket from 'phoenix';

export const SocketManager = {
    instance: null,
    initSocket: function ( url: string, params: any ): any {
        if ( this.instance === null ) {
            try {
                this.instance = new PhoenixSocket.Socket( url, params );
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