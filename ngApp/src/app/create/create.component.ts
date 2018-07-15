import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { ExpService } from '../exp.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  imageFile : File = null

  constructor(private router: Router, private crud: CrudService, private formBuilder: FormBuilder, private exp: ExpService) {
    this.createForm = this.formBuilder.group({
      expense_name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addExpense(expense_name, price){
    //generate date string
    const timestamp = new Date().toUTCString();  
    //Passing file even if its empty
    //updates the local expenses array
    this.crud.addNewExpense(expense_name,price, timestamp).subscribe(
      res=>{
        this.exp.setExpenseArray(res['expenses'])
        this.crud.setLoginUserData(res)
        //switching to expenses page
        this.router.navigate(['/expenses']);
      },
      err=> console.log(err)
    );
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.imageFile = file;
    }
}
}
