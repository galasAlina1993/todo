import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './containers/main/main.component';
import { TodoWrapperComponent } from './containers/todo-wrapper/todo-wrapper.component';
import { ItemComponent } from './components/item/item.component';
import { CtrlsComponent } from './components/ctrls/ctrls.component';
import { TodoService } from './shared/services/todo.service';
import { AddTaskComponent } from './containers/add-task/add-task.component';
import { TodotimeValidator } from './shared/directives/todotime.validator';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { TodoInfoComponent } from './containers/todo-info/todo-info.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoResolverService } from './shared/resolvers/todo-resolver.service';
import { AppStoreModule } from './core/store/store.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    TodoWrapperComponent,
    ItemComponent,
    CtrlsComponent,
    TodotimeValidator,
    TodoInfoComponent,
    AddTaskComponent
  ],
  imports: [ // массив модулей, сторонних, или самописных.
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TodoService, AuthGuardService, TodoResolverService], // сервисы - функции помошники. Они делают крупные манипуляции с данными.
  bootstrap: [AppComponent] // определяет компонент, с которого начинается запуск и отрисовка приложения
})
export class AppModule { }
