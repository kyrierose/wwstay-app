import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExpService {

  private expensesArray = []
  private expenseUpdateObject = {}

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

  getUpdatedExpenseObject(){
    return this.expenseUpdateObject;
  }

  setExpenseObjectById(_id){
    for (var i = 0; i < this.expensesArray.length; i++) {
        if(this.expensesArray[i]._id === _id)
          this.expenseUpdateObject = this.expensesArray[i];
    }
  }
}
