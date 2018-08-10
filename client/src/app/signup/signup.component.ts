import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserDetails } from '../user-details';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  flag: number;
  i: number;
  name: any;
  private signupUrl = '/api/signup';
  constructor() { }


  model = new UserDetails('Hawkeye', 'example@mail.com', 12345, 'password');

  submitted = false;

  onSubmit() {
     this.submitted = true;
     console.log('model.name = ' + this.model.name);
    }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }

}
