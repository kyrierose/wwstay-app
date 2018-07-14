import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExpService {

  private expensesArray = []

  constructor(private route: Router) { }

  setExpenseArray(expenses){
    this.expensesArray = expenses;
  }

  getExpenseArray(){
    return this.expensesArray;
  }

  clearExpensesArray(){
    this.expensesArray = [];
  }
}
