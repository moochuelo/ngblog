import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit() {

  }
  // onAddUser(){
  //   this.authService.registerUser(user)
  //   .then( (res) => {
  //     this.router.navigate(['/home']);
  //   }).catch(err => console.log('err', err.message));
  // }

  onAddUser(formRegister: UserI) {
    this.authService.registerUser(formRegister)
      .then(res => {
        console.log('Successfully', res);
        this.router.navigate(['/']);
      })
      .catch(err => console.log('Error', err));
  }


}
