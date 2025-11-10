import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatPaginator,
    MatTable,
    MatSort,
    MatInput,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef
  ],
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'status', 'firstName'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>("http://localhost:8021/payments").subscribe(
      (data) => {
        this.dataSource.data = data;

        // Filtrage personnalisé pour inclure les champs imbriqués comme student.firstname
        this.dataSource.filterPredicate = (payment: any, filter: string): boolean => {
          const dataStr = (
            payment.id +
            ' ' +
            payment.date +
            ' ' +
            payment.amount +
            ' ' +
            payment.type +
            ' ' +
            payment.status +
            ' ' +
            (payment.student?.firstname || '')
          ).toLowerCase();
          return dataStr.includes(filter);
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
