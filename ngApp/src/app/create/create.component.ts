import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { ExpService } from '../exp.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  selectedFile: File = null;
  fd = new FormData();

  constructor(private http:HttpClient, private router: Router, private crud: CrudService, private formBuilder: FormBuilder, private exp: ExpService) {
    this.createForm = this.formBuilder.group({
      expense_name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  backToExpenses(){
    this.router.navigate(['/expenses'])
  }

  addExpense(expense_name, price){
    //generate date string
    const timestamp = new Date().toUTCString();  
    //updates the local expenses array
    this.crud.addNewExpense(expense_name,price, timestamp).subscribe(
      res=>{
        this.exp.setExpenseArray(res['expenses'])
        this.crud.setLoginUserData(res)
        //switching to expenses page
        this.router.navigate(['/expenses']);
      },
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401)
            this.router.navigate(['/login']);
        }
      }
    );
  }
}
