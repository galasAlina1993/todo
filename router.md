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

Массив `appRoutes` описывает как будет происходить навигация. Добавив его в `RouterModule.forRoot(appRoutes)` мы сконфигурируем роутинг в приложении.

**ВАЖНО!!! no leading slashes in the path - роут не должен начинаться со слеша** <br>
```path: '/crisis-center'``` - Exception

`:id` (во втором стейте) называется роут параметром. Например URL типа `/hero/42`. 42 - роут параметр. 
`data` - хранит в себе любой обьект (СТАТИЧЕСКИЕ ДАННЫЕ), который можно прочтитать в данном стейте. Полезно использовать для хранения например заголовка страницы.

Пустой путь указывает дефолтный путь.  
`redirectTo: '/heroes'` куда средиректить при определенном URL.

Путь `**` на последнем маршруте является подстановочным знаком. Маршрутизатор выберет этот маршрут, если запрашиваемый URL-адрес не соответствует каким-либо путям для маршрутов, определенных ранее в конфигурации. Это полезно для отображения страницы «404 - не найден» или перенаправления на другой маршрут.

`{ enableTracing: true }` - указываем, если нам необходимо определить как `Event` жизненого цикла навигации был вызванн.


#### Router outlet

`RouterOutlet` - это директива из библиотеки роутера, которая используется как компонент. Он выступает в качестве заполнителя, который отмечает место в шаблоне, где маршрутизатор должен отображать компоненты.

```
<router-outlet></router-outlet>
<!-- Routed components go here -->
```

#### Router links

Директива `RouterLink` на елемент ссылка - дают контроль над этими элементами. Пути навигации фиксированы, поэтому вы можете назначить строку для `routerLink`.

```
 <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
 ```
 

#### Active router links

`RouterLinkActive` - деректива, которая добавляет `css classes` для активного `routerLink`

Пример:
```
 <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
```

#### Router state

В конце каждого удачного навигационного цикла, `angular router` строит деревовидный обьект, который называется `ActivatedRoute`. 
Это обьект который хранит в себе текущий `RouterState`. 

Каждый `ActivatedRoute` содержит в себе несколько важных свойств. 

```
interface ActivatedRoute {
  snapshot: ActivatedRouteSnapshot
  url: Observable<UrlSegment[]>
  params: Observable<Params>
  queryParams: Observable<Params>
  fragment: Observable<string>
  data: Observable<Data>
  outlet: string
  component: Type<any> | string | null
  routeConfig: Route | null
  root: ActivatedRoute
  parent: ActivatedRoute | null
  firstChild: ActivatedRoute | null
  children: ActivatedRoute[]
  pathFromRoot: ActivatedRoute[]
  paramMap: Observable<ParamMap>
  queryParamMap: Observable<ParamMap>
  toString(): string
}
```

#### [Router Events](https://angular.io/guide/router#router-events)

Полный цикл навигации в Angular router описан следующимим событиями.  

| **Router Part**        | **Meaning**
|------------------------| :-----------------:|
| `NavigationStart`      | Вызывается в начале навигации.|
| `RouteConfigLoadStart` | Вызывается до того, как роутер начнёт ленивую подгрузку дочерних модулей.|
|`RouteConfigLoadEnd`    |Вызывается после того, как дочерние модули загрузились |
|`RoutesRecognized`    |Вызывается после того, как распознаны пути URL,когда роутер парсит пути.|
|`GuardsCheckStart`	     |Вызывается когда роутер начинает парсить GUADS |
|`ChildActivationStart`	| Вызывается Когда осуществляется переход на дочерний модуль.|
|`ActivationStart`	|Вызывается при активации роута - свершился переход, но роут и соответствующие компоненты не загружены.|
|`GuardsCheckEnd`	|Вызывается когда роутер успешно закончил парсить GUADS.|
|`ResolveStart`	|После того как guard пройден начинается фаза resolve. событие означает начало фазы.|
|`ResolveEnd`	|Вызывается по окончанию выполнения резолвера.|
|`ChildActivationEnd`	|Вызывается по окончанию активации дочернего роута.|
|`ActivationEnd`	|Вызывается после того, как роут активирован.|
|`NavigationEnd`	|Вызывается после успешного окончания навигации.|
|`NavigationCancel`	|Вызывается в  случае отмены перехода на роут гуардом.|
|`NavigationError`	|Вызывается при ошибке навигации.|
|`Scroll`	|An event that represents a scrolling event.|








