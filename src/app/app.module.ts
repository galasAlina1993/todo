import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './containers/main/main.component';
import { TodoWrapperComponent } from './containers/todo-wrapper/todo-wrapper.component';
import { ItemComponent } from './components/item/item.component';
import { CtrlsComponent } from './components/ctrls/ctrls.component';
import { TodoService } from './shared/services/todo.service';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TodotimeValidator } from './shared/directives/todotime.validator';
import { RegisterComponent } from './containers/register/register.component';

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
    RegisterComponent,
    AddTaskComponent
  ],
  imports: [ // массив модулей, сторонних, или самописных.
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodoService], // сервисы - функции помошники. Они делают крупные манипуляции с данными.
  bootstrap: [AppComponent] // определяет компонент, с которого начинается запуск и отрисовка приложения
})
export class AppModule { }
