import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoicesListComponent } from './pages/invoices-list/invoices-list.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { IssueInvoiceComponent } from './pages/issue-invoice/issue-invoice.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IssueInvoiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'invoices',
        component: MainLayoutComponent,
        children: [
          { path: '', component: InvoicesListComponent },
          { path: 'issue', component: IssueInvoiceComponent },
          { path: ':invoiceId', component: InvoiceDetailsComponent },
        ],
      },
    ]),
  ],
})
export class InvoicesModule {}
