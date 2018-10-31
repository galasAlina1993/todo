import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


// validation function
function validateTodotimeFactory(): ValidatorFn {
  return (c: AbstractControl) => {


    const isValid = val => {
      if (!val) { return true; }
      const d: Date = new Date(val);
      if (!isNaN(d.getTime())) {
          return d.getTime() > new Date().getTime();
      }
    };

    if (isValid(c.value)) {
      return null;
    } else {
      return {
        mintime: {
          valid: false
        }
      };
    }
  };
}


@Directive({
  selector: '[app-todo-time][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TodotimeValidator, multi: true }
  ]
})
export class TodotimeValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateTodotimeFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
