import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  
  //populate this array after user login 
  expensesArray = []

  constructor() { }

  ngOnInit() {
  }

}
