import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {StudentsService} from '../services/students.service';
import {Student} from '../model/studentsModel';
import {NgForOf} from '@angular/common';
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent,
    NgForOf,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatRowDef,
    MatHeaderRowDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatButtonModule,
    HttpClientModule,
    RouterModule
  ],

  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{

    students! : Array<Student>;
    studentsDatasource! : MatTableDataSource<Student>;
    displayedColumns : string[] = ['id','firstName','lastName','code','programId','payments'];

    constructor(private studentService : StudentsService, private router : Router) {

    }

    ngOnInit(): void {
        this.studentService.getStudents().subscribe({
          next : value => {
            this.students = value;
            this.studentsDatasource =  new MatTableDataSource<Student>(this.students);        },
          error : err => {
              console.log(err);
          }
        })
    }

  protected studentPayments(student: Student) {
    this.router.navigate(['admin', 'student-details', student.code]);

  }
}
