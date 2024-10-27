import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';


@Injectable()
export class TripDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) {}

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = $(this.apiBaseUrl) + 'trips/'

  getTrips() : Observable<Trip[]> {

      return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip) {
    return this.http.post<Trip>(this.tripUrl, formData)
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  private makeAuthApiCall(urlPath: string, user: User):
  Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
    .post(url, user)
    .toPromise()
    .then(response => response.json() as AuthResponse)
    .catch(this.handleError);
  }

}
