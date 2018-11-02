# Angular Router

### Определение маршрутов
Маршрутизация позволяет сопоставлять запросы к приложению с определенными ресурсами внутри приложения.

Ключевым для работы маршрутизации является модуль `RouterModule`, который располагается в пакете `@angular/router`. Поэтому при работе с маршрутизацией этот пакет должен быть указан в списке зависимостей в файле `package.json`:

[`<base href="/">`](https://angular.io/guide/router#base-href) - базовый адрес приложения

Большинство приложений маршрутизации должны добавить элемент `<base>` в `index.html` в качестве первого дочернего элемента в теге `<head>`, чтобы сообщить маршрутизатору, как составлять URL-адреса навигации.

#### Конфигурация

Angular приложение имеет `singleton` инстанс роутер сервиса. Когда изменяется URL-адрес браузера то роутер сервис ищет соответсвующий маршрут, из которого он определяет отображаемый компонент. 

`Router` по умолчанию не имеет маршрутов. Их необходимо настроить.
Нам необходимо определить роуты приложения и добавить их в методе `forRoot()` в `RouterModule`.

Пример:

```
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  ...
})
export class AppModule { }
```



