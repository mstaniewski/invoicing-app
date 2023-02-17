import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit {
  constructor() {}

  @Input()
  type: string = 'text';

  @Input()
  label: string = '';

  @Input()
  model!: FormControl;

  ngOnInit(): void {}
}
