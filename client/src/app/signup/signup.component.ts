import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  flag: number;
  i: number;
  name: any;
  constructor() { }

  // To validate Fullname
  nameCheck(id: string): void {
  const name = (<HTMLInputElement>document.getElementById(id)).value;
  this.flag = 0;
  const x: HTMLElement = document.getElementById('nameform');
  const  xvalue: HTMLElement = document.getElementById('name-input');
  console.log(typeof(name));

  // for (this.i = 0; this.i < name.length; this.i++) {
  //   if ((!isNaN(name[this.i]))  && (name[this.i] !== ' ') ) {
  //     x.classList.add('has-error');
  //     x.classList.add('has-feedback');
  //     xvalue.setAttribute('placeholder', 'Invalid name');
  //     this.flag = 1;
  //   }
  // }
  // if ((x.classList.contains('has-error')) && (this.flag === 0)) {
  //   x.classList.remove('has-error');
  // }

}

  ngOnInit() {
  }

}
