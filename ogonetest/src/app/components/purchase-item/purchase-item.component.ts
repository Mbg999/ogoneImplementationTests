import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

// SERVICES
import { OgoneService } from './../../services/ogone/ogone.service';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemComponent implements OnInit {
  form: FormGroup;
  submited: boolean;

  constructor(private fb: FormBuilder, private _ogoneService: OgoneService) {}

  ngOnInit(): void {
    this.createForm();
  }

  submittable(): boolean {
    this.submited = true;
    return this.form.valid;
  }

  hostedPay(): void {
    this._ogoneService
      .hostedPayment(this.form.value)
      .subscribe((resp) => window.location.href = resp.redirectTo);
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: [9.99, [Validators.required, Validators.min(1)]],
    });
  }

  // getters
  get name(): AbstractControl {
    return this.form.get('name');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }

}
