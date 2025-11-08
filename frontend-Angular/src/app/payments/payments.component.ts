import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent
  ],
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

}
