import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator/';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['statusPost', 'titlePost', 'tagsPost', 'datePost','actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static:true}) paginator:MatPaginator;
  @ViewChild(MatSort, {static:true}) sort:MatSort;

  constructor(private postSvc: PostService, public dialog: MatDialog, private authService: AuthService) { }

  public isAdmin: any = null;
  public userUid: any = null;
  public statusClass: string;
  public resetForm:boolean = false;

  ngOnInit() {
    this.postSvc.getAllPosts().subscribe(posts => this.dataSource.data = posts);
    this.getCurrentUser();
  }
  

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth =>{
      console.log(auth);
      
      if (auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe( userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
        console.log(this.userUid);
        
      }
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post: PostI) {

    const editando: string = "Editando post";
    const buttonName: string = "Guardar";

    this.openDialog(editando, buttonName);
    this.postSvc.selectedPost = Object.assign({}, post);
  }

  onStatusPost(element: PostI){
      this.postSvc.editPostStatusById(element);
  }

  onDeletePost(post:PostI){
    console.log('Delete post', post);
    Swal.fire({
      title:'Esta Seguro?',
      text:'Si usted ejecuta esta accion no podra revertir los cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3a3a3a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if(result.value){
        this.postSvc.deletePostById(post).then(()=> {
          Swal.fire('Eliminado', 'Se a eliminado correctamente', 'success');
        }).catch((error)=>{
          Swal.fire('Error', 'No se a podido eliminar', 'error');
        });
      }
    });
  }

  onNewPost(){
    const message = 'Publicando Nuevo post';
    const buttonName = 'Publicar';
    this.postSvc.selectedPost = Object.assign({});
    this.openDialog(message, buttonName);
  }

  openDialog(message:string, buttonName?:string){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { 
      id: this.userUid,
      isAdmin: this.isAdmin,
      type: message,
      postEdit: message,
      resetForm: this.resetForm,
      buttonName: buttonName,
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed();
  }


}
