import { PurchaseItemComponent } from './components/purchase-item/purchase-item.component';
import { PaymentDoneComponent } from './components/payment-done/payment-done.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PurchaseItemComponent, pathMatch: 'full' },
  { path: 'paymentDone', component: PaymentDoneComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
