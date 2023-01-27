import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {throwError} from "rxjs";
import {ErrorService} from "../../../shared/services/error.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error: string;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private errorService:ErrorService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
  }

  //Check if both passwords are the same
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }


  //For registering user
  onRegister() {
    this.isLoading = true;
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(() => {
        this.afAuth.currentUser.then(user => {
          this.afs.doc(`users/${user.uid}`).set({
            userID:user.uid,
            fullName: this.form.value.fullName,
            email: this.form.value.email,
            registeredDate:Date.now(),
          }).then(()=> this.router.navigate(['']).then());
        });
      })
        .catch(err => {
          this.error = this.errorService.handleError(err);
        })
        .finally(() => {
          this.isLoading = false;
          localStorage.setItem('fullName', this.form.value.fullName);
          localStorage.setItem('userSate', 'connected');
        });
    }
  }



  //Go back home
  goBack() {
    this.router.navigate(['']).then();
  }

}
