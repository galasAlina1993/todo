# NgRx Store 
Для того, чтобы заинитить стору нужно выполнить: <br/>`npm install --save @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/router-store` <br/> Устанавливаем саму стору, эффекты, коннект сторы с роутером и девтулз для приложения.;

## Ключевые понятия

 <u>[Actions](https://ngrx.io/guide/store/actions)</u> - Действия, которые описывают уникальные события, которые отправляются из компонентов и сервисов<br/><br/>
 <u>[Reducers](https://ngrx.io/guide/store/reducers)</u> Изменения состояния обрабатываются чистыми функциями, называемыми (pure functions) Reducers, они принимают текущее состояние и последний Action для вычисления нового состояния. Reducers возвращают новое состояние (state)<br/><br/>
<u>[State](https://ngrx.io/api/store/State)</u> Объект, описывающий состояние приложениея, к которому имеет доступ STORE.  <br/><br/>
<u>[Selectors](https://ngrx.io/guide/store/selectors)</u> Чистые функции, которые возвращают участки стейта.<br/><br/>
<u>[RxJS](https://rxjs-dev.firebaseapp.com/)</u> (Reactive Extensions for JavaScript) -  это библиотека для реактивного программирования с использованием Observables, что упрощает создание асинхронного или обратного кода [RxJS Docs](https://rxjs-dev.firebaseapp.com/).


## Инит сторы

Для этого, в app.module.ts необходимо добавить стор модуль, стор роутер коннект модуль, стор девтулз модуль, и эффект модуль. (добавляем в массив импортов, как и любые модули) <br/><br/>
``StoreModule
          StoreRouterConnectingModule
          StoreDevtoolsModule
          EffectsModule`` <br/><br/>

Каждый из этих модулей необходимо сконфигурировать. Вызвать на них метод forRoot и передать
туда объект с конфигами. (данные модули передаются в imports array app-module - главного модуля приложения)<br/><br/>

```
...

EffectsModule.forRoot([]),
StoreDevtoolsModule.instrument({name: 'store devtools', logOnly: environment.production}),
StoreModule.forRoot(reducers, {metaReducers}),
StoreRouterConnectingModule.forRoot({stateKey: 'router'}),

 ...
```

Последние 2 модуля требуют от нас определённых зависимостей: reducers, metaReducers.
Эти объекты нам необходимо создать.
<br/>
<br/>


- Создаём папку `store` в корне `app`
- внутри папки `store` создаём файл `index.ts` - это будет корневой файл нашей сторы. От туда мы будем импортировать все зависимости.
- В файле `index.ts` мы создаём объект, который будет содержать все редьюсеры приложения. Для начала, перед тем как создать такой объект, мы должны описать его - создать интерфейс. Редьюсер всегда возвращает новый стейт, поэтому, интерфейс стейта всегда соответствует интерфейсу объекта, содержащего редьюсеры. Поэтому, изначатьно, мы должны описать стейт:

```
export interface State {
  router: fromRouter.RouterReducerState;
  todo: fromTodos.ITodosState;
}
```
Мы видим 2 зависимости - fromRouter и fromTodos.
Часть, содержащая роутер, уже описана, мы её устанавливали с самого начала, поэтому, с собъектом `fromRouter` проблем нет. А вот fromTodos мы будем постепенно создавать. Сначала разберёмся с роутером - мы его импортируем:

```
import * as fromRouter from '@ngrx/router-store';
```

Объект RouterReducerState содержит интерфейс стейта всего роутера приложения.
На примере `todo` создадим такой же для todo-list (по аналогии делать в любом другом приложении). 
`fromTodos` - представляет редьюсер, отвечающий за todo.module. 

Редьюсеры могут также делиться на мелкие части. Всё редьюсеры сгруппированы по модульно. В одном модуле может быть несколько редьюсеров. 
В папке store создаём папку reducers/todos.reducer.ts, и внутри неё файл.
в файле todos.reducer.ts описываем интерфейс стейта todo.module. ITodosState.

```
export  interface ITodosState {
  todos: any[];
}
```
Допустим стейт модуля todo состоит из одного поля, где лежит массив объектов todo.
Затем, мы должны по интерфейсу написать сам стейт:

```
export const initialState: ITodosState = {
  todos: []
};
```

Стейт Todo модуля в начале является пустым массивом, до того, как туда прийдёт какой-либо респонс. Теперь в index.ts файл мы импортируем 
```
import * as fromTodos from './reducers/todos.reducer';
```

Теперь у нас есть все составляющие для interface State. Далее, в index.ts создаём объект в котором будут хранится редьюсеры. Это объект типа  ActionReducerMap.

```
import {ActionReducerMap} from '@ngrx/store';
```


```
export const reducers: ActionReducerMap <State> = {
  router: fromRouter.routerReducer,
  todo: fromTodos.reducer
};
``` 

Здесь мы встречаем ещё 2 зависимости - ActionReducerMap, fromTodos.reducer. 
State - это интерфейс, описанный выше. 

Каждый редьюсер следует рассматривать как таблицу базы данных, это означает, что наш `interface` состояния (`State`) - это всего лишь карта ключей к дочерним состояниям - `States`.
`State` описывает начальное сотояние хранилища (объекта).

`ActionReducerMap` обьект для создания композиции редьюсеров `combineReducers()` (объект, в котором хранятся редьюсеры).

Мы создали редьюсер, который является композитором и включает в себя более атомарные редьюсеры. В него входит 

## Создаем Todo reducer

Редьюсер принимает два аргумента: текущее состояние (при инициализации это начальное состояние) и действие, содержащее тип и полезную нагрузку (`actopn`). Далее в зависимости от действия определенным образом формирует и возвращает новый объект хранилища.

> Если не возвращать новый объект, а изменить старый — хранилище не обновится и приложение не узнает об изменениях.


Давайте опишем наш Todo State и редьюсеры. В файле todos.reducer.ts Так выглядит файл на данный момент - есть интерфейс и начальный стейт, 

```

export  interface ITodosState {
  todos: ITodo[];
}

export const initialState: ITodosState = {
  todos: []
};

```

Теперь, мы создаём редьюсер

```
export function reducer(state: ITodosState = initialState, action): ITodosState {
  switch (action.type) {
    case actionName :
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}
```

`actionName` - Это название конкретного экшина. Action - это объект у которого есть 2 поля: type and payload.


- [x] Reducers
- [ ] Actions
- [ ] Effects
- [ ] Selectors

Мы описали редьюсер. Теперь приступим к Actions.

## Actions
### Создание
Actions сообщают хранилищу о том, что должны произойти изменения.
Для экшинов нам понабодится отдельая папка - store/actions где будет файл todos.actions.ts;

Типы Экшинов мы пропишем заранее и занесём в константу. В typescript  для этого как нельзя лучше подходит энам. Например:

```
export enum TodosActionTypes {
  GET_TODOS = '[TODOS] Fetch todos requested',
  GET_TODOS_SUCCESS = '[TODOS] Fetch todos success',
  GET_TODOS_FAIL = '[TODOS] Fetch todos failed',
}
```

Эти типы описывают возможные варианты исходы события по получению todo items.


Аction можно описать как JS Class то в качестве payload будет, необязательный аргумент при создании инстанса;
Самый простой экшин - GetTodos, он может принимать только тип, так как его роль - запросить данные с сервера:
```
export class GetTodos implements Action {
  readonly type = TodosActionTypes.GET_TODOS;
}
```

Таким же образом создаём GetTodosFail.
```
export class GetTodosFail implements Action {
  readonly type = TodosActionTypes.GET_TODOS_FAIL;
}
```

С payload у нас в данной серии только один экшин - GetTodosSuccess.

```
export class GetTodosSuccess implements Action {
  readonly type = TodosActionTypes.GET_TODOS_SUCCESS;
  constructor(public payload: ITodo[]) {}
}
```

Теперь, мы создадим тип экшинов, которые относятся к todо. Это общий "сборный" тип: 

```
export type TodosActionsUnion = GetTodos | GetTodosSuccess | GetTodosFail;
```


Тепер, модифицируем todo.reducer:

```
...
import { TodosActionsUnion, TodosActionTypes } from '../actions/todos.actions';

...
export function reducer(state: ITodosState = initialState, action: TodosActionsUnion): ITodosState {
// TodosActionsUnion редьюсер рассчитывает получить один из этих экшинов.

  switch (action.type) {
    case TodosActionTypes.GET_TODOS_SUCCESS:
    //тип экшина - один из описаных в энаме
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}
```


### Отправка экшинов
Чтобы сообщить сторе, что нужно произвести изменение нашего хранилища, мы воспользуемся методом `dispatch` класса `Store`.
Для этого заинжектим его в сервис или компонент, указав стейт нашего хранилища. Аргументом функции dispatch, как раз, является наш класс и полезная нагрузка (payload).

```
import { select, Store } from '@ngrx/store';
import * as TodosActions from '../../core/store/actions/todos.actions';
import { State, getTodos } from '../../core/store';
```

```
 constructor(private store: Store<State>) {}
```

Отправка

```
this.store.dispatch({ type: TodosActions.TodosActionTypes.GET_TODOS });
```

Таким образом мы с вами разобрали создание и отправку `actions`

- [x] Reducers
- [x] Actions
- [ ] Effects
- [ ] Selectors

## Effects

> Когда мы обращаемся к серверу для принятия данных, записываем или берем в\из localstorage токен и т.д. — все это является side-эффектами
Тоесть, мы это не делаем ни в экшинах, ни в редьюсерах. Каждый элемент должен отвечать за свои задачи. 
Будем исходить из того, что у нас есть action-ы, которые мы отправляем из компонентов. И логично предположить, что если мы их как-то перехватим, то сможем отреагировать подходящим для нас образом. Именно так и устроены ngrx\effects.

> Мы просто подписываемся на определенные action-ы

>  Каждый dispatch преобразуется в observable, который так же возвращает observable нового action-а. Эффект перехватывает экшин и как бы подменяет его - то есть, эффект, это функция, которая принимает на вход экшин и возвращает другой экшин, с возможным payload.

> Другими словами по дефолту эффекты ожидают, что мы будем возвращать новый action observable. Но это конфигурируется в декораторе: dispatch:false


Давайте создадим Effects. В папке store/effects создаём файл todos.effects.ts. Импортируем необъодимые зависимости: 
```
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
```


```

@Injectable()
export class TodosEffects {
  @Effect()
  getTodos$: Observable<Action> = this.actions$
    .pipe(
      ofType<todosAction.GetTodos>(todosAction.TodosActionTypes.GET_TODOS),
      exhaustMap(
        action => this.todoService.getTasks().pipe(
          map(data => ({type: todosAction.TodosActionTypes.GET_TODOS_SUCCESS, payload: data})),
          catchError(() => of({type: todosAction.TodosActionTypes.GET_TODOS_FAIL}))
        )
      )
    );



  constructor(private actions$: Actions, private todoService: TodoService) {}
}
```

Тут я подразумеваю, что у вас есть два действия:

Инициализация загрузки (ее мы будем слушать в эффектах - ofType) 
Успешный ответ сервера (описан в reducer-е)
Итак, в конструкторе, мы инжектим класс Actions, представляющий все action-ы в виде Observable и наш сервис, где далее методом ofType подписываемся только на те action-ы, которые передаем в эту функцию. В данном случае мы “слушаем” GET_TODOS.
Так же важно добавлять декоратор @Effect(), который обеспечивает метаданные для наших эффектов, регистрирующих их как новый источник action-ов.

Далее подключим сам модуль Effects к app.module, либо к любому другому модулю, в котором мы используем стор, и передадим наши эффекты как аргумент ():

```
EffectsModule.forRoot([TodosEffects])
```

- [x] Reducers
- [x] Actions
- [x] Effects
- [ ] Selectors

## Selectors

С помощью селекторов мы можем обратиться к state и достатать нужные вам данные.


```
export const getTodosState = createFeatureSelector<fromTodos.State>('todos');
    
    
const getTodos = (state: State) => state.todo.todos; // функция выборки.

// и сам селектор будет выглядить
export const getTodosSelector = createSelector(
    getTodosState,
    getTodos,
);
```


Функция `getTodosState` принимает текущее состояние и возвращает только его часть.

Преимущества использования селекторов:

- мемоизация — т.к. селекторы это чистые функции, т.е. при одном и том же значении функция возвращает один и тот же результат, ранее вычисленные результаты могут быть возвращены без повторных вычислений (для простоты воспринимайте это как кэш), что дает преимущества в производительности;
- подписка на значимые для конкретного модуля части хранилища;
- селекторы не будут вычисляться вхолостую, если в сторе не появилось нового значения.
Например, при добавлении нового фильма в словарь и массив идентификаторов селектор `getSelected` не выполнит `next` у `Observable` нашего потока и перерендера не будет.

Для использования селектора в компоненте используется метод `select` из сторы.
```
this.todoList$ = this.store.pipe(select(getTodos));
```

- [x] Reducers
- [x] Actions
- [x] Effects
- [x] Selectors



Теперь вернёмся к файлу index.ts
И создадим мета-редьюсер. суть его в том, чтобы перехватить вызов редьюсера, и внедрить какую-то логику.

Создаём функцию logger для того, чтобы видеть в консоли как меняется наше хранилище. Функция приним ает на вход редьюсер, и возвращает function, которая возвращает reducer. function, как бы подменяет собой редьюсер. Она принимает те же аргументы, что и обычный редьюсер - state: State, action: any. 
Эту функцию мы добавим в массив метаредьюсеров (можно считать ее как middleware).

```
// console.log all actions
export function logger(reducer: ActionReducer < State >): ActionReducer < State > {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
```

```
export const metaReducers: MetaReducer < State > [] = !environment.production
     ? [logger]
     : [];
```


The end


