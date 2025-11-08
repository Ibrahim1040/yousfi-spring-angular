import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent
  ],
  styleUrl: './students.component.css'
})
export class StudentsComponent {

}
