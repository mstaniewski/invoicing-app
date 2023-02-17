import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueInvoiceComponent } from './issue-invoice.component';

describe('IssueInvoiceComponent', () => {
  let component: IssueInvoiceComponent;
  let fixture: ComponentFixture<IssueInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
