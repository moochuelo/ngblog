import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {



  public userData:Observable<firebase.User>;
  public userRoute:any;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, public route: Router) {
    this.userData = afAuth.authState;
  }

  

  registerUser(user: UserI){
    const {email, password, name} = user;
    return new Promise((resolve, reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginByEmail(user:UserI){
    const {email, password} = user;
   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.auth.signOut().then(() => {
      this.route.navigate(['home']);
    }).catch(function (error) {
      console.log('no salior', error);
    });
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserI = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, { merge:true })
  }

  isAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  isUserAdmin(userUid: UserI){
    return this.afs.doc<UserI>(`users/${userUid}`).valueChanges();
  }

}
