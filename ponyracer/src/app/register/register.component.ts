import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  loginCtrl: FormControl;
  birthYearCtrl: FormControl;

  passwordForm: FormGroup;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  registrationFailed: boolean;

  static passwordMatch(group: FormGroup) {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;

        return password !== confirmPassword ? { matchingError: true } : null;
    }

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.confirmPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group(
      { password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl },
      {validator: RegisterComponent.passwordMatch}
      );
    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
      });
   }

  ngOnInit() {
  }

    register() {
      this.userService.register(this.userForm.value.login, this.userForm.value.passwordForm.password, this.userForm.value.birthYear)
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.registrationFailed = true
      );
    }
  }
