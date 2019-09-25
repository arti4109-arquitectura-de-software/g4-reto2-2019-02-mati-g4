import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenger2';

  private hubConnection: signalR.HubConnection;

  items: Observable<any[]>;

  constructor() {
    this.GetMessage();
    this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      console.log(type);
      console.log(payload);
    });
  }

  GetMessage() {

    let hubUrl = `${window.location.href}/validateHub`;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    return this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }


  public addTransferChartDataListener = (func) => {
    this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      console.log(type);
      console.log(payload);
      func();
    });
  }
}
