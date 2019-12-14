import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/auth/login/login.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts$: Observable<PostI[]>;

  constructor(public dialog: MatDialog, public authSvc: AuthService,private postSvc: PostService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumb-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/thumb-up.svg'));
  }

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }

  likeUp(element: PostI){
    this.postSvc.updatePostLikeById(element, element.id);
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed();
  }
 
}
