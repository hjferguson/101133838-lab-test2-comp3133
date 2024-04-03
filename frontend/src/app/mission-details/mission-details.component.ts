import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, NgClass],
})
export class MissionDetailsComponent implements OnInit {
  missionDetails: any;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const flightNumber = params.get('id');
      if (flightNumber) {
        this.loadMissionDetails(flightNumber);
      }
    });
  }

  loadMissionDetails(flightNumber: string) {
    this.spacexService.getMissionDetails(flightNumber).subscribe({
      next: (data: any) => {
        this.missionDetails = data;
      },
      error: (error: any) => {
        console.error('Error fetching mission details:', error);
      }
    });
  }
}
