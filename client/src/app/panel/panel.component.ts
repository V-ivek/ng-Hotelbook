import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../hotel';
import { Hotelbooking } from '../hotelbooking';
import { RegistrationService } from '../registration.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserDetails } from '../user-details';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  selectedHotel: Hotel;
  @Input() id: number;
  model: Hotelbooking;
  submitted = false;
  roomtype: string;
  bookForm: FormGroup;
  user: UserDetails;
  namePattern: RegExp = /^[a-z ,.'-]+$/i;
  // tslint:disable-next-line:max-line-length
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  telPattern: RegExp = /^\d{10}$/;


  showrm = false;
  link: string;
  showbook = false;

  constructor(private booknowService: RegistrationService, private fb: FormBuilder) { }

  getSelectedHotel(): void {
    this.selectedHotel = JSON.parse(sessionStorage.getItem('currentHotel'));
  }

  room(id: number, rid: string, err): void {
    if (err) {
      throw err;
    } else {
      this.submitted = false;
      if (!this.showbook) {
        this.id = id;
        if (id === 1) {
          this.link = '../../assets/images/single.jpg';
          this.roomtype = 'single';
        } else if (id === 2) {
          this.link = '../../assets/images/double.jpg';
          this.roomtype = 'double';
        } else if (id === 3) {
          this.link = '../../assets/images/suite.jpg';
          this.roomtype = 'suite';
        }
      } else {
        this.showbook = false;
        this.id = id;
        if (id === 1) {
          this.link = '../../assets/images/single.jpg';
          this.roomtype = 'single';
        } else if (id === 2) {
          this.link = '../../assets/images/double.jpg';
          this.roomtype = 'double';
        } else if (id === 3) {
          this.link = '../../assets/images/suite.jpg';
          this.roomtype = 'suite';
        }

      }
    }
  }

  book(): void {
    if (this.user) {
      this.showbook = true;
      this.id = null;
    }

  }

  show(): void {
    this.showrm = true;
  }

  onSubmit(form: any) {
    this.submitted = true;
    this.showbook = false;
    this.model = form.value;
    this.model.hotelname = this.selectedHotel.name;
    this.model.roomtype = this.roomtype;
    console.log(JSON.stringify(this.model));
    this.booknowService.booknow(this.model).subscribe(
      data => {
        // function on successfull booking
        this.model = {
          'name': data.name,
          'email': data.email,
          'tel': data.tel,
          'hotelname': data.hotelname,
          'roomtype': data.roomtype,
          'checkin': data.checkin,
          'checkout': data.checkout
        };
        console.log(this.model);
      },
      err => console.log(err));
  }

  getUser(): void {
    if (sessionStorage.getItem('User')) {
      this.user = JSON.parse(sessionStorage.getItem('User'));
    } else {
      this.user = {
        'name': '',
        'email': '',
        'tel': null ,
        'pass': ''
      };
    }
  }


  ngOnInit() {
    this.getSelectedHotel();
    this.getUser();
    this.bookForm = this.fb.group({
      name: [this.user.name ? this.user.name : 'Hawkeye', [Validators.required, Validators.pattern(this.namePattern)]],
      email: [this.user.email ? this.user.email : 'example@domain.com', [Validators.required, Validators.pattern(this.emailPattern)]],
      tel: [this.user.tel ? this.user.tel : '', [Validators.required, Validators.pattern(this.telPattern)]],
      checkin: [new Date('2018 - 08 - 11'), Validators.required],
      checkout: [new Date('2018 - 08 - 15'), Validators.required]
    });
  }

}
