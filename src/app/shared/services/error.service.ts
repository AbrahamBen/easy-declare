import { Injectable } from '@angular/core';
import {throwError} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private afAuth: AngularFireAuth) { }


  //errors handler methods
  public  handleError(error) {
    let errorMessage = '';
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Mot de passe incorrect';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'Utilisateur non trouvé';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Adresse email déjà utilisée';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Adresse email non valide';
    } else {
      errorMessage = error.message;
    }
    //return throwError(errorMessage);
    return errorMessage;
  }
}
