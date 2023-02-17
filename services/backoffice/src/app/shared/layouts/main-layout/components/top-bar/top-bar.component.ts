import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor() {}

  @Input() isOpen: boolean = false;
  @Output() onToggle = new EventEmitter();

  onToggleHandler() {
    this.onToggle.emit();
  }

  ngOnInit(): void {}
}
