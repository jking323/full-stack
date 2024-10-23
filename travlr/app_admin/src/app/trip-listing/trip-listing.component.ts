import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(private tripDataService: TripDataService, private router: Router) {
    console.log('Trip data constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;
        this.message = trips.length > 0
          ? `There are ${trips.length} trips available`
          : 'There were no trips retrieved from the database';
        console.log(this.message);
      },
      error: (error: Error) => {
        console.log(`Error: ${error}`);
      }
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips();
  }
}
