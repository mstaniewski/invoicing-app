import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
})
export class DrawerComponent implements OnInit {
  constructor() {}

  @Input() isOpen = false;
  @Output() onClose = new EventEmitter();

  routes = [
    {
      label: 'Dashboard',
      path: '/',
    },
    {
      label: 'Customers',
      path: '/customers',
    },
    {
      label: 'Companies',
      path: '/companies',
    },
    {
      label: 'Invoices',
      path: '/invoices',
    },
  ];

  onDrawerClose() {
    this.onClose.emit();
  }

  ngOnInit(): void {}
}
