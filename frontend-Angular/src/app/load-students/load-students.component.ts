import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-load-students',
  templateUrl: './load-students.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent
  ],
  styleUrl: './load-students.component.css'
})
export class LoadStudentsComponent {

}
