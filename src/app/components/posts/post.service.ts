import { UserI } from './../../shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize} from 'rxjs/operators';
import { PostI, Post, CommentI } from '../../shared/models/post.interface';
import { FileI } from './../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<PostI>;
  private filePath:any;
  private downloadUrl: Observable<string>;
  public status: boolean;
  public likes : number = 0;
  public selectedPost: PostI = new Post();
  public datePipeString: string;
  public isLoad: number;
  public isLoadtotal: number;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private datePipe: DatePipe) {
    this.postsCollection =  afs.collection<PostI>('posts');
    this.datePipeString = datePipe.transform(Date.now(), 'dd-MM-yyyy');
  }

  

  public getAllPosts():Observable<PostI[]>{
    return this.postsCollection
    .snapshotChanges()
    .pipe(
      map(action =>
          action.map(a =>{
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return { id, ...data }
          })
        )
    );
  }

  public getOnePost(id:PostI):Observable<PostI>{
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }


  public preAndUpdatePost(post: PostI, idControl:any, image: FileI) {
    this.uploadImage(post, idControl, image);
  }

  public deletePostById(post:PostI){
    return this.postsCollection.doc(post.id).delete();
  }

  public editPostById(post:any){
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadUrl,
      fileRef: this.filePath,
      tagsPost: post.tagsPost,
    };

    return this.postsCollection.doc(post.idControl).update(postObj);
  }

  private savePost(post: PostI) {

    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadUrl,
      fileRef: this.filePath,
      tagsPost: post.tagsPost,
      datePost: this.datePipeString,
      userUid: post.userUid,
      statusPost: post.statusPost,
      likesPost: 0
    };
    this.postsCollection.add(postObj)
  }

  private uploadImage(post: PostI, idControl:any, image: FileI) {

    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);

    if (idControl == null) {
      task.snapshotChanges()
        .pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
              this.downloadUrl = urlImage;
                this.savePost(post)
            })
          })
        ).subscribe(data => {
          this.isLoad = data.bytesTransferred
          this.isLoadtotal = data.totalBytes
        });
    }else{
      task.snapshotChanges()
        .pipe(finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              this.downloadUrl = urlImage;
                this.editPostById(post)

            })
          })
        ).subscribe(data => {
          this.isLoad = data.bytesTransferred
          this.isLoadtotal = data.totalBytes
        });
    }


  }

  public editPostStatusById(post:PostI){
    
    switch (post.statusPost){
      case true:
        this.status = false
      break;
      case false:
        this.status = true
      break;
    }

    console.log(this.status);

    return this.postsCollection.doc(post.id).update({
      statusPost: this.status
    } );
    
  }
  public updatePostLikeById(post:PostI, postId?:any){

    console.log(postId);
    this.likes = post.likesPost;

    return this.postsCollection.doc(postId).update({
      likesPost: this.likes + 1
    } );
    
  }

  public sendComment(postId: PostI, comment: CommentI, userData:UserI){
    const ref = this.afs.collection('/posts').doc(`${postId}`).collection('/comments').ref.doc().id;
    const commetColection = this.afs.collection('/posts').doc(`${postId}`).collection("/comments").doc(ref);
    const data = {
      email: userData.email,
      comment: comment
    }

    console.log(ref);
    console.log(commetColection);
    

    return commetColection.set(data).then(function (ref) {
      console.log('document added to items collection: ', ref);
    })
    .catch(function (error) {
      console.error('Error adding document to items collection: ' + error.message);
    })
  }

  public getAllComment(postId:any){
    const collection = this.afs.collection('/posts').doc(`${postId}`).collection("/comments");
    const comment$ = collection.valueChanges();
    return comment$;
  }

}
