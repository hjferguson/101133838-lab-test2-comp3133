import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../spacex.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'; 

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatGridListModule], 
})
export class MissionlistComponent implements OnInit {
  launches: any[] = [];
  filteredLaunches: any[] = [];
  searchYear: string = '';

  constructor(
    private spacexService: SpacexService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllLaunches();
  }

  loadAllLaunches() {
    this.spacexService.getAllLaunches().subscribe({
      next: (data: any) => {
        this.launches = data;
        this.filteredLaunches = data;
      },
      error: (error: any) => {
        console.error('Error fetching launches:', error);
      }
    });
  }

  searchMissions() {
    
    if (this.searchYear) {
      this.spacexService.getLaunchesByYear(this.searchYear).subscribe({
        next: (data: any) => {
          this.filteredLaunches = data; 
        },
        error: (error: any) => {
          console.error('Error fetching launches:', error);
        }
      });
    } else {
      this.filteredLaunches = this.launches; 
    }
  }

  viewMissionDetails(flightNumber: number) {
    this.router.navigate(['/missions', flightNumber]);
  }
}