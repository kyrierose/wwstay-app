import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { ExpService } from '../exp.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup
  
  private expenseObject

  constructor(private route: Router, private crud: CrudService, private formBuilder: FormBuilder, private exp: ExpService) {
    this.expenseObject = this.exp.getUpdatedExpenseObject()
    this.updateForm = this.formBuilder.group({
      expense_name: [ this.expenseObject.expense_name , Validators.required],
      price: [ this.expenseObject.price , Validators.required]
    });
  }

  ngOnInit() {
  }

  backToExpenses(){
    this.route.navigate(['/expenses'])
  }

  updateExpense(expense_name, price){
    this.expenseObject['expense_name'] = expense_name
    this.expenseObject['price'] = price
    this.expenseObject['timestamp'] = new Date().toUTCString();

    this.crud.updateExpense(this.expenseObject).subscribe(
      res=>{
        this.crud.setLoginUserData(res)
        this.exp.setExpenseArray(res['expenses'])
        this.route.navigate(['/expenses'])
      },
      err=>console.log(err)
    );
  }

}
