import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  signup(form): any {
    console.log(JSON.stringify(form.name));
    return this.http.post('/api/signup', form);
  }
  login(form): any {
    console.log(JSON.stringify(form.email));
    return this.http.post('/api/login', form);
  }
  booknow(form): any {
    console.log(JSON.stringify(form.email));
    return this.http.post('/api/hotelbooking', form);
  }
}
