# smartix-test

## Установка зависимостей
```
yarn install --frozen-lockfile
```

### Запуск в режиме разработка
```
yarn serve
```

### Сборка проекта под хост
```
yarn build
```
#### В дев режиме ссылки на локальные изображения работать не будут ! Политика безопасности браузера.

Для данного кейса архитектура покажется перегруженной. От внешних `DTO` и внутренних сущностей `entities` и фабрик `factory` можно избавиться. Они излишни. Но в рамках тестового задания хотелось показать боевую архитектуру к которой пришли с коллегами набивая шишки. 
Не было возможности продемонстрировать еще пару паттернов на текущем кейсе. Добавил неиспользуемые файлы для демонстрации. Используемые чаще всего паттерны.
 - Абстракция(фабрика) над axios - `example/Http.ts`
 - Enum - `example/step-color-enum-value.ts`
 - Паттерн адаптер применял для сборки либы основанной на odic-client (OAuth 2.0). Для дальнейшего использования в микро фронтах. Либа под NDA
 
З.ы хоть за чистую архитектуру (DDD) на фронте ни кто не заплати (пока не на надо работать с БД) но без некоторых ее фичь жить сложно ;)

