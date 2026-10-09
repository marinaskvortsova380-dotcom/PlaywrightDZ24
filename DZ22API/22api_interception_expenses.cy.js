import signInPage from './22SignIn';
import garagePage from './22GaragePage';
import expensesPage from './22ExpensesPage';
import './commands';

describe('ДЗ 22: Тестирование API QAuto с перехватом запросов и проверкой через UI', () => {
  let createdCarId;
  const testCarBrand = 'Audi';
  const testCarModel = 'TT';
  const testCarMileage = 1000;
  const testExpenseData = {
    reportedAt: new Date().toISOString().split('T')[0],
    mileage: 1200,
    liters: 35,
    totalCost: 1500,
    forceMileage: false,
  };

  before(() => {
    cy.deleteAllCarsApi(Cypress.env('user1Email'), Cypress.env('user1Password'));
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    signInPage.open();
    signInPage.login(
      Cypress.env('user1Email'),
      Cypress.env('user1Password')
    );
    cy.url().should('include', '/panel/garage');
  });

  it('Шаг 1: Создание авто через UI с перехватом (Interception) POST /api/cars и сохранением ID', () => {
    cy.intercept('POST', '**/api/cars').as('createCarRequest');
    garagePage.addCar(testCarBrand, testCarModel, testCarMileage);
    cy.wait('@createCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.status).to.eq('ok');
      const carId = interception.response.body.data.id;
      expect(carId).to.be.a('number');
      createdCarId = carId;
      Cypress.env('createdCarId', carId);
    });
    garagePage.carItems.first().should('be.visible');
    garagePage.carItems.first().should('contain', `${testCarBrand} ${testCarModel}`);
  });

  it('Шаг 2: Валидация списка машин через API (GET /api/cars) по Swagger документации', () => {
    const targetCarId = createdCarId || Cypress.env('createdCarId');
    expect(targetCarId, 'ID автомобиля должен быть определен').to.exist;
    cy.getCarsApi().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      const foundCar = response.body.data.find((car) => car.id === targetCarId);
      expect(foundCar, 'Созданный автомобиль найден в списке API').to.exist;
      expect(foundCar.brand).to.eq(testCarBrand);
      expect(foundCar.model).to.eq(testCarModel);
      expect(foundCar.initialMileage).to.eq(testCarMileage);
    });
  });

  it('Шаг 3: Создание расхода (Expense) через API кастомной командой и валидация ответа', () => {
    const targetCarId = createdCarId || Cypress.env('createdCarId');
    expect(targetCarId).to.exist;
    cy.createExpenseApi({
      carId: targetCarId,
      reportedAt: testExpenseData.reportedAt,
      mileage: testExpenseData.mileage,
      liters: testExpenseData.liters,
      totalCost: testExpenseData.totalCost,
      forceMileage: testExpenseData.forceMileage,
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body.status).to.eq('ok');
      expect(response.body.data.carId).to.eq(targetCarId);
      expect(response.body.data.liters).to.eq(testExpenseData.liters);
      expect(response.body.data.totalCost).to.eq(testExpenseData.totalCost);
      expect(response.body.data.mileage).to.eq(testExpenseData.mileage);
    });
  });

  it('Шаг 4: Поиск нужного автомобиля в UI и валидация созданной сущности расхода', () => {
    expensesPage.open();
    cy.url().should('include', '/panel/expenses');
    expensesPage.expensesTableRows.first().should('be.visible');
    expensesPage.expensesTableRows.first().should('contain', `${testExpenseData.liters}`);
    expensesPage.expensesTableRows.first().should('contain', `${testExpenseData.mileage}`);
    expensesPage.expensesTableRows.first().should('contain', `${testExpenseData.totalCost}`);
  });
});
