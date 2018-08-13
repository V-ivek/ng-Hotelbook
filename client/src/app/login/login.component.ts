import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserDetails } from '../user-details';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserDetails('Hawkeye', 'example@mail.com', 12345, 'password');
  submitted = false;
  login = false;
  @Output() Logged = new EventEmitter<any>();

  constructor(private loginService: RegistrationService) { }
  onLogged(): void {
    this.Logged.emit(true);
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
        sessionStorage.setItem('User', JSON.stringify(this.model));
        sessionStorage.setItem('login' , 'true' );
        this.onLogged();
      },
      err => console.log(err));
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  ngOnInit() {
  }

}
