# Структура и архитектура реализации ДЗ 22 (DZ22API)

Данный документ содержит исчерпывающее описание архитектуры, структуры файлов, паттернов проектирования и логики взаимодействия между слоями UI и API для домашнего задания 22.

---

## 1. Обзор архитектуры решения

Реализация построена на базе фреймворка **Cypress** с применением паттерна **Page Object Model (POM)**, механизма перехвата сетевых вызовов (**Network Interception** через `cy.intercept`), прямых HTTP-запросов к REST API (**Direct API Calls** через `cy.request`), а также **кастомных команд Cypress (Custom Commands)**.

```mermaid
graph TD
    A[Cypress E2E Test Suite] -->|1. UI Action + cy.intercept| B[GaragePage: Добавление машины]
    B -->|Сетевой вызов POST /api/cars| C[Backend QAuto API]
    C -->|Ответ: 201 Created + carId| D[Interception: Извлечение carId]
    D -->|Сохранение в Env / Fixture| E[(createdCarFixture.json)]
    
    A -->|2. Direct API Call GET /api/cars| F[getCarsApi Custom Command]
    F -->|Проверка наличия carId и данных| C
    
    A -->|3. API Request POST /api/expenses| G[createExpenseApi Custom Command]
    G -->|Создание расхода с carId| C
    C -->|Ответ: 200 OK + expense body| G
    
    A -->|4. UI Verification| H[ExpensesPage: Проверка таблицы]
    H -->|Сверка литража, пробега, стоимости| I[DOM / Таблица расходов]
```

---

## 2. Структура файлов проекта в папке `DZ22API`

| Имя файла | Назначение и состав |
| :--- | :--- |
| **`22SignIn.js`** | **Page Object** для авторизации и регистрации. Содержит селекторы элементов хедера, модального окна входа (`#signinEmail`, `#signinPassword`), кнопки сабмита, а также высокоуровневые методы `open()`, `login()`, `register()`. В каждой строке кода добавлены комментарии на русском языке. |
| **`22GaragePage.js`** | **Page Object** для работы с гаражом (`/panel/garage`). Включает селекторы кнопки добавления автомобиля, выпадающих списков выбора марки (`#addCarBrand`) и модели (`#addCarModel`), поля ввода пробега (`#addCarMileage`), списка карточек машин (`.car-item`) и методов `addCar()`, `openAddExpenseModalForFirstCar()`. Все строки кода подробно прокомментированы на русском. |
| **`22ExpensesPage.js`** | **Page Object** для работы с разделом расходов (`/panel/expenses`). Содержит селекторы элементов таблицы расходов (`tbody tr`), полей ввода модального окна расхода (`#addExpenseCar`, `#addExpenseMileage`, `#addExpenseLiters`, `#addExpenseTotalCost`), фильтра автомобилей (`#expensesFilterDropdown`) и методов `addExpense()`, `selectCarFilter()`. Каждая строка снабжена русским комментарием. |
| **`commands.js`** | Файл объявления **кастомных команд Cypress**: <br>• `cy.createExpenseApi(expenseData)` — отправка `POST /api/expenses` с Basic Auth и валидацией.<br>• `cy.getCarsApi()` — отправка `GET /api/cars` для получения списка авто текущего пользователя. |
| **`cypress.qauto.config.js`** | Конфигурационный файл Cypress для модуля `DZ22API`. Задает `baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space'`, пути поиска тестов `specPattern`, переменные окружения `env` (`user1Email`, `user1Password`, `basicAuthHeader`) и генерацию отчетов `mochawesome`. |
| **`22api_interception_expenses.cy.js`** | **Главный тестовый файл** со сквозным сценарием из 4 шагов, связывающим UI-действие, перехват сетевого запроса, валидацию API-эндпоинтов, создание сущности через API и UI-проверку. |
| **`createdCarFixture.json`** | Фикстура JSON, автоматически создаваемая во время выполнения первого теста для долговременного сохранения `carId`, марки, модели и пробега созданной машины. |
| **`STRUCTURE.md`** | Данный документ с полным техническим описанием архитектуры. |
| **`RUN_INSTRUCTIONS.md`** | Пошаговое руководство по запуску тестов в Headless и UI режимах. |

