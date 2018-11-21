import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {select, Store} from "@ngrx/store";
import {getIsRegister, State} from "./store";
import { Subscription} from "rxjs";
import {GetRegister} from "./store/register.actions";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private isRegisteredSubscription: Subscription;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<State>) {
    this.isRegisteredSubscription = this.store.pipe(select(getIsRegister)).subscribe(isRegister => {
      if (isRegister) {
        localStorage.setItem('isRegistered', 'true');
        this.router.navigate(['']);
      }
    })
  }

  ngOnInit() {
    this.registerForm = this.fb.group(this.createFromGroup().controls, {validator: this.passwordConfirming});
  }

  submitHandler() {
    this.store.dispatch(new GetRegister())
    // localStorage.setItem('isRegistered', 'true');
    // this.router.navigate(['']);
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }


  private createFromGroup() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')])
    });
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean, matching: any } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true, matching: 'Passwords are not matching'};
    }
  }
}

