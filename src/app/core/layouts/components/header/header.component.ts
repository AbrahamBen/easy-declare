import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string;
   localFullName:string

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    /*this.afAuth.currentUser.then(user => {
      if(user){
        this.afs.doc(`users/${user.uid}`).valueChanges().subscribe(userData => {
          // @ts-ignore
          localStorage.setItem('fullName',userData.fullName);
          this.localFullName  = localStorage.getItem('fullName') ;

          if(this.localFullName){
            this.userName = this.localFullName;
          }

        });
      }
    });*/
    this.userName = localStorage.getItem('fullName')
  }

}
