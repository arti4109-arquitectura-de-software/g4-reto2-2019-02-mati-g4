import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'challenger2';

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;



  private hubConnection: signalR.HubConnection;

  items: Observable<any[]>;

  constructor() {
    this.GetMessage();
    this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      alert("Tipo : " + type +"\n Mensaje :" + payload);
      console.log(type);
      console.log(payload);
    });

    setInterval(function () {

      var request = new XMLHttpRequest()

      request.open('GET', 'https://google.com', true)
      request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
          
        } else {
          console.log('error')
        }
      }

      request.send()

    }, 3000);

    window.onoffline = function () {
      alert("No hay internet");
    }
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

  ngOnInit(){

    /**
    * Get the online/offline status from browser window
    */
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      console.log('Online...');
      alert("Online");
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
      console.log('Offline...');
      alert("Offline");
    }));
  }

  ngOnDestroy(){
    /**
    * Unsubscribe all subscriptions to avoid memory leak
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}



