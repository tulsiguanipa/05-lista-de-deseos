import { NgModule } from '@angular/core';
import { FiltercompletePipe } from './filtercomplete.pipe';


@NgModule({
  declarations: [FiltercompletePipe],
  exports: [ FiltercompletePipe ]
})
export class PipesModule { }
