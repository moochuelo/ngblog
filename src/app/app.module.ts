import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent } from './shared/components/header/header.component';


// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ModalComponent } from './shared/components/modal/modal.component';

import { DatePipe } from '@angular/common';
import { LoginModule } from './components/auth/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    HeaderComponent,
    ContainerAppComponent,
    // LoginComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    NewPostModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    LoginModule,

  ],
  providers: [
    { provide: StorageBucket, useValue: 'gs://ngblog-59778.appspot.com'},
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, ModalComponent ],
})
export class AppModule { }
