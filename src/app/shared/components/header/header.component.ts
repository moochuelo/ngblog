import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
// import { MydialogComponent } from '../mydialog/mydialog.component'
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public appName = "ngBlog";
  // public isLogin: any = null;
  constructor(public dialog: MatDialog, public authSvc: AuthService, private route: Router) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
    // this.isLoginUser()
  }


  // isLoginUser() {
  //   this.authSvc.isAuth().subscribe(auth => {
  //     if (auth) {
  //       this.isLogin = true;
  //       console.log(this.isLogin);
        
  //     } else{
  //       this.isLogin = null;
  //       console.log(this.isLogin);
  //     }
  //   })
  // }


  onLogout(){
    this.authSvc.logout();
    this.route.navigate(['/home']);
  }


}
