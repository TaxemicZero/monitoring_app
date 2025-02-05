import { Component } from '@angular/core';
import { Sighting } from '../models/sighting';
import { SightingsService } from '../services/sightings.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  public sighting? : Sighting;
  public sightCopy : Sighting[] = [];

  constructor(private sightingService: SightingsService) {

  }
  ngOnInit() {
    //console.log(this.sightingService.getLatest())   .subscribe(cars => this.carsList = cars)
    //this.sighting = this.sightingService.getLatest()
    this.sightingService.getAll().subscribe(sight => 
      this.sightCopy = sight, 
      () => {},
      () => {
      console.log(this.sightCopy);
      this.sightCopy.sort((a,b) => a.id - b.id);
      this.sighting = this.sightCopy.pop(); 
    });


    //this.sightingService.getSpecific(1).subscribe(sight=> this.sighting = sight)
    //this.sightingService.getLatest().subscribe(sight => this.sighting = sight);
  }
  


  /*
  public getLatest() : Sighting | undefined {
    var sightCopy : Sighting[] = [];
    this.sightingService.getAll.subscribe(sight => sightCopy = sight)

    sightCopy.sort((a,b) => a.id - b.id);
    return sightCopy.pop()
  }
  */
}
