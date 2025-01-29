import { Injectable } from '@angular/core';
import { Sighting } from '../models/sighting';

@Injectable({
  providedIn: 'root'
})
export class SightingsService {

  public sightings: Sighting[]

  constructor() {
    this.sightings = [
      {
        id: 1,
        photo: "../server/images/rat_1.png",
        date: new Date("2024-12-22T09:00:00")
        },
      {
      id: 2,
      photo: "../../server/images/rat_1.png",
      date: new Date("2025-01-22T17:00:00")
      },
      {
        id: 3,
        photo: "../../../server/images/rat_1.png",
        date: new Date("2025-01-27T12:30:00")
      }
  ];
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


  public getAll() : Sighting[] {
    return this.sightings
  }

  public getLatest() : Sighting | undefined {
    let sightCopy : Sighting[] = [];
    this.sightings.forEach(sight => {
      sightCopy.push(sight)
      
    });

    sightCopy.sort((a,b) => a.id - b.id);
    return sightCopy.pop()
  }

  public getSpecific(id: number) : Sighting | undefined{
    return this.sightings.find(a => a.id == id)
  }

  public getThisWeek() : Sighting[] {
    let sightList : Sighting[] = [];

    this.sightings.forEach(sight => {
      //console.log(this.isThisWeek(sight.date))
      //console.log(sight)
      if (this.isThisWeek(sight.date)) {
        sightList.push(sight);
      }
    });
    console.log("array in service " + this.sightings);
    return sightList;
  }
  
}
