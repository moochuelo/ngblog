import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public appName = "ngBlog";
  public isLogin: any;
  constructor(public dialog: MatDialog, public authSvc: AuthService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

  onLogout(){
    this.authSvc.logout();
  }


}
