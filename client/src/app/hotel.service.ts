import { Injectable } from '@angular/core';
import { Hotel } from './hotel';
// import { HOTELS } from './hotel-list';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelUrl = './api/hotels/hotels.JSON';

  selectedHotel: Hotel;

  constructor(private http: HttpClient) { }
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelUrl);
  }

}
