import { ServerOption } from './server';
import { Stub } from './stub';
import * as http from 'http';
import * as net from 'net';

export interface ServerOption{
    port?: number;
    proxy?: string;
}

const DEFAULT_OPTION: ServerOption = {
    port: 3000,
    proxy: undefined
};

export class Server {
    private server: net.Server;

    constructor(){}

    start( stub: Stub, option?: ServerOption ){
        this.server = http.createServer((req, res)=>{
            
        }).listen( option ? option.port : 3000 );
    }

    stop(){
        this.server.close();
    }

    private analyzeStub( stub: Stub, path: string, reqPath: string ){
        for(const key of Object.keys(stub)){
            // method
            switch(key){
                case 'GET':
                    break;
                case 'POST':
                    break;
                case 'PUT':
                    break;
                case 'DELETE':
                    break;
                default:
                    break;
            }

            // path

        }
    }
}
