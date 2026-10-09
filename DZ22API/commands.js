Cypress.Commands.add('createExpenseApi', (expenseData) => {
  const authHeader = 'Basic ' + btoa('guest:welcome2qauto');
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    headers: {
      Authorization: authHeader,
    },
    body: {
      carId: expenseData.carId,
      reportedAt: expenseData.reportedAt || new Date().toISOString().split('T')[0],
      mileage: expenseData.mileage,
      liters: expenseData.liters,
      totalCost: expenseData.totalCost,
      forceMileage: expenseData.forceMileage !== undefined ? expenseData.forceMileage : false,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getCarsApi', () => {
  const authHeader = 'Basic ' + btoa('guest:welcome2qauto');
  return cy.request({
    method: 'GET',
    url: '/api/cars',
    headers: {
      Authorization: authHeader,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('deleteAllCarsApi', (email, password) => {
  const authHeader = 'Basic ' + btoa('guest:welcome2qauto');
  const executeDelete = () => {
    return cy.request({
      method: 'GET',
      url: '/api/cars',
      headers: { Authorization: authHeader },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.body && response.body.data && Array.isArray(response.body.data)) {
        response.body.data.forEach((car) => {
          cy.request({
            method: 'DELETE',
            url: `/api/cars/${car.id}`,
            headers: { Authorization: authHeader },
            failOnStatusCode: false,
          });
        });
      }
    });
  };

  if (email && password) {
    return cy.request({
      method: 'POST',
      url: '/api/auth/signin',
      headers: { Authorization: authHeader },
      body: { email: email, password: password },
      failOnStatusCode: false,
    }).then(() => {
      return executeDelete();
    });
  } else {
    return executeDelete();
  }
});
