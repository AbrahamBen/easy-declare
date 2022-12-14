import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  });

  constructor(private router:Router) {

  }

  ngOnInit(): void {

  }

  goBack() {
    this.router.navigate(['']).then();
  }
}
