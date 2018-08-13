import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { UserDetails } from '../user-details';
import { tap, catchError } from 'rxjs/operators';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model = new UserDetails('Hawkeye', 'example@mail.com', 12345, 'password');
  submitted = false;
  signup = false;
  signuperr = false;
  error: any;



  constructor(private signupService: RegistrationService) { }


  onSubmit(form) {
     this.submitted = true;
     console.log('model.name = ' + this.model.name + ' form.name = ' + form.name );
    this.signupService.signup(form).subscribe(
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
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
