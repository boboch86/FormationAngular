/* tslint:disable:directive-selector */
import { Directive, ContentChild, AfterContentInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormLabelDirective } from './form-label.directive';

@Directive({
  selector: '.form-group'
})
export class FormLabelValidationDirective implements AfterContentInit {
  @ContentChild(NgControl) private ngControl: NgControl;
  @ContentChild(FormLabelDirective) private label: FormLabelDirective;
  constructor() { }
  ngAfterContentInit(): void {
    if (this.ngControl && this.label) {
      this.setLabelValidity();
      this.ngControl.statusChanges.subscribe(() => this.setLabelValidity());
    }
  }

  setLabelValidity() {
    this.label.isInvalid = this.ngControl.invalid && this.ngControl.dirty;
  }
}
