import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}

  constructor(private _auth: AuthService, private route: Router) { }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => console.log("Successfully registered!"),
      err => console.log(err)
    );
    this.route.navigate(['/'])
  }

  ngOnInit() {
  }

}
