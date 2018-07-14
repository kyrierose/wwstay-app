import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { ExpensesComponent } from '../expenses/expenses.component';
import { ExpService } from '../exp.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private route: Router, private crud: CrudService, private formBuilder: FormBuilder, private exp: ExpService) {
    this.createForm = this.formBuilder.group({
      expense_name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addExpense(expense_name, price){
    //updates the local expenses array
    this.crud.addNewExpense(expense_name,price).subscribe(
      res=>{
        this.exp.setExpenseArray(res['expenses'])
        this.route.navigate['/expenses']
      },
      err=> console.log(err)
    );
    
  }

}
