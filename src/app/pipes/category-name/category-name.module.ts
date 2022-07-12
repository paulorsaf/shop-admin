import { NgModule } from '@angular/core';
import { CategoryNamePipe } from './category-name.pipe';

@NgModule({
    declarations: [
        CategoryNamePipe
    ],
    exports: [
        CategoryNamePipe
    ]
})
export class CategoryNamePipeModule {}
