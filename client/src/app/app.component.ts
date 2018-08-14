import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  title = 'hotel-book';
  @Input() logged: false ;
  user = JSON.parse(sessionStorage.getItem('User'));

  getLogged(logged) {
    this.logged = logged;
  }

}
