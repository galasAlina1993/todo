import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './containers/main/main.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { TodoInfoComponent } from './containers/todo-info/todo-info.component';
import { AddTaskComponent } from './containers/add-task/add-task.component';
import { TodoResolverService } from './shared/resolvers/todo-resolver.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'create',
        component: AddTaskComponent
      },
      {
        path: ':id',
        component: TodoInfoComponent,
        data: {title: 'Edit'},
        resolve: [TodoResolverService]
      }
    ]
  },
  {
    path: 'register',
    loadChildren: './containers/register/module#RegisterModule'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
