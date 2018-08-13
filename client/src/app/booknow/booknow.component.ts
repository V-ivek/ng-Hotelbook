import { Component, OnInit } from '@angular/core';
import { Hotelbooking } from '../hotelbooking';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class BooknowComponent implements OnInit {
  submitted: boolean;
  model: Hotelbooking;
  book = false;


  constructor(private booknowService: RegistrationService) { }

  onSubmit(form: any) {
    this.submitted = true;
    console.log(JSON.stringify(form));
    this.booknowService.booknow(form).subscribe(
      data => {
        this.book = true;
        this.model = {
          'name': data.name,
          'email': data.email,
          'tel': data.tel,
          'hotelname': data.hotelname,
          'roomtype': data.roomtype,
          'checkin': data.checkin,
          'checkout': data.checkout
        };
      },
      err => console.log(err));
  }

  ngOnInit() {
  }

}
