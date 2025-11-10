import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService} from '../services/students.service';
import {Payment} from '../model/studentsModel';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{

    studentCode! : string;
    studentPayments! : Array<Payment>;
    paymentsDataSource! : MatTableDataSource<Payment>;
    displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'status', 'firstName'];


    constructor(private activatedRoute : ActivatedRoute,
                private studentService : StudentsService,
                private router : Router) {
    }
    ngOnInit(): void {
        this.studentCode = this.activatedRoute.snapshot.params['code']
      this.studentService.getStudentPayments(this.studentCode).subscribe({
          next : value => {
            this.studentPayments = value;
            this.paymentsDataSource = new MatTableDataSource<Payment>(this.studentPayments)
          },
        error : err => {
            console.log(err);
        }
      });
    }

  protected newPayment() {
      this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
  }
}
