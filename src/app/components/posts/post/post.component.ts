import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PostI} from 'src/app/shared/models/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/auth/login/login.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})


export class PostComponent implements OnInit{


  public post$:Observable<PostI>;
  public post:any;
  public comment$:any;
  public idPost:any;
  public UserPost:any;
  public userData:any = null;


  constructor(public dialog: MatDialog,private postSvc: PostService, private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private afs: AngularFirestore, private authService: AuthService) {
    iconRegistry.addSvgIcon(
      'thumb-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/thumb-up.svg'));
   }

  public newCommentFrom = new FormGroup({
    comment: new FormControl('', Validators.required),
  });


  ngOnInit() {
    this.idPost = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(this.idPost);
    this.post$.subscribe(posts => {
      this.post = posts
    })
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.userData = user;
      }
    })
    this.comment$ = this.postSvc.getAllComment(this.idPost);
  }

  likeUp() {
    this.postSvc.updatePostLikeById(this.post, this.idPost);
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public addNewComment(data:any){
    this.postSvc.sendComment(this.idPost, data.value.comment, this.userData);
    this.resetForm(this.newCommentFrom);
  }

  resetForm(newCommentFrom: FormGroup):void {
    if (newCommentFrom != null) {
      newCommentFrom.reset({ comment: '' });
    }
  }

}
