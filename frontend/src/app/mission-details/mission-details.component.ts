import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, NgClass],
})
export class MissionDetailsComponent implements OnInit {
  missionDetails: any;
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const flightNumber = params.get('id');
      if (flightNumber) {
        this.loadMissionDetails(flightNumber);
      }
    });
  }

  getYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
  
    return (match && match[2].length === 11) ? match[2] : null;
  }

  loadMissionDetails(flightNumber: string) {
    this.spacexService.getMissionDetails(flightNumber).subscribe({
      next: (data: any) => {
        this.missionDetails = data;
        if(this.missionDetails.links && this.missionDetails.links.video_link) {
          const videoId = this.getYouTubeVideoId(this.missionDetails.links.video_link);
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
        
        
        
      },
      error: (error: any) => {
        console.error('Error fetching mission details:', error);
      }
    });
  }
}
