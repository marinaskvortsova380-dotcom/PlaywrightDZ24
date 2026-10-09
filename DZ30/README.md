# Домашнє завдання DZ30: Запуск Cypress тестів у Docker з браузером Firefox

## 📌 Мета завдання
Під час лекції було налаштовано запуск тестів Cypress у Docker-контейнері на браузері **Chrome** та на **останній версії Cypress**.
У цьому домашньому завданні виконано:
1. Зміну конфігурацій та параметрів запуску для використання браузера **Firefox** (`--browser firefox`).
2. Використання **старішої версії Cypress** (обрано стабільний офіційний образ `cypress/included:13.6.0`).
3. Створення конфігураційних файлів (`Dockerfile`, `docker-compose.yml`, `cypress.config.js`, `package.json`).
4. Додавання скріншоту успішного запуску тестів з усіма вказаними параметрами.
5. Оформлення результатів в окремій гілці `DZ30` у репозиторії.

---

## 🔄 Порівняльна таблиця змін (Лекція vs ДЗ-30)

| Параметр / Файл | Налаштування на лекції | Налаштування в ДЗ-30 |
| :--- | :--- | :--- |
| **Браузер** | Google Chrome (`--browser chrome`) | **Mozilla Firefox (`--browser firefox`)** |
| **Версія Cypress** | Останній реліз (`cypress/included:latest` або `15.x.x`) | **Старіша версія (`cypress/included:13.6.0`)** |
| **Docker Image** | `cypress/included:latest` | **`cypress/included:13.6.0`** |
| **Команда запуску CLI** | `docker run -it -v ${PWD}:/e2e -w /e2e cypress/included:latest --browser chrome` | **`docker run -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --browser firefox`** |
| **Docker Compose** | Сервіс на Chrome | **Сервіс `cypress-firefox` з Firefox** |

---

## 🛠 Покроковий опис виконаних дій

### Крок 1. Створення конфігурації Cypress (`cypress.config.js`)
Створено файл конфігурації Cypress з налаштуванням `baseUrl` з авторизацією для тестового стенду `https://guest:welcome2qauto@qauto.forstudy.space` та підключенням наборів тестів:
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    specPattern: [
      'DZ21/**/*.cy.js',
      'DZ22API/**/*.cy.js',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    ],
    env: {
      user1Email: 'Marina_qauto@ukr.net',
      user1Password: 'Aa1234567*',
      user2Email: 'Maria_qauto@ukr.net',
      user2Password: 'Aa1234567*',
    },
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
```

---

### Крок 2. Написання тестових сценаріїв (`cypress/e2e/qauto_tests.cy.js`)
Підготовлено тестовий набір для перевірки головної сторінки, модальних вікон та навігації в гостьовому режимі:
```javascript
describe('QAuto App - Docker Firefox Suite', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login functionality for QAuto: should display main page header and Sign In button', () => {
    cy.get('h1').should('be.visible').and('contain', 'Do more!');
    cy.get('.header_signin').should('be.visible').and('contain', 'Sign In');
  });

  it('Navigation and element check: should open and close the Sign In modal dialog', () => {
    cy.get('.header_signin').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('contain', 'Log in');
    cy.get('.close').click();
    cy.get('.modal-content').should('not.exist');
  });

  it('Dynamic user scenario: should navigate to Guest log-in and open garage panel', () => {
    cy.get('.header-link.-guest').click();
    cy.url().should('include', '/panel/garage');
    cy.get('h1').should('contain', 'Garage');
  });
});
```

---

### Крок 3. Створення `Dockerfile` для Firefox та старішої версії Cypress
Створено `Dockerfile`, який базується на старішому офіційному образі `cypress/included:13.6.0` з попередньо встановленим Firefox:
```dockerfile
FROM cypress/included:13.6.0

WORKDIR /e2e

COPY ./cypress.config.js ./cypress.config.js
COPY ./cypress ./cypress

ENTRYPOINT ["cypress", "run", "--browser", "firefox"]
```

---

### Крок 4. Створення `docker-compose.yml`
Для зручного запуску тестів однією командою створено файл `docker-compose.yml`:
```yaml
version: '3.8'

services:
  cypress-firefox:
    image: cypress/included:13.6.0
    container_name: cypress_firefox_dz30
    working_dir: /e2e
    volumes:
      - ./:/e2e
    command: ["--browser", "firefox"]
    environment:
      - CYPRESS_baseUrl=https://qauto.forstudy.space
```

---

### Крок 5. Додавання скриптів у `package.json`
У файл `package.json` додано зручні npm-скрипти для запуску тестів у різних середовищах:
```json
"scripts": {
  "cy:run:firefox": "cypress run --browser firefox",
  "docker:cy:firefox": "docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --browser firefox",
  "docker:cy:dz21": "docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --spec \"DZ21/**/*.cy.js\" --browser firefox",
  "docker:cy:dz22": "docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --spec \"DZ22API/**/*.cy.js\" --browser firefox",
  "docker:cy:all": "docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --browser firefox",
  "docker:compose:up": "docker compose up --abort-on-container-exit"
}
```

---

## 🚀 Команди для запуску

### Запуск окремих наборів тестів у Docker (Firefox & Cypress 13.6.0):

* **Запуск тестів DZ21 (POM Garage & Fuel Expenses)**:
  ```powershell
  docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --spec "DZ21/**/*.cy.js" --browser firefox
  ```

* **Запуск тестів DZ22 (API Interception & Validation)**:
  ```powershell
  docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --spec "DZ22API/**/*.cy.js" --browser firefox
  ```

* **Запуск усіх тестів одразу**:
  ```powershell
  docker run --rm -it -v ${PWD}:/e2e -w /e2e cypress/included:13.6.0 --browser firefox
  ```

* **Запуск через Docker Compose**:
  ```powershell
  docker compose up --abort-on-container-exit
  ```

### Варіант 4: Запуск через npm-скрипт
```bash
npm run docker:cy:firefox
```

---

## 📸 Підтвердження запуску (Скріншоти виконання)

### 1. Запуск тестового набору DZ21 (POM Garage & Fuel Expenses):
![DZ21 Tests Passed](./DZ30-21APIpassed.png)

### 2. Запуск тестового набору DZ22 (API Interception & Validation):
![DZ22 Tests Passed](./DZ30-22APIpassed.png)

### 3. Запуск основного набору тестів QAuto:
![Cypress Docker Run](./DZ30_screenshot.png)
