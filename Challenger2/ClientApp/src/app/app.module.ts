import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TableInvoiceComponent } from './table-invoice/table-invoice.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component'; 
import { FormsModule } from '@angular/forms';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCUkkLLebLQPDYi854XA-D1iRtKI_Tm_R8',
    authDomain: 'AAAA-BUZvAw:APA91bH1tGFagzi1UlkFJIsvIaWXZs-fMs_HWNp6k2X4GXm1g0EAZhOoujTtgjqJzGcQft3Q-sV23B28bl98Q5020vqEzrMQOwPCL3hP81ZaAM_O9zRoQc1WojVgiLq8CLVOEzN3nDVK',
    databaseURL: 'https://reto2arqsoftware.firebaseio.com/',
    projectId: 'reto2arqsoftware',
    storageBucket: 'reto2arqsoftware',
    messagingSenderId: 'reto2arqsoftware'
  }
};


@NgModule({
  declarations: [
    AppComponent,
    TableInvoiceComponent,
    CreateInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence({synchronizeTabs:true}),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
