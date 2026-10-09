import { test, expect } from '@playwright/test';

const authFile = 'session/userState.json';

test.describe('API tests for creating cars (/api/cars POST)', () => {
    test.use({ storageState: authFile });

    let createdCarId;

    test.afterEach(async ({ request }) => {
        if (createdCarId) {
            const deleteResponse = await request.delete(`https://qauto.forstudy.space/api/cars/${createdCarId}`);
            expect(deleteResponse.status()).toBe(200);
            createdCarId = null;
        }
    });

    test('1. Позитивний сценарій: Успішне створення машини з валідними даними', async ({ request }) => {
        const newCarData = {
            carBrandId: 1, // Audi
            carModelId: 1, // TT
            mileage: 150
        };

        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: newCarData
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();

        expect(responseBody.status).toBe('ok');
        expect(responseBody.data).toBeDefined();
        expect(responseBody.data.carBrandId).toBe(newCarData.carBrandId);
        expect(responseBody.data.carModelId).toBe(newCarData.carModelId);
        expect(responseBody.data.mileage).toBe(newCarData.mileage);
        expect(responseBody.data.initialMileage).toBe(newCarData.mileage);
        expect(responseBody.data.brand).toBe('Audi');
        expect(responseBody.data.model).toBe('TT');
        expect(responseBody.data.id).toBeDefined();

        createdCarId = responseBody.data.id;
    });

    test('2. Негативний сценарій: Помилка 400 при створенні машини без обовʼязкового поля (mileage)', async ({ request }) => {
        const invalidCarData = {
            carBrandId: 1,
            carModelId: 1
        };

        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: invalidCarData
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBeDefined();
    });

    test('3. Негативний сценарій: Помилка 404,400 при передачі неіснуючої моделі авто (carModelId)', async ({ request }) => {
        const invalidCarData = {
            carBrandId: 1, 
            carModelId: 99999,
            mileage: 100
        };

        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: invalidCarData
        });

        expect([400, 404]).toContain(response.status());

        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBeDefined();
    });

    test('4. Негативний сценарій: Помилка 400 при передачі відʼємного пробігу (mileage: -10)', async ({ request }) => {
        const invalidCarData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: -10
        };

        const response = await request.post('https://qauto.forstudy.space/api/cars', {
            data: invalidCarData
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBeDefined();
    });
});
