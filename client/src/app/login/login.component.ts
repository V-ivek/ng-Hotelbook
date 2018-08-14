import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserDetails } from '../user-details';
import { RegistrationService } from '../registration.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserDetails('Hawkeye', 'example@mail.com', 12345, 'password');
  submitted = false;
  login = false;
  @Output() Logged = new EventEmitter<string>();
  loginerr = false;
  error: any;
  // emailpattern:  RegExp = (^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$);

  constructor(private loginService: RegistrationService, private router: Router) { }
  onLogged(info: string): void {
    console.log(info);
    this.Logged.emit(info);
  }


  onSubmit(form) {
    this.submitted = true;
    console.log('model.name = ' + this.model.email + ' form.name = ' + form.email);
    this.loginService.login(form).subscribe(
      data => {
        this.login = true;
        this.model = {
          'name': data.name,
          'email': data.email,
          'tel': data.tel,
          'pass': data.pass
        };
        console.log(data);
        this.login = true;
        this.onLogged('true');
        console.log(this.Logged);
        sessionStorage.setItem('User', JSON.stringify(this.model));
        sessionStorage.setItem('login' , 'true' );
        // this.router.navigate(routes ,['/welcome', '#']);
        // window.location.reload();
        window.location.href = '/welcome';
      },
      err => {
        this.loginerr = true;
        this.error = err.error;
        console.log(err.error);
      }
    );
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  ngOnInit() {
  }

}
