import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent implements OnInit {
  constructor() {}

  @Input()
  type: string = 'text';

  @Input()
  name: string = '';

  @Input()
  label: string = '';

  @Input()
  form?: FormGroup;

  ngOnInit(): void {}
}
