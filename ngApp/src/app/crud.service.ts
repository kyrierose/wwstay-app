import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private addUri = "http://localhost:3000/api/create";
  private loginUserData = {}

  constructor(private http: HttpClient) { }

  setLoginUserData(loginUserData){
    this.loginUserData = loginUserData;
  }

  getLoginUserData(){
    return this.loginUserData;
  }

  addNewExpense(expense_name, price){
    let expenseObject = {
      email: this.loginUserData['email'],
      expense:{
        expense_name: expense_name,
        price: price
      } 
    }
    return this.http.post(this.addUri, expenseObject);
  }
}