---

## 3. Детальное описание шагов тестового сценария

### Шаг 1: Создание машины через UI с перехватом (Interception) `POST /api/cars`
- **Цель**: Проверить создание автомобиля через пользовательский интерфейс с параллельным перехватом сетевого HTTP-запроса браузера к API.
- **Механизм**:
  1. Вызов `cy.intercept('POST', '**/api/cars').as('createCarRequest')`.
  2. Заполнение формы через метод `garagePage.addCar('Audi', 'TT', 1000)`.
  3. Ожидание завершения запроса `cy.wait('@createCarRequest')`.
  4. Проверка статус-кода ответа `interception.response.statusCode === 201`.
  5. Извлечение `carId` из `interception.response.body.data.id`.
  6. Сохранение `carId` в `Cypress.env('createdCarId')` и запись в файл фикстуры `DZ22API/createdCarFixture.json`.
  7. Валидация отображения новой карточки в UI гаража.

### Шаг 2: Валидация списка автомобилей через прямой API-запрос `GET /api/cars`
- **Цель**: Подтвердить, что бэкенд возвращает созданный автомобиль в общем списке машин пользователя по спецификации Swagger (`/api-docs/#/Cars/getCars`).
- **Механизм**:
  1. Вызов кастомной команды `cy.getCarsApi()`.
  2. Валидация статус-кода `200 OK` и поля `status: 'ok'`.
  3. Поиск автомобиля в массиве `response.body.data` по сохраненному `carId`.
  4. Проверка соответствия полей `brand === 'Audi'`, `model === 'TT'`, `initialMileage === 1000`.

### Шаг 3: Создание расхода (Expense) через API с кастомной командой `cy.createExpenseApi`
- **Цель**: Создать запись о расходе топлива через API (`POST /api/expenses`) для автомобиля, созданного на шаге 1.
- **Механизм**:
  1. Вызов `cy.createExpenseApi({ carId, reportedAt, mileage: 1200, liters: 35, totalCost: 1500, forceMileage: false })`.
  2. Запрос выполняется с Basic Auth (`guest:welcome2qauto`) и авторизационными сессионными куками браузера.
  3. Валидация статус-кода `200` / `201`.
  4. Проверка полей ответа: `body.status === 'ok'`, `body.data.carId === carId`, `body.data.liters === 35`, `body.data.totalCost === 1500`, `body.data.mileage === 1200`.

### Шаг 4: Поиск автомобиля в UI и валидация созданной сущности расхода
- **Цель**: Убедиться, что сущность расхода, созданная через API на шаге 3, корректно отображается в таблице пользовательского интерфейса.
- **Механизм**:
  1. Переход на страницу `/panel/expenses` через `expensesPage.open()`.
  2. Проверка первой строки таблицы расходов `expensesPage.expensesTableRows.first()`.
  3. Валидация наличия значений литров (`35`), пробега (`1200`), общей стоимости (`1500`).

---

## 4. Спецификация используемых эндпоинтов Swagger API

В соответствии с навыком `.agent/skills/qautoAPi/QAuto_API_SKILL.md`:

| Метод | Эндпоинт | Назначение | Тело запроса / Параметры | Ожидаемый ответ |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/signin` | Вход пользователя в систему | `{ email, password }` | `200 OK`, `sid` cookie |
| **POST** | `/api/cars` | Создание автомобиля | `{ carBrandId, carModelId, mileage }` | `201 Created`, `{ data: { id, brand, model, ... } }` |
| **GET** | `/api/cars` | Получение списка машин | — | `200 OK`, `{ data: [ { id, brand, model, mileage, ... } ] }` |
| **POST** | `/api/expenses` | Создание расхода топлива | `{ carId, reportedAt, mileage, liters, totalCost, forceMileage }` | `200 OK`, `{ data: { id, carId, mileage, liters, totalCost, ... } }` |
| **GET** | `/api/expenses` | Список расходов | `?carId={id}&page=1` | `200 OK`, `{ data: [ ... ], totalItems }` |
