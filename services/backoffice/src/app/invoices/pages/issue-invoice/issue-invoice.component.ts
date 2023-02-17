import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-issue-invoice',
  templateUrl: './issue-invoice.component.html',
  styleUrls: ['./issue-invoice.component.scss'],
})
export class IssueInvoiceComponent implements OnInit {
  constructor() {}

  signature = new FormControl('');
  issuedAt = new FormControl('');
  soldAt = new FormControl('');

  ngOnInit(): void {}
}
