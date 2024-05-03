# COIN
Coin - банковская система хранения и операций над криптовалютными средствами. 
<a href="https://www.figma.com/file/JUJVDoP27x18v4Eqt66SdK/Bank?type=design&node-id=1-1598&mode=design&t=oYsJrW1mxJzbOn45-0">Mакет в Figma</a>

## Описание проекта
Приложение выполнено на чистом Js и представляет следующие функции:
<ul>
  <li>Авторизация - допускаетимые значения полей ввода длинной не меньше 6 символов без пробелов.</li>
  <li>Управление счетами пользователя: создание нового счёта, отображение списка счетов, отображение баланса, просмотр истории транзакций.</li>
  <li>Переводы на счета или карты других ользователей</li>
  <li>Возможность производить валютные обмены</li>
  <li>Отобра  жение банкоматов на карте</li>
</ul>
<p>После того, как произведён вход в систему, открывается вкладка "Счета", где отображается список счетов, которыми владеет пользователь. Здесь можно создать навый счёт, нажав на кнопку "Создать новый счёт", просмотреть существующий счёт, нажав на кнопку "Открыть", рассортировать счета по номеру, балансу, по последней транзакции.</p>
<p>На странице просмотра счета можно совершить перевод на другой счет, просмотреть график динамики баланса, и последние 10 транзакций. При нажании на график или на таблицу происходит переход на страницу "История баланса". При наведении на таблицу и нажатии кнопок мыши "4", "5" (боковые кнопки перехода вперёд, назад), можно просмотреть историю транзакций больше 25 переводов. Кнопка "Вернуться назад" возвращает на предыдущюю страницу.</p>
<p>Во вкладке "Валюта" пользователи могут получить информацию о состоянии своих валютных счетов, быть в курсе последних колебаний курса и обменять одну валюту на другую.</p>
<p>Во вкладке "Банкоматы" выводится карта с точками, где располагаются банкоматы, где может обслужить наш банк.</p>

## dev-режим и сборка
Для установки зависимостей из файла package.json войдите в папку "frontend" и введите в командной строке "npm install".

Для dev-режима введите в командной строке "npm run dev"
По умолчанию dev-сервер слушает на 8080-ом порту localhost

Для сботки приложения запустите в командной строке команду "npm run build".
Собраный проект запишется в папку "dist".

## Rest Api
Для запуска сервера воспользуйтесь инструкцией из файла REDME.md в папке rest-api-server

## Demo

<img src="/img_demo/enter.jpg">
<img src="/img_demo/Checks.jpg">
<img src="/img_demo/valuts.jpg">
<img src="/img_demo/viewing.jpg">
<img src="/img_demo/map.jpg">
