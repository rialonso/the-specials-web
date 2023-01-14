import { ResponsePhoneNumberInterface } from './../../interfaces/phone-number.interface';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {
  private readonly phoneNumberURL = '/api/php-devotee/extension-updatephone.php';

  constructor(
    private http: HttpClient,
  ) { }

  get(userId: any): any {
    return this.http.get<ResponsePhoneNumberInterface>(`${this.phoneNumberURL}?userid=${userId}`,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('X-API-KEY', 'guEFSkAEITO4ZmFxIN76WmdpOqcnG35BgKRgkvO5')
      })
      .pipe();
      // .pipe(tap(console.log));
  }
}
