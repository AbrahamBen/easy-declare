import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
;
import firebase from 'firebase/compat/app';
import {ErrorService} from "../../../shared/services/error.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  subscriptions:Subscription[]= [];

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
    this.subscriptions.push(this.afs.doc(`users/${userId}`).valueChanges()
      .subscribe(user => {
        // @ts-ignore
        //console.log(user.fullName);
        //console.log('Hello just for dumping');
        // @ts-ignore
        localStorage.setItem('fullName', user.fullName);
        localStorage.setItem('userSate', 'connected');
        this.router.navigate(['']).then();
      }));
  }

  public onLogin() {
    this.isLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        //console.log(credential.user.uid);
        this.getFullName(credential.user.uid);
        //console.log('Hello just for dumping in onLoging methods');
        //this.router.navigate(['']).then();
      })
      .catch(error => {
        this.errorMessage = this.errorService.handleError(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }


  async loginWithGoogle() {
    try {

      const result = await  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // Récupérer les informations de l'utilisateur

      const user = result.user;
      console.log(user);

      // Ajouter les informations de l'utilisateur dans Firestore
      const userRef = this.afs.collection('users').doc(user.uid);
      const userData = {
        userID:user.uid,
        fullName: user.displayName,
        email:  user.email,
        registeredDate:Date.now(),
      };
      await userRef.set(userData, {merge: true});
      localStorage.setItem('fullName', user.displayName);
      localStorage.setItem('userSate', 'connected');
      this.router.navigate(['']).then();
    } catch (err) {
      this.errorMessage = this.errorService.handleError(err)
    }
  }

  goBack() {
    this.router.navigate(['']).then();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el=>el.unsubscribe());
  }
}
