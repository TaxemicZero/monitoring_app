import { Component } from '@angular/core';
import { Sighting } from '../models/sighting';
import { SightingsService } from '../services/sightings.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  public sightingsAll : Sighting[] = [];
  public sightingsWeek : Sighting[] = [];

  constructor(private sightingService: SightingsService) {
    
  }

  ngOnInit() {
    this.sightingService.getAll().subscribe(sight => this.sightingsAll = sight,
      () => {},
      () => {
        let sightingsCopy : Sighting[] = this.sightingsAll;

        sightingsCopy.forEach(sight => {
      //console.log(this.isThisWeek(sight.date))
      //console.log(sight)
        console.log(sight.date)
        console.log(this.isThisWeek(sight.date))
        if (this.isThisWeek(sight.date)) {
          this.sightingsWeek.push(sight);
          console.log(this.sightingsWeek)
        }
    });
      }
    );
    


    

   //this.sightingService.getThisWeek().subscribe(sight => this.sightingsWeek = sight);
  }



  
  isThisWeek (input: string | Date) {
    const now = new Date();
    let date = (input instanceof Date) ? input : new Date(input);
     
    const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - weekDay);
    startOfThisWeek.setHours(0, 0, 0, 0);
    
    // Get the start of next week
    const startOfNextWeek = new Date(startOfThisWeek);
    startOfNextWeek.setDate(startOfThisWeek.getDate() + 7);
    return (date >= startOfThisWeek) && (date < startOfNextWeek);
  }



}
