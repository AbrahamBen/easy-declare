import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ErrorService} from "../../../shared/services/error.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private errorService:ErrorService,
    private router:Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getFullName(userId: string) {
    this.afs.doc(`users/${userId}`).valueChanges()
      .subscribe(user => {
        // @ts-ignore
        console.log(user.fullName);
        // @ts-ignore
        localStorage.setItem('fullName', user.fullName);
        localStorage.setItem('userSate', 'connected');
      });
  }

  public onLogin() {
    this.isLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        console.log(credential.user.uid);
        this.getFullName(credential.user.uid);
        this.router.navigate(['']).then();
      })
      .catch(error => {
        this.errorMessage = this.errorService.handleError(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }





  goBack() {
    this.router.navigate(['']).then();
  }
}
