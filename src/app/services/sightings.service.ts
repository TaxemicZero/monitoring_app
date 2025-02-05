import { Injectable } from '@angular/core';
import { Sighting } from '../models/sighting';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SightingsService {

  public sightings: Sighting[] = [];

  constructor(private httpClient: HttpClient) {

   }

   isThisWeek (date: Date) {
    const now = new Date();
  
    const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
    const monthDay = now.getDate();
    const mondayThisWeek = monthDay - weekDay;
  
    const startOfThisWeek = new Date(+now);
    startOfThisWeek.setDate(mondayThisWeek);
    startOfThisWeek.setHours(0, 0, 0, 0);
  
    const startOfNextWeek = new Date(+startOfThisWeek);
    startOfNextWeek.setDate(mondayThisWeek + 7);
  
    return (date >= startOfThisWeek) && (date < startOfNextWeek);
  }

  /*
  public getAll() : Sighting[] {
    return this.sightings
  }
  */
  public getAll() : Observable<Sighting[]> {
    return this.httpClient.get(`${environment.baseUrl}/mocks/sightings`) as Observable<Sighting[]>;
  }


  public getLatest() : Sighting | undefined {
    var sightCopy : Sighting[] = [];
    this.getAll().subscribe(results => sightCopy = results);

    sightCopy.sort((a,b) => a.id - b.id);
    return sightCopy.pop()
  }

  public getThisWeek() : Sighting[] {
    var sightCopy : Sighting[] = [];
    var sightResult : Sighting[] = [];
    this.getAll().subscribe(results => sightCopy = results);

    sightCopy.forEach(sight => {
      //console.log(this.isThisWeek(sight.date))
      //console.log(sight)
      if (this.isThisWeek(sight.date)) {
        sightResult.push(sight);
      }
    });
    console.log("array in service " + this.sightings);
    return sightResult;
  }

 /*
 public getThisWeek() : Observable<Sighting[]> {
    return this.httpClient.get(`${environment.baseUrl}/mocks/sightings/week`) as Observable<Sighting[]>;
  }
  public getLatest() : Observable<Sighting>{
    return this.httpClient.get(`${environment.baseUrl}/mocks/sightings/last`) as Observable<Sighting>;
  }
  */
  public getSpecific(id: number) : Observable<Sighting>{
    return this.httpClient.get(`${environment.baseUrl}/mocks/sightings/${id}`) as Observable<Sighting>;
  }

  


  
  
}
