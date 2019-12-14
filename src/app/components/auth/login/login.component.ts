import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public errorMessage:string;

  constructor(private authSvc: AuthService, private route: Router, public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  ngOnInit() { }

  onLogin(form: UserI){
    this.authSvc.loginByEmail(form)
      .then(res => {
        this.dialogRef.close();
        // console.log('Successfully', res);
        // this.route.navigate(['/home']);
      })
      .catch(error => this.errorMessage = error.message);
  }

}
