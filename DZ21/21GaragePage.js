class GaragePage {
  get addCarButton() {
    return cy.contains('button', 'Add car');
  }

  get brandSelect() {
    return cy.get('#addCarBrand');
  }

  get modelSelect() {
    return cy.get('#addCarModel');
  }

  get mileageInput() {
    return cy.get('#addCarMileage');
  }

  get submitAddCarButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  get carList() {
    return cy.get('.car-list');
  }

  get carItems() {
    return cy.get('.car-item');
  }

  get addFuelExpenseButtonOnCard() {
    return cy.get('.car_add-expense');
  }

  open() {
    cy.visit('/panel/garage');
  }

  addCar(brand, model, mileage) {
    this.addCarButton.click();
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.clear().type(mileage);
    this.submitAddCarButton.click();
  }

  openAddExpenseModalForFirstCar() {
    this.carItems.first().find('.car_add-expense').click();
  }
}

export default new GaragePage();
