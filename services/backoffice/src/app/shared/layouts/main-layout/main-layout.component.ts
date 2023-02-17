import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  isOpen = false;

  onDrawerToggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {}
}
