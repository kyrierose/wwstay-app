import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ExpService } from '../exp.service';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credentials = "Developed By Akshit Dhar"
  loginUserData = {};

  constructor(private _auth: AuthService, private route: Router, private exp:ExpService, private crud: CrudService) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        //storing token locally
        localStorage.setItem('token', res['token']);
        this.populateExpensesArray(res['expenses']);
        this.crud.setLoginUserData(res);
        this.route.navigate(['/expenses']);
      },
      err => console.log("Login Failed")
    );
  }

  //call expService method to instantiate its instance array
  populateExpensesArray(expensesArray){
    this.exp.setExpenseArray(expensesArray);
  }


}
