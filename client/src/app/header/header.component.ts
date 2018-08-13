import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'HotelBook';
  @Input() user: any;

  constructor() { }

  logout(): void {
    this.user = '';
    sessionStorage.removeItem('User');

  }

  ngOnInit() {
    // this.user = JSON.parse(sessionStorage.getItem('User'));
    console.log(this.user);
  }

}
