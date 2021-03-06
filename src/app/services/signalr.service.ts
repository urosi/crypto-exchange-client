import { OrderBook } from './../interfaces/order-book.interface';
import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;

  public orderBookUpdated: EventEmitter<OrderBook> = new EventEmitter<OrderBook>();

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(environment.hubConnectionUrl)
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  addTransferOrderBookListener = () => {
    this.hubConnection.on('broadcastorderbook', (data) => {
      this.orderBookUpdated.emit(data);
    });
  }
}
