import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PostComponent } from './components/posts/post/post.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component:ContainerAppComponent,
    children: [
      {
        path: 'home', loadChildren: () =>
          import('./components/pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'posts', loadChildren: () =>
          import('./components/posts/list-posts/list-posts.module').then(m => m.ListPostsModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'post/:id', component: PostComponent
      },
      {
        path: '',
        redirectTo:'home',
        pathMatch : 'full'
      },
      { path: 'admin', loadChildren: () => 
          import('./components/admin/admin.module').then(m => m.AdminModule),
          canActivate: [AuthGuard]
      }
    ]
  },
  { path: 'registro', loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule), },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
