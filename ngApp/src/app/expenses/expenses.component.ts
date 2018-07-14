import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
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
  total_expenses = 0

  constructor(private exp: ExpService, private route:Router) {
    //initialises expensesArray instance
    this.expensesArray = this.exp.getExpenseArray();
    this.dataSource = new MatTableDataSource(this.expensesArray);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    //initialising total_expense 
    this.total_expenses = this.getTotalExpenses();
    
  }

//Filter function for expenses
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

//calculates the total expenses 
  getTotalExpenses(){
    let sum = 0;
    for (var i = 0; i < this.expensesArray.length; i++) {
        sum+= this.expensesArray[i].price;
    }
    return sum;
  }

}
