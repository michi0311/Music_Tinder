import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService} from '../services/alert.service';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {PasswordValidationService} from "../services/passwordValidation.service";
import {User} from "../model/user";

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  register_validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  loading = false;
  submitted = false;
  maxdate = this.formatDate(new Date, 10);
  mindate = this.formatDate(new Date, 150);
  private user: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidationService.areEqual(formGroup);
    });


    this.register_validations_form = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      matching_passwords: this.matching_passwords_group,
    });
  }

  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'}
    ],
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ],
    'birthday': [
      {type: 'required', message: 'Birthday is required.'}
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 5 characters long.'},
      {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'}
    ],
    'confirm_password': [
      {type: 'required', message: 'Confirm password is required.'}
    ],
    'matching_passwords': [
      {type: 'areEqual', message: 'Password mismatch.'}
    ],
  };


  // convenience getter for easy access to form fields
  get f() {
    return this.register_validations_form.controls;
  }

  onSubmit(values) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.register_validations_form.invalid) {
      return;
    }

    this.loading = true;
    this.user = '{"name":"' + values['name'] + '", "email":"' + values['email'] + '", "password":"' + values.matching_passwords['password'] + '", "birthday":"' + values['birthday'] + '"}';
    this.userService.register(JSON.parse(this.user))
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  // format date and subtract the amount of years
  formatDate(date, years) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear() - years;

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
