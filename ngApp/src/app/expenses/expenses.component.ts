import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { ExpService } from '../exp.service';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource} from '@angular/material';

export interface UserData {
  _id: String,
  expense_name: String,
  price: Number
};

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  displayedColumns: string[] = ['expense_name','price', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatSort) sort: MatSort;

  //populate this array after user login 
  expensesArray = []
  total_expenses = 0

  constructor(private exp: ExpService, private route:Router) {
    //initialises expensesArray instance
    this.expensesArray = this.exp.getExpenseArray();
    this.dataSource = new MatTableDataSource(this.expensesArray);
    //Initialising total_expenses of expensesArray
    this.total_expenses = this.getTotalExpenses(this.expensesArray);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

//Filter function for expenses
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //update total expenses dynamically with filter
    this.total_expenses = this.getTotalExpenses(this.dataSource.filteredData);
  }

//calculates the total expenses 
  getTotalExpenses(array){
    let sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum+= array[i].price;
    }
    return sum;
  }

  //Edit Expense
  editExpense(_id){}

  //Delete Expense
  deleteExpense(_id){
  }
}
