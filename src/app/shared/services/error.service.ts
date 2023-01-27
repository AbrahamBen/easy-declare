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
    }else if(error.code === 'auth/account-exists-with-different-credential'){
      errorMessage = 'Ce compte existe déjà avec des informations différentes.';
    }else if(error.code == 'auth/popup-closed-by-user'){
      errorMessage = 'Popup fermé par l\'utilisateur ';
    }else if(error.code == 'auth/popup-blocked'){
      errorMessage = 'Popup bloqué';
    }
    else {
      errorMessage = 'Erreur inconnue, veuillez réessayer plus tard.';
    }
    //return throwError(errorMessage);
    return errorMessage;
  }
}
