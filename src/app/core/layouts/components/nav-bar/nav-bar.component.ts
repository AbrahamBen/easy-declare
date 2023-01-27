import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userSate:any;
  constructor(public afAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit(): void {
    this.userSate = localStorage.getItem('userSate');
  }

 public logout() {
   this.afAuth.authState.subscribe(user => {
     if (user) {
       this.afAuth.signOut().then((r)=>{
         localStorage.clear();
         this.router.navigate(['']).then();
       });
     }
   });
  }
}
