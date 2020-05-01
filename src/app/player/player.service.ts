import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ClientUpdate } from './model/ClientUpdate';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PlayerService {
    connection: signalR.HubConnection;
    OnUpdate: Observable<ClientUpdate>;

    constructor() {
    }

    public Channel: string;

    async Connect(Channel?: string) {
        if (Channel != null) {
            this.Channel = Channel;
        }
        if (this.Channel == null) {
            throw "Channel not defined";
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(environment.API_ENDPOINT + "/PlayerHub?channel=" + this.Channel)
            .build();
        this.SetTriggers();

        try {
            await this.connection.start();
            console.log("connected");
        } catch (err) {
            console.log(err);
            setTimeout(() => this.Connect(), 5000);
        }
    }

    async Disconnect() {
        try {
            await this.connection.stop();
            console.log("connected");
        } catch (err) {
            console.log(err);
            setTimeout(() => this.Connect(), 5000);
        }
    }

    SetTriggers() {
        let emitter: Subscriber<ClientUpdate>
        this.OnUpdate = new Observable(e => {
            emitter = e;
        })
        this.connection.on("ClientUpdate", data => {
            emitter.next(data);
        });

        this.connection.onclose(async (err) => {
            if (err == null)
                return;
            await this.Connect();
        });
    }

    Send() {
        this.connection.invoke("SendMessage", "text");
    }
}