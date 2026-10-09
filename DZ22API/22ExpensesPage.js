class ExpensesPage {
  get expenses() {
    return cy.get('a[href="/panel/expenses"]');
  }

  get addExpenseButton() {
    return cy.contains('button', 'Add an expense');
  }

  get vehicleSelect() {
    return cy.get('#addExpenseCar');
  }

  get mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  get litersInput() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitExpenseButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  get expensesTableRows() {
    return cy.get('tbody tr');
  }

  get carFilterDropdown() {
    return cy.get('#expensesFilterDropdown');
  }

  open() {
    cy.visit('/panel/expenses');
  }

  addExpense(mileage, liters, totalCost) {
    if (mileage) {
      this.mileageInput.clear().type(mileage);
    }
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(totalCost);
    this.submitExpenseButton.click();
  }

  selectCarFilter(carName) {
    this.carFilterDropdown.click();
    cy.get('.dropdown-menu .dropdown-item').contains(carName).click();
  }
}

export default new ExpensesPage();
