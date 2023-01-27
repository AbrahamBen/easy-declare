import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ErrorService} from "../../../shared/services/error.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {
  resetForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  counter = 30; // Le nombre de secondes avant la redirection
  intervalId : any; // L'ID de l'intervalle pour clearInterval

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
        this.successMessage = `Un email de réinitialisation a été envoyé à ${this.resetForm.controls['email'].value}`;
        console.log('Email de réinitialisation de mot de passe envoyé.');
        this.resetForm.reset();
        this.startCountdown();
      })
      .catch(error => {
        this.errorMessage = this.errorService.handleError(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.stopCountdown();
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.intervalId);
  }

  goBack() {
    this.router.navigate(['']).then();
  }

  ngOnDestroy() {
    this.stopCountdown();
  }
}
