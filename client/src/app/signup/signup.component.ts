import { Component, OnInit, OnChanges } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { UserDetails } from '../user-details';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnChanges {
  model = new UserDetails('Hawkeye', 'example@mail.com', 1234512345, 'password');
  submitted = false;
  signup = false;
  signuperr = false;
  error: any;
  signupForm: FormGroup;
  namePattern: RegExp = /^[a-z ,.'-]+$/i;
  // tslint:disable-next-line:max-line-length
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  telPattern: RegExp = /^\d{10}$/;

  constructor(private signupService: RegistrationService, private fb: FormBuilder) { }


  onSubmit(form) {
     this.submitted = true;
    this.signupService.signup(form.value).subscribe(
      data => {
        this.signup = true;
        this.signuperr = false;
        this.model = {
          'name': data.name,
          'email': data.email,
          'tel': data.tel,
          'pass': data.pass
        };
        console.log(data);
      },
      err => {
        this.signuperr = true;
        this.error = err.error;
        console.log(err.error);
      }
    );
    }


  // TODO: Remove this when we're done

  ngOnInit() {
    this.signupForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['Vivek', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['email@example.com', [Validators.required, Validators.pattern(this.emailPattern)]],
      tel: ['1234567890', [Validators.required, Validators.pattern(this.telPattern)]],
      pass: ['', [Validators.required]],
      confirmpass: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
  }


}
