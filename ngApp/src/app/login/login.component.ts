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

  loginUserData = {};

  constructor(private _auth: AuthService, private route: Router, private exp:ExpService, private crud: CrudService) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.populateExpensesArray(res['expenses']);
        this.crud.setLoginUserData(res);
        this.route.navigate(['/expenses']);
      },
      err => console.log(err)
    );
  }

  //call expService method to instantiate its instance array
  populateExpensesArray(expensesArray){
    this.exp.setExpenseArray(expensesArray);
  }


}
