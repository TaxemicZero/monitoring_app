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

  constructor(private sightingService: SightingsService) {

  }
  ngOnInit() {
    //console.log(this.sightingService.getLatest())
    this.sighting = this.sightingService.getLatest()
  }
  

}
