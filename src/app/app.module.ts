import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { FormsModule } from '@angular/forms';
import {NavComponent} from './components/nav/nav.component';
import { MainComponent } from './containers/main/main.component';
import { TodoWrapperComponent } from './containers/todo-wrapper/todo-wrapper.component';
import { ItemComponent } from './components/item/item.component';
import { CtrlsComponent } from './components/ctrls/ctrls.component';
import { TodoService } from './shared/services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    TodoWrapperComponent,
    ItemComponent,
    CtrlsComponent
  ],
  imports: [ // массив модулей, сторонних, или самописных.
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TodoService], // сервисы - функции помошники. Они делают крупные манипуляции с данными.
  bootstrap: [AppComponent] // определяет компонент, с которого начинается запуск и отрисовка приложения
})
export class AppModule { }
