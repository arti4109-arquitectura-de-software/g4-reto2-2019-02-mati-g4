import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableInvoiceComponent } from './table-invoice/table-invoice.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

const routes: Routes = [{component:TableInvoiceComponent ,path:"table"},{component:CreateInvoiceComponent,path:"create"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
