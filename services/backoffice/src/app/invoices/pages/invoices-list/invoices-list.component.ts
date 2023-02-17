import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent implements OnInit {
  constructor() {}

  data = [
    {
      signature: '01/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '02/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '03/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '04/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '05/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '06/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '07/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '08/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
    {
      signature: '09/2023',
      customer: {
        displayName: 'Xebia',
      },
      amount: 25200,
      issuedAt: new Date(),
      dueDate: new Date(),
    },
  ];

  ngOnInit(): void {}
}
