import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceDetailsComponent } from './invoices/pages/invoice-details/invoice-details.component';
import { InvoicesListComponent } from './invoices/pages/invoices-list/invoices-list.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, InvoicesListComponent, InvoiceDetailsComponent],
  imports: [
    BrowserModule,
    InvoicesModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
