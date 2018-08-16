import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserDetails } from '../user-details';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserDetails('Hawkeye', 'example@mail.com', 12345, 'password');
  loginForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  submitted = false;
  login = false;
  @Output() Logged = new EventEmitter<string>();
  loginerr = false;
  error: any;
  // emailpattern:  RegExp = (^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$);

  constructor(private loginService: RegistrationService, private router: Router, private fb: FormBuilder) { }
  onLogged(info: string): void {
    console.log(info);
    this.Logged.emit(info);
  }


  onSubmit(form) {
    console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.email);
    console.log('Password', form.value.pass);
    this.submitted = true;
    this.loginService.login(form.value).subscribe(
      data => {
        this.login = true;
        this.model = data;
        console.log(data);
        this.login = true;
        this.onLogged('true');
        console.log(this.Logged);
        sessionStorage.setItem('User', JSON.stringify(this.model));
        sessionStorage.setItem('login' , 'true' );
    //     // this.router.navigate(routes ,['/welcome', '#']);
    //     // window.location.reload();
        window.location.href = '/welcome';
      },
      err => {
        this.loginerr = true;
        this.error = err.error;
        console.log(err.error);
      }
    );
  }




  ngOnInit() {
    this.loginForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      email: ['email@example.com', [Validators.required, Validators.pattern(this.emailPattern)]],
      pass: ['', [ Validators.required]]
    });
  }

}
