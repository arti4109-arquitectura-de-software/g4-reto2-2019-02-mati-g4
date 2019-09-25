import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-table-invoice',
  templateUrl: './table-invoice.component.html',
  styleUrls: ['./table-invoice.component.css']
})
export class TableInvoiceComponent implements OnInit {

  items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('invoice').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
  }

}
