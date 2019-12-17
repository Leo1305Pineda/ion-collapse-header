import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonCollapseHeaderDirective } from './ion-collapse-header.directive';

@NgModule({
  declarations: [IonCollapseHeaderDirective],
  exports: [IonCollapseHeaderDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IonCollapseHeaderModule { }
