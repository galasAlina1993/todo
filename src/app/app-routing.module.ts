import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './containers/main/main.component';
import { RegisterComponent } from './containers/register/register.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { TodoInfoComponent } from './containers/todo-info/todo-info.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


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
        component: TodoInfoComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
