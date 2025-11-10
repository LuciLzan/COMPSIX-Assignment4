//Via: https://app.rize.education/courses/4751/resource/21972863-1abd-4c52-9b0a-a3d2ba25aac0?weekId=10837
const request = require('supertest');
const app = require("../server")

//Test GET /api/books to retrieve all books
describe('/api/books tests', () => {
    test('GET /api/books test', async () => {
        const response = await request(app)
            .get('/api/books');

        expect(response.status).toBe(200);
    });
    test('POST /api/books test', async () => {
        let book = {
            title: "Cat in the Hat",
            author: "Dr. Seuss",
            genre: "Fiction",
            copiesAvailable: 6
        }
        const response = await request(app)
            .post('/api/books').send(book);

        expect(response.status).toBe(201);
    });
});
// Test GET /api/books/:id with valid and invalid IDs
describe('/api/books/:id tests', () => {
    test('GET /api/books test, VALID ID', async () => {
        const response = await request(app)
            .get('/api/books/1');

        expect(response.status).toBe(200);
    });
    test('GET /api/books test, INVALID ID', async () => {
        const response = await request(app)
            .get('/api/books/999');

        expect(response.status).toBe(404);
    });
    test('PUT /api/books/:id test, VALID ID', async () => {
        let newParams = {
            title: "Test",
        }
        const response = await request(app)
            .put('/api/books/1').send(newParams);

        expect(response.status).toBe(200);
    });
    test('PUT /api/books/:id test, INVALID ID', async () => {
        let newParams = {
            title: "Test",
        }
        const response = await request(app)
            .put('/api/books/999').send(newParams);

        expect(response.status).toBe(404);
    });
    test('DELETE /api/books/:id test, VALID ID', async () => {
        const response = await request(app)
            .delete('/api/books/1');

        expect(response.status).toBe(200);
    });
    test('DELETE /api/books/:id test, INVALID ID', async () => {
        const response = await request(app)
            .delete('/api/books/999');

        expect(response.status).toBe(404);
    });
});

// Test DELETE /api/books/:id to remove books
