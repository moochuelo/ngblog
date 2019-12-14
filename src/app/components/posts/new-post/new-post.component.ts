import { Component, OnInit, Input} from '@angular/core';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  private image:any;
  public status:boolean;
  public imageName:string;
  
  constructor(private postSvc: PostService, public dialogRef: MatDialogRef<NewPostComponent>) { }

  @Input() userUid: string;
  @Input() userAdmin: string;
  @Input() resetFormControl: boolean;
  @Input() buttonName: string;

  newPostFrom = new FormGroup({
    idControl: new FormControl(null),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl(''),
    userUid: new FormControl('', Validators.required),
    statusPost: new FormControl('', Validators.required),
  });
 
  ngOnInit() {
    
    this.postStatus(this.userAdmin);
    this.newPostFrom.controls.userUid.setValue(this.userUid);
    
  }

  postStatus(isAdmin:string):void{
    if (isAdmin) {
      this.newPostFrom.controls.statusPost.setValue(this.status = true);
    }else{
      this.newPostFrom.controls.statusPost.setValue(this.status = false);
    }
  }

  addNewPost(data: PostI, idControl:any){
    this.postSvc.preAndUpdatePost(data, idControl, this.image);
  }
  handleImage(event:any):void{
    this.image = event.target.files[0];
    this.imageName = event.target.files[0].name;
  }


}
