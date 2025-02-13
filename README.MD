# @avito/pixel-web-client 📊

```@avito/pixel-web-client``` - это клиент для [AvitoPixel](https://github.com/avito-tech/avito-pixel), используемый для отслеживания событий в приложении, веб-сайте. Он предоставляет методы для инициализации и отправки событий.

# Начало работы

## Установка

```shell
npm i @avito/pixel-web-client
```

## Использование
### Пример 
Вставьте код в файл, который отвечает за генерацию заголовка всех страниц сайта. Если все страницы вашего сайта — отдельные файлы, написанные вручную, добавьте код счетчика в HTML-код всех страниц сайта.
```html
<script src="https://www.avito.st/s/pixel/script.js" data-host="<url host>" data-paths-hit="<url method hit>" data-platform="<you platform>"></script>
```
- Атрибут data-host указывает на URL [сервера AvitoPixel](https://github.com/avito-tech/avito-pixel) (опционально);
- Атрибут data-paths-hit указывается на путь к методу hit;
- Атрибут data-platform указывает на платформу вашего приложения (по умолчанию установлен "web").

### Пример с React

В главном компоненте, например в App.tsx, импортируйте пакет @avito/pixel-web-client:
```react
import { AvitoPixel } from '@avito/pixel-web-client';
```

Создайте экземпляр класса AvitoPixel и передайте все необходимые параметры:
```react
const pixel = new AvitoPixel({ host: "<host URL>", platform: "<you platform>", paths: <method paths> });
```
- Параметр host указывает на URL сервера AvitoPixel.
- Параметр platform опциональный и указывает на платформу вашего приложения (по умолчанию установлен "web").
- Параметр paths позволяет указать пути к методам различных событий. Сейчас поддерживается только метод hit.

Примечание: Конструктор следует шаблону Singleton, гарантируя, что создается только один экземпляр AvitoPixel.

Выполните инициализацию экземпляра класса AvitoPixel на этапе монтирования компонента. Этот метод также отправляет событие "load" на сервер AvitoPixel.
```react
React.useEffect(() => {
        instance.init();
    }, [])
```

## Пример установки и настройки счетчика для SPA-сайтов
### React

Используйте тот же самый подход, что и в предыдущем примере. Анализируйте логику работы вашего сайта и вызывайте функцию hit, когда необходимо отслеживать события, например, при переходе на другую страницу.

```react
instance.hit.request({type: 'location_changed'});
```

## License
MIT
