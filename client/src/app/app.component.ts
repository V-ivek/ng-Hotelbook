import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'hotel-book';
  logged: false ;
  user = JSON.parse(sessionStorage.getItem('User'));

  getLogged(logged) {
    this.logged = logged;
  }
}
