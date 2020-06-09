import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { OnPlayEventModel } from './stream-models';

@Injectable()
export class WebStreamerService {
    private connection: HubConnection;

    private OnPlayEvent$: Subject<OnPlayEventModel> = new Subject();
    public OnPlayEvent: Observable<OnPlayEventModel> = this.OnPlayEvent$.asObservable();

    constructor(streamUrl: string) {
        this.connection = new HubConnectionBuilder()
            .withUrl(streamUrl)
            .withAutomaticReconnect([2, 3, 5, 8, 10, 15, 30])
            .build();

        this.connection.on("PlayEvent", (data) => {
            this.OnPlayEvent$.next(data);
        });
    }

    async Connect() {
        return await this.connection.start();
    }

}