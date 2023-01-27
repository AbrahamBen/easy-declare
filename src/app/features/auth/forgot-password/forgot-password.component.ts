import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ErrorService} from "../../../shared/services/error.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router:Router,
              private afAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private errorService:ErrorService,
  ) {

  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onReset() {
    this.isLoading = true;
    const email = this.resetForm.value.email;

    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        //Goto succes page
        console.log('Email de réinitialisation de mot de passe envoyé.');
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
