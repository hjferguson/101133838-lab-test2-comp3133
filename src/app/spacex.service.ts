import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private baseUrl = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpClient) {}

  
  getAllLaunches() {
    return this.http.get(`${this.baseUrl}/launches`);
  }

  
  getLaunchesByYear(year: string) {
    return this.http.get(`${this.baseUrl}/launches?launch_year=${year}`);
  }

  
  getMissionDetails(flightNumber: string) {
    return this.http.get(`${this.baseUrl}/launches/${flightNumber}`);
  }
}
