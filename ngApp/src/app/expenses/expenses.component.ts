import { Component, OnInit } from '@angular/core';
import { ExpService } from '../exp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  
  //populate this array after user login 
  expensesArray = []

  constructor(private exp: ExpService, private route:Router) {
    this.expensesArray = this.exp.getExpenseArray();
  }

  ngOnInit() {
    console.log(this.expensesArray);
  }

}
