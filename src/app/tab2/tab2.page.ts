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
    this.sightingsAll = this.sightingService.getAll();
    console.log(this.sightingsAll)
    this.sightingsWeek = this.sightingService.getThisWeek();
  }
}
