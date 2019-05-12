import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlErrorsDirective } from './directives/control-errors.directive';
import { ControlErrorComponent } from './directives/control-error/control-error.component';
import { FormSubmitDirective } from './directives/form-submit.directive';

@NgModule({
  entryComponents: [ControlErrorComponent],
  imports: [
    CommonModule
  ],
  declarations: [
    ControlErrorsDirective,
    ControlErrorComponent,
    FormSubmitDirective
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorComponent,
    FormSubmitDirective
  ]
})
export class ValidationModule { }
