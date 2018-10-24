# The RxJS library
<u>Реактивное программирование</u> - это асинхронная парадигма программирования, связанная с потоками данных и распространением изменений;


<u>[RxJS](https://www.learnrxjs.io/)</u> (Reactive Extensions for JavaScript) -  это библиотека для реактивного программирования с использованием Observables, что упрощает создание асинхронного или обратного кода [RxJS Docs](https://rxjs-dev.firebaseapp.com/).

<u>Observable</u> - наблюдаемый обьект. 

RxJS обеспечивает реализацию типа Observable, который необходим до тех пор, пока тип не станет частью языка и пока браузер не поддержит его. 
Библиотека также предоставляет полезные функции (операторы) для создания и работы с Observable. 
Эти функции можно использовать для:
<ol>
  <li>Преобразование существующего кода для асинхронных операций в наблюдаемые;</li>
  <li>Итерация значений в потоке;</li>
  <li>Фильтрация потоков;</li>
  <li>Создание нескольких потоков;</li>
  и т.д.
</ol>

C помощью Observable мы наблюдаем за итерируемым обьектом, а также можем его изменять.

Давайте рассмотрим простой пример: 

```
for(let char of 'Observable') {
  console.log(char);
}
```

В примере выше мы видим простой цикл который выводит строку `Observable` побуквенно.
Давайте добавим немного гибкости и обернем цикл в функцию, которая будет принимать `Observable` - итерируемый объект, 
функцию `next` - которая будет выполняться на каждой итерации в цикле, и функция `done` которая будет выполняться
после завершения цикла.

```
function observer(observable, next, done) {
  for(let item of observable) {
    next(item)
  }
  done();
}

observer('Observable', (item) => console.log(item), () => console.log('done'));
```

Таким образом мы можем не только итерировать объект, а и наблюдать за итерируемым обьектом. 

Давайте пойдем дальше и реализуем класс `Observable` с помощью которого мы можем не тольке наблюдать за итерируемым обьектом но и видоизменять его. 

```
  class Observable {
      constructor(source) {
          this.source = source;
          this.result = this.source;
      }
  
      subscribe(next) {
          for (let item of this.result) {
              next(item)
          }
      }
  
      map(callback) {
          this.result = Array.prototype.map.call(this.result, callback);
          return this;
      }
  
      filter(predicate) {
          this.result = Array.prototype.filter.call(this.result, predicate);
          return this;
      }
  
  }
  
  new Observable('observable')
      .map(e => e.toUpperCase())
      .filter(e => e === 'O' || e === 'A')
      .subscribe(res => console.log(res));
```

Мы наблюдаем за итерируемым обектом, изменяем и фильтруем.
Это базовая реализация `Observable`. Библиотека `Rx.js` предоставляет множество [операторов](https://rxjs-dev.firebaseapp.com/api) для работы с потоком данных. С помощью метода `subscribe` мы подписываемся на конечный результат.
В библиотеке `Rx.js` `subscribe(next, error, complete)` принимает на вход 3 функции: 
- `next` - callback который выполняеться на каждом изменении данных.
- `error` - callback который выполняется в случае ошибки.
- `complete` - сallback который выполняется, после всех операций с итерируемым обьектом. (функция `done` в примере (`for of`) выше)

### RxJS: все о Subjects, Behavior Subjects и Replay Subjects

Subject’ы очень полезны при множественных подписках или в случаях, когда источник потока сложно трансформировать в observable переменную. Но ими легко можно злоупотребить. Поэтому мы рассмотрим основные типы Subject’ов и в каких случаях их стоит использовать.

`Subject` — это некий гибрид в `RxJS`, который выступает одновременно в роли `observable` и `observer`. Это означает, что данные можно пушить в `subject`, а все кто подписаны на него получат данные.

Помимо простого subject, есть еще несколько специальных типов: `async subjects`, `behavior subjects` и `replay subjects`.

#### Как работает `Subject`?

Использовать `Subject` достаточно просто, необходимо лишь создать объект класса.

``` 
const mySubject = new Subject();
```

На него можно подписаться в нескольких местах и «сабджект» будет хранить список подписок на него.

```
const mySub = mySubject.subscribe(x => console.log(`${x} ${x}`));
const mySub2 = mySubject.subscribe(x => console.log(x.toUpperCase()));
```

Данные передаются с помощью метода `next`.
```
mySubject.next('Hello world');
```

Когда данные пушатся в `Subject`, он пробежится по всему списку подписок и передаст полученные данные.

Давайте рассмотрим еще пример. 

```
const mySubject = new Subject();
mySubject.next(1);
const subscription1 = mySubject.subscribe(x => {
  console.log('Подписка 1:', x);
});
mySubject.next(2);
const subscription2 = mySubject.subscribe(x => {
  console.log('Подписка 2:', x);
});
mySubject.next(3);
subscription1.unsubscribe();
mySubject.next(4);
```

В результате мы получим:

```
Подписка 1: 2
Подписка 1: 3
Подписка 2: 3
Подписка 2: 4
```

Обратите внимание, что пуш с цифрой 1 утерян, так как транслировался раньше, чем была объявлена подписка на «сабджект». Для решения подобных проблем используются `Behavior Subjects` и `Replay Subjects`.

#### Ошибки и их обработка

Если у “сабджекта” вызвать метод `error()`, все подписчики смогут обработать вызванную ошибку:
```
const mySubject = new Subject();
const sub1 = mySubject.subscribe(null, err =>
  console.log('От sub1: ', err.message)
);
const sub2 = mySubject.subscribe(null, err =>
  console.log('От sub2: ', err.message)
);
mySubject.error(new Error('Error'));
```

#### Subject в Observable

Метод `asObservable` используется для преобразования subject’а в простой observable. Это может быть полезным в тех случаях, когда необходимо получать данные подписчикам, но необходимо запретить добавление данных в «сабджект».

```
const mySubject = new Subject();
const myObs = mySubject.asObservable();
mySubject.next('Hello');
myObs.next('World!'); // TypeError: myObs.next is not a function
```

#### Replay Subjects

Теперь вернемся к ситуации, когда мы теряли данные, если они транслировались раньше объявления подписки. `Replay subject` создан для решения таких проблем. Он может хранить последние траслирующееся данные в буфере и отдавать их при новой подписке. Количество хранимых трансляций можно указать в атрибуте функции. Вот пример работы с буфером на два последних эмита:

```
const mySubject = new ReplaySubject(2);
mySubject.next(1);
mySubject.next(2);
mySubject.next(3);
mySubject.next(4);
mySubject.subscribe(x => {
  console.log('От первого sub:', x);
});
mySubject.next(5);
mySubject.subscribe(x => {
  console.log('От второго sub:', x);
});
```

Вот что увидим в консоли:

```
От первого sub: 3
От первого sub: 4
От первого sub: 5
От второго sub: 4
От второго sub: 5
```


Как видите, последних два эмита данных не теряются до подписки, а после подписки передаются в штатном режиме.

#### Behavior Subjects
Это такие же «сабджекты» как и replay, только в них нельзя выставить размер буфера. Он по умолчанию всегда сохраняет данные последнего эмита.

```
const mySubject = new Rx.BehaviorSubject('Куку!');
mySubject.subscribe(x => {
  console.log('От первого sub:', x);
});
mySubject.next(5);
mySubject.subscribe(x => {
  console.log('от второго sub:', x);
});
```

И вот какой мы увидим результат:

```
От первого sub: Куку!
От первого sub: 5
От второго sub: 5
```

Давайте теперь организуем обмен данными использую базовые знания `Rx.js` в нашем приложении.
