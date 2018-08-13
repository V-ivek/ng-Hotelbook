import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../hotel';
import { Hotelbooking } from '../hotelbooking';
import { RegistrationService } from '../registration.service';

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


  showrm = false;
  link: string;
  showbook = false;

  constructor(private booknowService: RegistrationService) { }

  getSelectedHotel(): void {
    this.selectedHotel = JSON.parse(sessionStorage.getItem('currentHotel'));
  }

  room(id: number, rid: string, err): void {
    if (err) {
      throw err;
    } else {
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

  book(): void {
    this.showbook = true;
    this.id = null;

  }

  show(): void {
    this.showrm = true;
  }

  onSubmit(form: any) {
    this.submitted = true;
    this.model = form ;
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
      },
      err => console.log(err));
  }

  ngOnInit() {
    this.getSelectedHotel();
  }

}
