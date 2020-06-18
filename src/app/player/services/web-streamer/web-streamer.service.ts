import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject, timer } from 'rxjs';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { OnPlayEventModel } from './stream-models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class WebStreamerService {
    private connection: HubConnection;
    private channelId: string;
    private loopingConnection = false;

    private OnPlayEvent$: Subject<OnPlayEventModel> = new Subject();
    public OnPlayEvent: Observable<OnPlayEventModel> = this.OnPlayEvent$.asObservable();

    constructor(private _http: HttpClient) {
        this.connection = new HubConnectionBuilder()
            .withUrl('http://localhost')
            //.withAutomaticReconnect([2, 3, 5, 8, 10, 15, 30])
            .build();

        this.connection.on("PlayEvent", (data) => {
            this.OnPlayEvent$.next(data);
        });

        this.connection.onclose(async closeErr => {
            console.log("Connection lost, restarting connection loop");
            this.StartConnectionLoop();
        })
    }

    async Connect(channelId: string) {
        this.channelId = channelId;

        this.StartConnectionLoop();
    }

    async StartConnectionLoop() {
        if (this.loopingConnection) {
            return;
        } else {
            this.loopingConnection = true;
        }
        while (true) {
            try {
                await this.ConnectInternal();
                break;
            } catch (err) {
                console.log(err);
            }
            await timer(5000).take(1).toPromise();
        }
        this.loopingConnection = false;
    }

    async ConnectInternal() {
        let data = await this._http.get<any>(environment.API_ENDPOINT + '/api/gateway?channelId=' + this.channelId).toPromise();
        let url = data.url;
        console.log("Received new Streamer Url: ");
        this.connection.baseUrl = url;
        return await this.connection.start();
    }

}