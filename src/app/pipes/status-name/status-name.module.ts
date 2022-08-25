import { NgModule } from '@angular/core';
import { StatusNamePipe } from './status-name.pipe';

@NgModule({
    declarations: [
        StatusNamePipe
    ],
    exports: [
        StatusNamePipe
    ]
})
export class StatusNamePipeModule {}
