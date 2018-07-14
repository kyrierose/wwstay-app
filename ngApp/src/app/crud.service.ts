import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpService } from './exp.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private addUri = "http://localhost:3000/api/create";
  private delUri = "http://localhost:3000/api/delete";
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

  deleteExpense(_id){
    let deleteObject = {
      email: this.loginUserData['email'],
      expense_id: _id 
    };
    return this.http.post(this.delUri, deleteObject);
  }
}
