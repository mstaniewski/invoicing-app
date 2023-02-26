import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issue-invoice',
  templateUrl: './issue-invoice.component.html',
})
export class IssueInvoiceComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  invoice = this.fb.group({
    signature: '',
    issuedAt: '',
    soldAt: '',
    items: this.fb.array<{ summary: string; unit: string }>([
      { summary: '', unit: '' },
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.invoice.value);
  }

  get items() {
    return this.invoice.controls['items'] as FormArray<any>;
  }

  onAddItem() {
    this.invoice.controls.items.push(
      new FormControl({
        summary: '',
        unit: '',
        // nettPrice: [''],
        // nettAmount: [''],
        // vatRate: [''],
        // vatAmount: [''],
        // grossAmount: [''],
      }),
      {}
    );
  }
}
