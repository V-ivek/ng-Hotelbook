import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  hotels: Hotel[];
  path = '../assets/images/';

  hotel: Hotel;
  selectedHotel: Hotel;


  constructor(public hotelService: HotelService, private router: Router) { }
  getHotels(): void {
    this.hotelService.getHotels()
      .subscribe(hotels => this.hotels = hotels);
  }
  getHotel(hotel: Hotel, err): void {
    if (err) {
      throw err;
    } else {
      sessionStorage.setItem('currentHotel', JSON.stringify(hotel));
      this.router.navigate(['/details']);
    }
  }


  ngOnInit() {
    this.getHotels();
  }

}
