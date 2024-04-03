import { Route } from '@angular/router';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/missions', pathMatch: 'full' },
  { path: 'missions', component: MissionlistComponent },
  { path: 'missions/:id', component: MissionDetailsComponent }

 
];
