import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {createConsoleLogServer} from "@ionic/angular-toolkit/builders/cordova-serve/log-server";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    login_validations_form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.login_validations_form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required.'}],
    'password': [
      {type: 'required', message: 'Password is required.'}],
  };

    // convenience getter for easy access to form fields
    get f() { return this.login_validations_form.controls; }

    onSubmit(values) {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.login_validations_form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log('top')
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log('error')
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
