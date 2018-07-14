import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpService } from '../exp.service';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource} from '@angular/material';

export interface UserData {
  expense_name: String,
  price: Number
};

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  displayedColumns: string[] = ['expense_name','price'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatSort) sort: MatSort;

  //populate this array after user login 
  expensesArray = []

  constructor(private exp: ExpService, private route:Router) {
    this.expensesArray = this.exp.getExpenseArray();
    this.dataSource = new MatTableDataSource(this.expensesArray);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
