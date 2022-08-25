import { NgModule } from '@angular/core';
import { PaymentTypeNamePipe } from './payment-type-name.pipe';

@NgModule({
    declarations: [
        PaymentTypeNamePipe
    ],
    exports: [
        PaymentTypeNamePipe
    ]
})
export class PaymentTypeNamePipeModule {}
