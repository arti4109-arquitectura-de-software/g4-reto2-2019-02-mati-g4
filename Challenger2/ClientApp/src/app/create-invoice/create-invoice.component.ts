import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class Invoice 
{
    terminalCode :string
    date:string
    description :string
    nroInvoice:string
    saleCode:string
    value:string
}

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})

export class CreateInvoiceComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<any>;
  
  model :Invoice = new Invoice();
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Invoice>('invoice');
  }
  Save() {
    debugger;
    const id = this.afs.createId();
    var items = {
      terminalCode :this.model.terminalCode,
      date :this.model.date,
      description :this.model.description,
      nroInvoice : this.model.nroInvoice,
      value :this.model.value
    };
    this.itemsCollection.add(items);
  }

  ngOnInit() {
  }

}
