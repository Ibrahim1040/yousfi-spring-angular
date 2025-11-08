import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent
  ],
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
